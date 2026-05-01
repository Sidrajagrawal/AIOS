import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join, dirname } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { exec, spawn, execSync } from 'child_process' 
import os from 'os'
import fs from 'fs'

app.disableHardwareAcceleration()

let backendProcess = null;

function startFastAPI() {
  const backendPath = app.isPackaged 
    ? join(process.resourcesPath, 'ai-os-backend', 'ai-os-backend.exe')
    : join(app.getAppPath(), 'resources', 'ai-os-backend', 'ai-os-backend.exe');

  const backendDir = dirname(backendPath);

  try {
    // --- FIX 1: Added windowsHide so it doesn't crash in production ---
    backendProcess = spawn(backendPath, [], { 
        cwd: backendDir,
        windowsHide: true 
    });

    backendProcess.stdout.on('data', (data) => {
      console.log(`[FastAPI]: ${data}`);
    });

    // Treat stderr as a normal log, since Uvicorn puts success messages here
    backendProcess.stderr.on('data', (data) => {
      console.log(`[FastAPI Log]: ${data}`); 
    });

    backendProcess.on('error', (err) => {
       dialog.showErrorBox("Backend Failed to Start", `Path: ${backendPath}\nError: ${err.message}`);
    });

    backendProcess.on('exit', (code) => {
       if (code !== 0 && code !== null) {
           dialog.showErrorBox("Backend Crashed", `FastAPI exited with code ${code}. Check if port 8000 is in use.`);
       }
    });

  } catch (err) {
    dialog.showErrorBox("Spawn Error", err.message);
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.maximize()

  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  startFastAPI();

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', () => console.log('pong'))

  ipcMain.handle('select-directory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (canceled) {
      return null
    } else {
      return filePaths[0] 
    }
  })

  ipcMain.handle('execute-in-terminal', async (event, payload) => {
    const { commands, targetDirectory, subDirectory = '' } = payload;
    let finalPath = targetDirectory;

    if (subDirectory && subDirectory !== 'root') {
      finalPath = join(targetDirectory, subDirectory);
      if (!fs.existsSync(finalPath)) {
        fs.mkdirSync(finalPath, { recursive: true });
      }
    }

    const chainedCommands = commands.join(' && ');

    return new Promise((resolve, reject) => {
      const platform = os.platform();
      let cmdString = '';

      if (platform === 'win32') {
        cmdString = `start cmd /k "cd /d ${finalPath} && ${chainedCommands}"`;
      } else if (platform === 'darwin') {
        cmdString = `osascript -e 'tell app "Terminal" to do script "cd ${finalPath} && ${chainedCommands}"'`;
      } else {
        cmdString = `x-terminal-emulator -e "bash -c \\"cd ${finalPath} && ${chainedCommands}; exec bash\\""`;
      }

      exec(cmdString, (error, stdout, stderr) => {
        if (error) {
          console.error(`Execution error: ${error.message}`);
          reject({ status: 'error', message: error.message });
          return;
        }
        resolve({ status: 'success' });
      });
    });
  });

  setTimeout(() => {
    createWindow()
  }, 1500)

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// --- FIX 2: CRITICAL cleanup step. Kills the python process tree on Windows ---
app.on('will-quit', () => {
  if (backendProcess) {
    try {
      if (process.platform === 'win32') {
        // Force kill the process and all child processes to free Port 8000
        execSync(`taskkill /pid ${backendProcess.pid} /f /t`);
      } else {
        backendProcess.kill();
      }
    } catch (e) {
      console.log("Error killing backend tree:", e);
    }
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
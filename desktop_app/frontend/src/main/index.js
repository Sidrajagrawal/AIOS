import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { exec } from 'child_process'
import os from 'os'
import fs from 'fs'

app.disableHardwareAcceleration()

function createWindow() {
  // Create the browser window.
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

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // Our IPC handler for native folder selection
  ipcMain.handle('select-directory', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (canceled) {
      return null
    } else {
      return filePaths[0] // Returns the absolute path string
    }
  })

  // NEW: IPC handler for executing commands in an external terminal
  ipcMain.handle('execute-in-terminal', async (event, payload) => {
    // Destructure the new subDirectory property
    const { commands, targetDirectory, subDirectory = '' } = payload;

    // Determine the final path
    let finalPath = targetDirectory;

    if (subDirectory && subDirectory !== 'root') {
      finalPath = join(targetDirectory, subDirectory);
      // Create the folder if it does not exist
      if (!fs.existsSync(finalPath)) {
        fs.mkdirSync(finalPath, { recursive: true });
      }
    }

    const chainedCommands = commands.join(' && ');

    return new Promise((resolve, reject) => {
      const platform = os.platform();
      let cmdString = '';

      if (platform === 'win32') {
        // Change drive/dir to the finalPath
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

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
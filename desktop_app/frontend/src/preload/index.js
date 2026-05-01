import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  // Add subDirectory to the arguments
  openTerminal: (commands, targetDirectory, subDirectory) =>
    ipcRenderer.invoke('execute-in-terminal', { commands, targetDirectory, subDirectory })
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
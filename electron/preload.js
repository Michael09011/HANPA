import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('hanpa', {
  platform: process.platform,
  onAppCloseRequest: (callback) => {
    ipcRenderer.on('hanpa-app-close-request', () => callback());
  },
  sendAppCloseResponse: (shouldQuit) => {
    ipcRenderer.send('hanpa-app-close-response', shouldQuit);
  },
});

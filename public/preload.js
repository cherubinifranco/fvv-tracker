const { contextBridge, ipcRenderer } = require("electron");


function maxResApp() {
  ipcRenderer.send("maxResApp");
}
function closeApp() {
  ipcRenderer.send("closeApp");
}
function minimizeApp() {
  ipcRenderer.send("minimizeApp");
}

let electronBridge = {
};

let controlAppBridge = {
  minimizeApp,
  closeApp,
  maxResApp,
};

contextBridge.exposeInMainWorld("electronAPI", electronBridge);
contextBridge.exposeInMainWorld("controlAppBridge", controlAppBridge);

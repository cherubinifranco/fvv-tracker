const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { Notification } = require("electron");

const { autoUpdater } = require("electron-updater");

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let mainWindow;
let time = 0;
const development = true;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    minHeight: 650,
    minWidth: 800,
    frame: true,
    title: "Tracker",
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, "/preload.js"),
      devTools: true,
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  mainWindow.removeMenu()

  if (development) {
    mainWindow.webContents.openDevTools();
  }
  const windowURL = development
    ? "http://localhost:3000/"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(windowURL);
  ipcMain.on("closeApp", () => {
    mainWindow.close();
  });
  ipcMain.on("maxResApp", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.on("minimizeApp", () => {
    mainWindow.minimize();
  });

  ipcMain.on("startTimer", () => {
    console.log("start Timer");
  });

  ipcMain.on("stopTimer", () => {
    console.log("stop Timer");
  });
}

app.whenReady().then(() => {
  app.setAppUserModelId("Tracker");
  createWindow();
  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, "3000");
  if (development) {
    showNotification("Notification Test", "The notifications work as expected");
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

autoUpdater.on("update-available", (info) => {
  autoUpdater.downloadUpdate();
});

autoUpdater.on("update-not-available", (info) => {
  console.log(info);
});

autoUpdater.on("update-downloaded", (info) => {
  mainWindow.send("updateDownloaded");
  showNotification(
    "New version Availble",
    "The new version has been downloaded. Restart to see changes"
  );
});

autoUpdater.on("error", (info) => {
  console.log(info);
});

function showNotification(title, body) {
  new Notification({
    title: title,
    body: body,
    icon: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
  }).show();
}

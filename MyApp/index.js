'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const dialog = electron.dialog;
const ipcMain = electron.ipcMain;

let mainWindow;
let settingsWindow;
let menuTemplate = [{
  label: 'MyApp',
  submenu: [
    { label: 'About', accelerator: 'CmdOrCtrl+Shift+A', click: () => showAboutDialog() },
    { type: 'separator' },
    { label: 'Settings', accelerator: 'CmdOrCtrl+,', click: () => showSettingsWindow() },
    { type: 'separator' },
    { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() },
  ]
}];
let menu = Menu.buildFromTemplate(menuTemplate);

const createMainWindow = () => {
  Menu.setApplicationMenu(menu);
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const showAboutDialog = () => {
  dialog.showMessageBox({
    type: 'question',
    button: ['OK'],
    message: 'About this app',
    detail: 'This app was created by electron',
  });
};

const showSettingsWindow = () => {
  settingsWindow = new BrowserWindow({
    width: 600,
    height: 400,
  });
  settingsWindow.loadURL(`file://${__dirname}/settings.html`);
  settingsWindow.webContents.openDevTools();
  settingsWindow.show();
  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
};

app.on('ready', () => {
  // create window
  createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    createMainWindow();
  }
});

ipcMain.on("settings_changed", (event, color) => {
  // some process
});

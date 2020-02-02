'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

let mainWindow;
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

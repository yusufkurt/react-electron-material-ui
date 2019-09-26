const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { ipcMain } = require('electron');

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680, webPreferences: { preload: path.join(__dirname, 'preload.js') } });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    if(isDev){
        mainWindow.webContents.openDevTools();
    }
    
    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
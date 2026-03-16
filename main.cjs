const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {

  const win = new BrowserWindow({
    width: 1000,
    height: 700
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL("http://localhost:5173"); //para correrlo local 
  } else {
    const indexPath = path.join(app.getAppPath(), "dist", "index.html"); //para app de escrritorio
    win.loadFile(indexPath);
  }
}

app.whenReady().then(createWindow);

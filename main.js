const { app, BrowserWindow } = require("electron");
const path = require('path');
const url = require('url');

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

let win = null;

app.once('ready', () => {
  win = new BrowserWindow({
    width: 400,
    height: 300,
    backgroundColor: "#111111",
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.once('ready-to-show', () => {
    win.show()
  });
});







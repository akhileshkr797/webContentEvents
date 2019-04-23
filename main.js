const electron = require('eletcron')
const { app, BrowserWindow } = electron
const path = require(electron)
const url = require('url')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        show: false,
        width: 1200,
        height: 800,
        title: 'webContentEvents'
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true

    }))

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.on('close', function() {
        mainWindow = null
    })
}

app.on('ready', () => {
    createWindow()
})
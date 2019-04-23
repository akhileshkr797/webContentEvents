const electron = require('electron')
const { app, BrowserWindow, webContents } = electron
const path = require('path')
const url = require('url')

let mainWindow, secondWindow

function createWindow(fileStr, options) {
    let win = new BrowserWindow(options)


    //webcontent Events
    //did-start-loading

    win.webContents.on('did-start-loading', event => {
        console.log('did-start-loading:', event.sender.webContents.browserWindowOptions.title)
    })

    //did-stop-loading
    win.webContents.on('did-stop-loading', event => {
        console.log('did-stop-loading:', event.sender.webContents.browserWindowOptions.title)
    })

    //dom-ready
    win.webContents.on('dom-ready', event => {
        console.log('dom-ready:', event.sender.webContents.getTitle())
    })

    //did-finish-load
    win.webContents.on('did-finish-load', event => {
        console.log('did-finish-load:', event.sender.webContents.getTitle())
    })

    //did-fail-load
    win.webContents.on('did-fail-load', event => {
        console.log('did-fail-load', event.sender.webContents.getTitle())
    })

    win.webContents.on('page-favicon-updated', event => {
        console.log('page-favicon-updated:', event.sender.webContents.getTitle())
    })

    //new-window
    win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
        if (frameName === 'modal') {
            // open window as modal
            event.preventDefault()
            Object.assign(options, {
                modal: true,
                parent: mainWindow,
                width: 100,
                height: 100
            })
            event.newGuest = new BrowserWindow(options)
        }
    })








    //loading files to mainWindow

    win.loadURL(url.format({
        pathname: path.join(__dirname, fileStr),
        protocol: 'file:',
        slashes: true

    }))

    win.once('ready-to-show', () => {
        win.show()
    })

    win.on('close', function() {
        win = null
    })

    return win
}


app.on('ready', () => {
    mainWindow = createWindow('index.html', {
        show: false,
        width: 700,
        height: 500,
        title: 'mainWindow',
        alwaysOnTop: true,
        webPreferences: {
            nativeWindowOpen: true
        }
    })

    secondWindow = createWindow('about.html', {
        show: false,
        width: 500,
        height: 300,
        title: 'secondWindow',
        alwaysOnTop: true
    })
})
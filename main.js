// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");


const { PosPrinter } = require("electron-pos-printer");

function date() {
  const x = new Date();

  const y = "0" + x.getHours();
  const z = "0" + x.getMinutes();
  const s = "0" + x.getSeconds();
  const h = "0" + x.getDate();
  const ano = x.getFullYear().toString().substr(-2);
  const ms = x.getMonth();
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return (
    y.substr(-2) +
    ":" +
    z.substr(-2) +
    ":" +
    " -  " +
    h.substr(-2) +
    "/" +
    meses[ms]
  );
}

function print(orders) {
  // console.log(orders);
  
  let rows = []

  for(let order of orders) {
    console.log(order);
    rows = [
      ...rows,
      ...order.map(s=>({
        type: 'text',                                       
        value: typeof s === 'string' ? s : s.text,
        style: `text-align:left;`,
        css: typeof s === 'string' ? 
          {"font-weight": "300", "font-size": "12px","font-family": "Arial" } : 
          {"font-weight": "bold", "font-size": "12px","font-family": "Arial" }
      })),
      {
        type: 'text',                                       
        value: '_______________________________',
        style: `text-align:left;`,
        css: {"font-weight": "300", "font-size": "12px","font-family": "Arial" }
      }
   ]
  }

  console.log('print', rows);

  PosPrinter.print(rows, {
    preview: false, // Preview in window or print
    width: '200px', //  width of content body
    margin: "0 0 0 0", // margin of content body
    copies: 1, // Number of copies to print
    printerName: 'POS', // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 400,
    silent: true,
  })
    .then(() => {})
    .catch((error) => {
      console.error(error);
    });
}

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,     // ATENÇÃO AQUI - attention here - that's why your node_module works or not
    },
    show: false
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  
  tray = new Tray(path.join(__dirname, '/assets/icon.png'))
  tray.setToolTip('Printer Server')
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Test print', click: function () {
        
        console.log(print);
        print()
      }
    },
    {
      label: 'Quit', click: function () {
        isQuiting = true;
        app.quit();
      }
    }
  ]));

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows    are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});


const express = require('express')
var server = express();
var http = require('http').createServer(server);

server.use(express.json()); 
server.use(express.urlencoded()); 

server.post('/print', (req, res)=>{
    try {        
        const { orders } = req.body
        print(orders)
        res.send('ok')
    }catch(e) {
      console.log(e);
        res.status(400).send({error: e.stack})
    }
})

server.listen(3001, ()=>console.log('listening http at port 3001'))
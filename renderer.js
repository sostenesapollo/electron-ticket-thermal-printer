let { remote } = require("electron");
const { PosPrinter } = remote.require("electron-pos-printer");
const path = require("path");

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

function print() {
  PosPrinter.print([
    {
      type: "image",
      path: path.join(__dirname, "assets/apollo.png"), // file path
      position: "center", // position of image: 'left' | 'center' | 'right'
      width: "auto", // width of image in px; default: auto
      height: "30px", // width of image in px; default: 50 or '50px'
    },
    // {
    //   type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    //   value: "APOLLO GÀS",
    //   style: `text-align:center;font-family:Arial`,
    //   css: { "font-weight": "300", "font-size": "18px" },
    // },
    {
      type: 'table',
      // style the table
      style: 'border: 1px solid #ddd',
      // list of the columns to be rendered in the table header
      tableHeader: ['Animal', 'Age'],
      // multi dimensional array depicting the rows and columns of the table body
      tableBody: [
          ['Cat', 2],
          ['Dog', 4],
          ['Horse', 12],
          ['Pig', 4],
      ],
      // list of columns to be rendered in the table footer
      tableFooter: ['Animal', 'Age'],
      // custom style for the table header
      tableHeaderStyle: 'background-color: #000; color: white;',
      // custom style for the table body
      tableBodyStyle: 'border: 0.5px solid #ddd',
      // custom style for the table footer
      tableFooterStyle: 'background-color: #000; color: white;',
    },
    {
      type: 'table',
      style: 'border: 1px solid #ddd',             // style the table
      // list of the columns to be rendered in the table header
      tableHeader: [{type: 'text', value: 'Animal'}, {type: 'image', path: path.join(__dirname, 'icons/animal.png')}],
      // multi dimensional array depicting the rows and columns of the table body
      tableBody: [
          [{type: 'text', value: 'Cat'}, {type: 'image', path: './animals/cat.jpg'}],
          [{type: 'text', value: 'Dog'}, {type: 'image', path: './animals/dog.jpg'}],
          [{type: 'text', value: 'Horse'}, {type: 'image', path: './animals/horse.jpg'}],
          [{type: 'text', value: 'Pig'}, {type: 'image', path: './animals/pig.jpg'}],
      ],
      // list of columns to be rendered in the table footer
      tableFooter: [{type: 'text', value: 'Animal'}, 'Image'],
      // custom style for the table header
      tableHeaderStyle: 'background-color: #000; color: white;',
      // custom style for the table body
      tableBodyStyle: 'border: 0.5px solid #ddd',
      // custom style for the table footer
      tableFooterStyle: 'background-color: #000; color: white;',
   },
    {
      type: "text",
      value: "" + date(),
      style: `text-align:center;`,
      css: { "font-size": "12px", "font-family": "sans-serif" },
    }
  ], {
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

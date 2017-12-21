#!/usr/bin/env node

let https = require("https");
let serveStatic = require("serve-static");
let path = require("path");
let fs = require("fs");
let finalhandler = require("finalhandler");

var serve = serveStatic(process.cwd(), { index: ["index.html", "index.htm"] });

let server = https.createServer(
  {
    key: fs.readFileSync(path.resolve(__dirname, "./https_key/privatekey.pem")),
    cert: fs.readFileSync(
      path.resolve(__dirname, "./https_key/certificate.pem")
    )
  },
  (req, res) => {
    serve(req, res, finalhandler(req, res));
  }
);

server.listen(19963, () => {
  console.log("https://127.0.0.1:19963");
});

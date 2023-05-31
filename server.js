// require/enable http module
const http = require("http");
const logger = require("./logger");
const fs = require("fs");

const lg = new logger();
lg.listenForLog();

//using http module, create a server and store it in the variable 'server'
const server = http.createServer((req, res) => {
  //Request handling logic
  //log the request url
  // console.log(`Request url: ${req.url}\n`);
  let path = "./views/";
  const clientIP = req.socket.remoteAddress;
  let logMessage = "";
  //switch statement, allows for different routes based on the request url.
  switch (req.url) {
    case "/":
      //set response status code
      res.statusCode = 200;
      // set path for file
      path += "index.html";
      logMessage = "Connected to root page!";
      // emit log event
      lg.emit("log", path, "INFO", logMessage, clientIP);
      // get the file, compose response
      serveFile(path, res);
      break;
    case "/about":
      //set response status code
      res.statusCode = 200;
      // set path for file
      path += "about.html";
      logMessage = "Connected to about page!";
      // emit log event
      lg.emit("log", path, "INFO", logMessage, clientIP);
      // get the file, compose response
      serveFile(path, res);
      break;
    //case demonstrating a permanant redirect
    case "/about-old":
      // The HTTP response status code 301 Moved Permanently is used for permanent redirecting,
      res.statusCode = 301;
      logMessage = "Redirecting user from /about-old to /about";
      lg.emit("log", "/about-old", "INFO", logMessage, clientIP);
      //set Location url to desired redirect
      res.setHeader("Location", "/about");
      res.end();
      break;
    case "/links":
      //set response status code
      res.statusCode = 200;
      // set path for file
      path += "links.html";
      logMessage = "Connected to links page!";
      // emit log event
      lg.emit("log", path, "INFO", logMessage, clientIP);
      // get the file, compose response
      serveFile(path, res);
      break;
    case "/users":
      //set response status code
      res.statusCode = 200;
      // set path for file
      path += "users.json";
      logMessage = "Connected to users.json page!";
      // emit log event
      lg.emit("log", path, "INFO", logMessage, clientIP);
      // get the file, compose response
      serveFile(path, res);
      break;
    default:
      //set response status code
      res.statusCode = 404;
      // set path for file
      path += "404.html";
      logMessage = "Connected to 404 page!";
      // emit log event
      lg.emit("log", path, "ERROR", logMessage, clientIP);
      // get the file, compose response
      serveFile(path, res);
      break;
  }
});

const serveFile = (path, res) => {
  const navigation = fs.readFileSync("./views/navigation.html", "utf-8");

  fs.readFile(path, (error, data) => {
    if (error) {
      console.error("A problem was encountered loading the file: " + error);
      res.statusCode = 503;
      res.end();
    } else {
      res.writeHead(res.statusCode, { "Content-Type": "text/html" });
      res.write(navigation + data);
      res.end();
    }
  });
};

// // a count for connections since server restart
// let connectionCount = 0;

// // when a connection event is emitted from the server
// // increment connection count and display a message in server console
// server.on("connection", (socket) => {
//   // console.log(socket); //pretty big object!
//   connectionCount++;
//   console.log(
//     `\nNew connection...\nTotal connections since server restart: ${connectionCount}\n`
//   );
// });

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

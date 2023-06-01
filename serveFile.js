const fs = require("fs");
const path = require("path");

function serveFile(filePath, res) {
  const navigation = fs.readFileSync("./views/navigation.html", "utf-8");
  //   const style = fs.readFileSync("./css/style.css", "utf-8");
  const footer = fs.readFileSync("./views/footer.html", "utf-8");

  const ext = path.extname(filePath);

  if (ext === ".js" || ext === ".json") {
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        console.error("A problem was encountered loading the file: " + error);
        res.statusCode = 503;
        res.end();
      } else {
        res.writeHead(res.statusCode, { "Content-Type": `${getType(ext)}` });
        res.write(data);
        res.end();
      }
    });
  } else {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        console.error("A problem was encountered loading the file: " + error);
        res.statusCode = 503;
        res.end();
      } else {
        res.writeHead(res.statusCode, { "Content-Type": `${getType(ext)}` });
        res.write(navigation /*+ `<style>${style}</style>`*/ + data + footer);
        res.end();
      }
    });
  }
}

const getType = (ext) => {
  switch (ext) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    case ".json":
      return "application/json";
    default:
      return "application/octet-stream";
  }
};

module.exports = serveFile;

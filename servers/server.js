const http = require("http");
const fs = require("fs");
const _ = require('lodash')
const server = http.createServer((req, res) => {

  let num = _.random(0,7)
  console.log(num);

  res.setHeader("Content-Type", "text/html");
  let path = "./views/";

  switch (req.url) {
    case "/":
      path += "/index.html";
      res.statusCode = 200;
      break;

    case "/about":
      path += "/about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.setHeader("Location", "/about");
      res.statusCode = 301;
      res.end();
      break;
    default:
      path += "./404.html";
      res.statusCode = 404;
      break;
  }
  fs.readFile(path, (error, data) => {
    if (error) {
      console.log(error);
      res.end();
    } else {
      //   res.write(data);
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("server started to listen to port 3000");
});

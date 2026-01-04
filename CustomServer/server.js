const http = require("http");

http.createServer((req, res) => {
  res.end("This is the Custom Server Using HTTP");
}).listen(8098);

console.log("Server running on http://localhost:8098");

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("Example app listening on port ${port}");
});

app.get("/some-html", (req, res) => {
  res.send("<html><body><h1>bonjour html</h1></body></html>");
});

app.get("/some-json", (req, res) => {
  res.send(" “age”: 22, “nom” : ”Jane");
});

app.get("/transaction", (req, res) => {
  res.send("[100, 2000, 3000]");

  console.log(request.headers);
});

app.get("/exo-query-string", (req, res) => {
  res.send("Hello");
  console.log(req.query);
});

app.get("/get-user/:userId", function (req, res) {
  console.log(req.params);
  res.send("<h1>Utilisateur n°" + req.query.userId + "</h1>");
});

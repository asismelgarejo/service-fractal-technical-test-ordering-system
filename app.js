const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send({ application: "sample-app", version: "1.0" });
});
app.post("/hello", (req, res) => {
  res.send({ application: "sample-app POSTTT", version: "1.0" });
});
app.listen(3000, () => console.log(`Listening on: 3000`));

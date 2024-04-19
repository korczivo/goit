const express = require("express");
const router = require("./routes");

const app = new express();

app.use(express.json());
app.use("/api", router);

module.exports = app;
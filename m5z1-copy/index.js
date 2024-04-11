const Jimp = require("jimp");
const fs = require("fs").promises;
const express = require("express");
const path = require("path");
const multer = require("multer");
const { setupFolder } = require('./helpers')
const { v4: uuidV4 } = require("uuid");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "./public")));

const tempDir = path.join(process.cwd(), "temp");
const storeImageDir = path.join(process.cwd(), "public/images");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidV4()}${file.originalname}`);
    },
});

app.use((req, res, next) => {
    res.status(404).json({ message: "page not found" });
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ message: err.message, status: err.status });
});

app.listen(8000, async () => {
    await setupFolder(tempDir);
    await setupFolder(storeImageDir);
})
const fs = require("fs").promises;
const express = require("express");
const path = require("path");
const multer = require("multer");
const { setupFolder, isImageAndTransform } = require('./helpers')
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

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const uploadMiddleware = multer({
    storage,
    fileFilter: async (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const mimetype = file.mimetype;
        if (
            !extensionWhiteList.includes(extension) ||
            !mimetypeWhiteList.includes(mimetype)
        ) {
            return cb(null, false);
        }
        return cb(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
});

app.post(
    "/upload",
    uploadMiddleware.single("picture"),
    async (req, res, next) => {
        if (!req.file) {
            return res.status(400).json({ message: "File isn't a photo" });
        }
        const { path: temporaryPath } = req.file;
        const extension = path.extname(temporaryPath);
        const fileName = `${uuidV4()}${extension}`;
        const filePath = path.join(storeImageDir, fileName);

        try {
            await fs.rename(temporaryPath, filePath);
        } catch (e) {
            await fs.unlink(temporaryPath)
            return next(e)
        }

        const isValidAndTransform = await isImageAndTransform(filePath);
        if (!isValidAndTransform) {
            await fs.unlink(filePath);
            return res
                .status(400)
                .json({ message: "File isnt a photo but is pretending" });
        }
        res.redirect(`/uploaded/${fileName}`)
    }
);

app.get("/uploaded/:imgPath", (req, res) => {
    const { imgPath } = req.params;
    res.render("uploaded", { imgPath });
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
const fs = require("fs").promises;
const isAccessible = (path) =>
    fs.access(path)
        .then(() => true)
        .catch(() => false);

const setupFolder = async (path) => {
    const folderExist = await isAccessible(path);
    if (!folderExist) {
        try {
            await fs.mkdir(path);
        } catch (e) {
            console.log("no permissions!");
            process.exit(1);
        }
    }
};

module.exports = { setupFolder };
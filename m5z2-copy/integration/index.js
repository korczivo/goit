const db = require("./db");
const app = require("./app");

require("dotenv").config();

db.connect(process.env.DB_HOST)
    .then(() => {
        console.log("connnected");
        app.listen(8000, () => {
            console.log("listening");
        });
    })
    .catch(() => {
        console.log("db error");
    });
const dotenv = require("dotenv");

module.exports = () => {
    dotenv.config({ path: ".test.env" });
};
const mongoose = require("mongoose");

module.exports = {
    connect: (uri) => mongoose.connect(uri),
    disconnect: () => mongoose.connection.close(),
};
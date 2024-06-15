const fs = require("fs");
const path = require("path");

const isClientBuilt = fs.existsSync(path.join(__dirname, "./client/build"));

if (!isClientBuilt) {
    throw new Error("Client build files missing");
}

require("dotenv").config();
require("./src/app");
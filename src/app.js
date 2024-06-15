const express = require("express");
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")

const authenticationRoutes  = require("./routes/authentication");
const taskRoutes = require("./routes/task");

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors())

app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/api/authentication", authenticationRoutes);
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        throw new Error(err);
    }

    console.log(`Server is running on port ${PORT}`);
});
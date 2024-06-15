const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");

const authenticationRoutes  = require("./routes/authentication");
const taskRoutes = require("./routes/task");

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors())

app.use("/authentication", authenticationRoutes);
app.use("/task", taskRoutes);

app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        throw new Error(err);
    }

    console.log("Server is running on port 3000");
});
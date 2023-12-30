const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const path = require("path")


app.use(express.json());
app.use(cookieParser());

//config
if(process.env.NODE_ENVIRONMENT !== "PRODUCTION"){
    require("dotenv").config({path:"config/config.env"});
}

// Import Route
const notesRoutes = require("./routes/noteRoute");
const usersRoutes = require("./routes/userRoute");


app.use("/api/v1",notesRoutes);
app.use("/api/v1",usersRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


app.use(errorMiddleware);

module.exports = app;

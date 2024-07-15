if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const messmenuRouter = require("./routes/messmenu.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

main()
    .then(() => console.log("connected to DB"))
    .catch(err => console.error(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

app.get("/", (req, res) => {
    res.send("Hi, I'm root route");
});

app.use("/messmenu", messmenuRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is listening...");
});
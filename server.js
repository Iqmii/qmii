const express = require("express");
const bcrypt = require('bcryptjs');

const app = express();
const path = require("path");
const cors = require('cors');
const mongoose = require('../db');
const authRouter = require('./authRouter');
const authController = require("./authController");
const { auth } = require("googleapis/build/src/apis/abusiveexperiencereport");

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cors());
app.use("/auth", authRouter);
app.use("/auth",authRouter)
if (app.use)  {
  console.log("app.use(");
}














const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




/*
const mongoose = require('./db');
 const checkEmailAndCreate = require('./routes/chekEmail');

app.use(cors());




app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Додає підтримку JSON


app.post("/register", checkEmailAndCreate);

app.listen(4000, () => {
  console.log("Сервер запущено на порту 4000");
});
console.log("jm") */

require("dotenv").config();
const express = require("express");
const sequelize = require("./db/config");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: process.env.NODE_ENV === "production" ? "*" : "http://localhost:5555",
  methods: "GET,PUT,POST,DELETE",
};

app.use(cors(corsOptions));

// database
sequelize.sync();

// routes
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const accountRoutes = require("./routes/accountRoutes");

// cookie parser
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", courseRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", accountRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

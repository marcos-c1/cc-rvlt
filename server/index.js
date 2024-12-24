const express = require("express");
require("dotenv").config();
const sequelize = require("./db/config");
const PORT = process.env.PORT || 3000;
const app = express();

// database
sequelize.sync();

// routes
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const accountRoutes = require("./routes/accountRoutes");

app.use("/api/v1", userRoutes);
app.use("/api/v1", courseRoutes);
app.use("/api/v1", paymentRoutes);
app.use("/api/v1", accountRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

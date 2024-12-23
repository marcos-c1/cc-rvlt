const express = require("express");
require("dotenv").config();
const sequelize = require("./db/config");
const PORT = process.env.PORT || 3000;
const app = express();

// Rotas
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

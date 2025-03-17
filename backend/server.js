const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const projektRoutes = require("./routes/projekte");
app.use("/api/projekte", projektRoutes);

const mitarbeitendeRoutes = require("./routes/mitarbeitende");
app.use("/api/mitarbeitende", mitarbeitendeRoutes);

app.get("/", (req, res) => {
    res.send("Projektverwaltung API läuft!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

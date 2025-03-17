const express = require("express");
const router = express.Router();
const pool = require("../db");

// 🔹 Alle Mitarbeitenden abrufen
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM MITARBEITENDE");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Einzelnen Mitarbeiter abrufen
router.get("/:personalnummer", async (req, res) => {
    const { personalnummer } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM MITARBEITENDE WHERE personalnummer = ?", [personalnummer]);
        if (rows.length === 0) return res.status(404).json({ error: "Mitarbeiter nicht gefunden" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Neuen Mitarbeiter hinzufügen
router.post("/", async (req, res) => {
    const { personalnummer, name, vorname, abteilung, arbeitspensum } = req.body;
    try {
        await pool.query(
            "INSERT INTO MITARBEITENDE (personalnummer, name, vorname, abteilung, arbeitspensum) VALUES (?, ?, ?, ?, ?)",
            [personalnummer, name, vorname, abteilung, arbeitspensum]
        );
        res.status(201).json({ message: "Mitarbeiter hinzugefügt!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Mitarbeiter bearbeiten
router.patch("/:personalnummer", async (req, res) => {
    const { personalnummer } = req.params;
    const { name, vorname, abteilung, arbeitspensum } = req.body;
    try {
        await pool.query(
            "UPDATE MITARBEITENDE SET name = ?, vorname = ?, abteilung = ?, arbeitspensum = ? WHERE personalnummer = ?",
            [name, vorname, abteilung, arbeitspensum, personalnummer]
        );
        res.json({ message: "Mitarbeiter aktualisiert!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Mitarbeiter löschen
router.delete("/:personalnummer", async (req, res) => {
    const { personalnummer } = req.params;
    try {
        await pool.query("DELETE FROM MITARBEITENDE WHERE personalnummer = ?", [personalnummer]);
        res.json({ message: "Mitarbeiter gelöscht!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

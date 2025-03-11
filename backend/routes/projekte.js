const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT projektId, titel, beschreibung FROM PROJEKT");

        // Projektreferenz dynamisch aus der projektId generieren
        const projekteMitReferenz = rows.map(projekt => ({
            ...projekt,
            projektreferenz: `PRJ-${projekt.projektId}` // Referenz aus projektId erstellen
        }));

        res.json(projekteMitReferenz);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Projektdetails abrufen
router.get("/:projektId", async (req, res) => {
    const { projektId } = req.params;
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.projektId, 
                CONCAT('PRJ-', p.projektId) AS projektreferenz, 
                p.titel, 
                p.beschreibung, 
                p.bewilligungsdatum, 
                p.startGeplant, 
                p.endGeplant, 
                p.projektleiter, 
                v.name AS vorgehensmodell
            FROM PROJEKT p
            LEFT JOIN VORGEHENSMODELL v ON p.vorgehensmodellId = v.vorgehensmodellId
            WHERE p.projektId = ?
        `, [projektId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Projekt nicht gefunden" });
        }

        res.json(rows[0]); // Einzelnes Projekt zurückgeben
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Projektphasen für Projekte abrufen
router.get("/:projektId/phasen", async (req, res) => {
    const { projektId } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM PROJEKTPHASE WHERE projektId = ?", [projektId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Dokumente für Projekte abrufen
router.get("/:projektId/dokumente", async (req, res) => {
    const { projektId } = req.params;
    try {
        const [rows] = await pool.query("SELECT * FROM DOKUMENT WHERE projektId = ?", [projektId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Einzelne Phase abrufen (mit phasenstatus als Name der Phase)
// Phase für ein bestimmtes Projekt abrufen
router.get("/:projektId/phasen/:phaseId", async (req, res) => {
    const { projektId, phaseId } = req.params;

    try {
        const [rows] = await pool.query(`
            SELECT phaseId, projektId, startGeplant, endGeplant, startEffektiv, endEffektiv, 
                   reviewDatumGeplant, reviewDatumEffektiv, freigabedatum, freigabevisum, 
                   phasenstatus, phasenfortschritt 
            FROM PROJEKTPHASE
            WHERE phaseId = ? AND projektId = ?
        `, [phaseId, projektId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Phase nicht gefunden" });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error("Fehler beim Abrufen der Phase:", err.message);
        res.status(500).json({ error: err.message });
    }
});



// Aktivitäten für eine Phase abrufen
router.get("/:projektId/phasen/:phaseId/aktivitaeten", async (req, res) => {
    const { projektId, phasenId } = req.params;

    try {
        const [rows] = await pool.query(`
            SELECT * FROM AKTIVITAET WHERE phaseId = ? AND projektId = ?
        `, [phasenId, projektId]);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Dokumente für eine Phase abrufen
router.get("/:projektId/phasen/:phaseId/dokumente", async (req, res) => {
    const { projektId, phasenId } = req.params;

    try {
        const [rows] = await pool.query(`
            SELECT * FROM DOKUMENT WHERE phaseId = ? AND projektId = ?
        `, [phasenId, projektId]);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Speichern von Projektdetails
router.patch("/:projektId", async (req, res) => {
    const { projektId } = req.params;
    const { prioritaet, status, startEffektiv, endEffektiv, projektfortschritt } = req.body;

    try {
        await pool.query(`
            UPDATE PROJEKT 
            SET 
                prioritaet = ?, 
                status = ?, 
                startEffektiv = ?, 
                endEffektiv = ?, 
                projektfortschritt = ?
            WHERE projektId = ?
        `, [prioritaet, status, startEffektiv, endEffektiv, projektfortschritt, projektId]);

        res.json({ message: "Projekt aktualisiert!" });
    } catch (err) {
        console.error("Fehler beim Aktualisieren des Projekts:", err.message);
        res.status(500).json({ error: err.message });
    }
});

router.post("/", async (req, res) => {
    console.log("POST /api/projekte - Empfangene Daten:", req.body); // Debugging

    const { titel, beschreibung, bewilligungsdatum, startGeplant, endGeplant, projektleiter, vorgehensmodell } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO PROJEKT (titel, beschreibung, bewilligungsdatum, startGeplant, endGeplant, projektleiter, vorgehensmodellId, status, prioritaet, projektfortschritt) VALUES (?, ?, ?, ?, ?, ?, ?, 'In Planung', 1, '0%')",
            [titel, beschreibung, bewilligungsdatum, startGeplant, endGeplant, projektleiter, vorgehensmodell]
        );

        const projektId = result[0].insertId; // Die neue Projekt-ID aus der Datenbank holen
        const projektreferenz = `PRJ-${projektId}`; // Projektreferenz basierend auf der ID generieren

        console.log("Projekt erfolgreich gespeichert:", { projektId, projektreferenz });

        res.status(201).json({ message: "Projekt erstellt!", projektId, projektreferenz });
    } catch (err) {
        console.error("Fehler beim Speichern in der Datenbank:", err.message);
        res.status(500).json({ error: err.message });
    }
});

router.delete("/:projektId", async (req, res) => {
    const { projektId } = req.params;

    try {
        const [result] = await pool.query("DELETE FROM PROJEKT WHERE projektId = ?", [projektId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Projekt nicht gefunden" });
        }

        res.json({ message: "Projekt erfolgreich gelöscht!" });
    } catch (err) {
        console.error("Fehler beim Löschen des Projekts:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

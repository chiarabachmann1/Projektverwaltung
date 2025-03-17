import { useState } from "react";
import axios from "axios";

function Projektdetails({ projekt }) {
    const [editableProjekt, setEditableProjekt] = useState(projekt);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableProjekt({ ...editableProjekt, [name]: value });
        setIsSaved(false); // Speichern-Button aktivieren
    };

    const handleSave = async () => {
        try {
            await axios.patch(`http://localhost:5000/api/projekte/${projekt.projektId}`, editableProjekt);
            setIsSaved(true);
            alert("Änderungen erfolgreich gespeichert!");
        } catch (error) {
            console.error("Fehler beim Speichern:", error.response ? error.response.data : error.message);
            alert("Fehler beim Speichern!");
        }
    };

    return (
        <div>
            <h2>Projektdetails</h2>
            <p><strong>Projektreferenz:</strong> {projekt.projektreferenz}</p>
            <p><strong>Beschreibung:</strong> {projekt.beschreibung}</p>
            <p><strong>Bewilligungsdatum:</strong> {projekt.bewilligungsdatum}</p>
            <p><strong>Start (geplant):</strong> {projekt.startGeplant}</p>
            <p><strong>Ende (geplant):</strong> {projekt.endGeplant}</p>
            <p><strong>Projektleiter/in:</strong> {projekt.projektleiter}</p>
            <p><strong>Vorgehensmodell:</strong> {projekt.vorgehensmodell || "Unbekannt"}</p>

            <p><strong>Priorität:</strong>
            <select name="prioritaet" value={editableProjekt.prioritaet} onChange={handleChange}>
                <option value="1">Niedrig</option>
                <option value="2">Mittel</option>
                <option value="3">Hoch</option>
            </select></p>

            <p><strong>Status:</strong>
            <select name="status" value={editableProjekt.status} onChange={handleChange}>
                <option value="In Planung">In Planung</option>
                <option value="In Bearbeitung">In Bearbeitung</option>
                <option value="Abgeschlossen">Abgeschlossen</option>
            </select></p>

            <p><strong>Startdatum (effektiv):</strong>
            <input type="date" name="startEffektiv" value={editableProjekt.startEffektiv || ""} onChange={handleChange} /></p>

            <p><strong>Enddatum (effektiv):</strong>
            <input type="date" name="endEffektiv" value={editableProjekt.endEffektiv || ""} onChange={handleChange} /></p>

            <p><strong>Projektfortschritt (%):</strong>
            <input type="number" name="projektfortschritt" value={editableProjekt.projektfortschritt} min="0" max="100" onChange={handleChange} /></p>

            {/* 🔹 Speichern-Button */}
            <button 
                onClick={handleSave} 
                disabled={isSaved} 
                style={{ backgroundColor: isSaved ? "gray" : "blue", color: "white", padding: "10px", marginTop: "10px", cursor: isSaved ? "not-allowed" : "pointer" }}>
                {isSaved ? "Gespeichert ✅" : "Änderungen speichern"}
            </button>
        </div>
    );
}

export default Projektdetails;

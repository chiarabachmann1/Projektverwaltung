import { useState, useEffect } from "react";
import "./ProjektModal.css";

function ProjektModal({ isOpen, onClose, onSave }) {
    if (!isOpen) return null;

    // Funktion zur Generierung einer Projektreferenz
    const generateProjektRef = () => `PRJ-${Math.floor(1000 + Math.random() * 9000)}`;

    const [projektdaten, setProjektdaten] = useState({
        projektreferenz: generateProjektRef(), // Direkt eine Projektreferenz setzen
        titel: "",
        beschreibung: "",
        bewilligungsdatum: "",
        startGeplant: "",
        endGeplant: "",
        projektleiter: "",
        vorgehensmodell: "",
    });

    useEffect(() => {
        if (isOpen) {
            // Bei jedem Öffnen eine neue Projektreferenz generieren
            setProjektdaten({
                projektreferenz: generateProjektRef(),
                titel: "",
                beschreibung: "",
                bewilligungsdatum: "",
                startGeplant: "",
                endGeplant: "",
                projektleiter: "",
                vorgehensmodell: "",
            });
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setProjektdaten({ ...projektdaten, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        console.log("Gesendete Daten:", projektdaten); // Debugging
    
        const projekt = await onSave(projektdaten); // Projekt speichern
    
        if (projekt && projekt.projektreferenz) {
            setProjektdaten({ ...projektdaten, projektreferenz: projekt.projektreferenz });
            onClose(); // 🔹 Modalfenster schließen nach erfolgreichem Speichern
        }
    };
    

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Neues Projekt erstellen</h2>

                <label>Projektreferenz</label>
                <input type="text" value={projektdaten.projektreferenz} readOnly />

                <label>Titel</label>
                <input type="text" name="titel" value={projektdaten.titel} onChange={handleChange} required />

                <label>Beschreibung</label>
                <textarea name="beschreibung" value={projektdaten.beschreibung} onChange={handleChange} required />

                <label>Bewilligungsdatum</label>
                <input type="date" name="bewilligungsdatum" value={projektdaten.bewilligungsdatum} onChange={handleChange} required />

                <label>Startdatum (geplant)</label>
                <input type="date" name="startGeplant" value={projektdaten.startGeplant} onChange={handleChange} required />

                <label>Enddatum (geplant)</label>
                <input type="date" name="endGeplant" value={projektdaten.endGeplant} onChange={handleChange} required />

                <label>Projektleiter/in</label>
                <input type="text" name="projektleiter" value={projektdaten.projektleiter} onChange={handleChange} required />

                <label>Vorgehensmodell</label>
                <select name="vorgehensmodell" value={projektdaten.vorgehensmodell} onChange={handleChange} required>
                    <option value="">Bitte wählen...</option>
                    <option value="1">Agiles Modell</option>
                    <option value="2">Wasserfallmodell</option>
                    <option value="3">V-Modell</option>
                    <option value="4">Scrum</option>
                </select>

                <div className="modal-buttons">
                    <button onClick={handleSubmit}>Speichern</button>
                    <button onClick={onClose} className="cancel">Abbrechen</button>
                </div>
            </div>
        </div>
    );
}

export default ProjektModal;

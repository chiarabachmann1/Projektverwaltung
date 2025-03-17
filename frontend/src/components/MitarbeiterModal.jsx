import { useState } from "react";
import "./MitarbeiterModal.css";

function MitarbeiterModal({ isOpen, onClose, onSave }) {
    const [personalnummer, setPersonalnummer] = useState("");
    const [name, setName] = useState("");
    const [vorname, setVorname] = useState("");
    const [abteilung, setAbteilung] = useState("");
    const [arbeitspensum, setArbeitspensum] = useState("");

    const handleSubmit = () => {
        if (!personalnummer || !name || !vorname || !abteilung || !arbeitspensum) {
            alert("Bitte alle Felder ausfüllen!");
            return;
        }

        onSave({ personalnummer, name, vorname, abteilung, arbeitspensum });
        onClose(); // Modal schließen nach Speichern
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Neue Person</h2>
                <input type="number" placeholder="Personalnummer" value={personalnummer} onChange={(e) => setPersonalnummer(e.target.value)} />
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Vorname" value={vorname} onChange={(e) => setVorname(e.target.value)} />
                <input type="text" placeholder="Abteilung" value={abteilung} onChange={(e) => setAbteilung(e.target.value)} />
                <input type="number" placeholder="Arbeitspensum (%)" value={arbeitspensum} onChange={(e) => setArbeitspensum(e.target.value)} />
                
                <div className="modal-buttons">
                    <button onClick={handleSubmit}>Speichern</button>
                    <button onClick={onClose} className="cancel">Abbrechen</button>
                </div>
            </div>
        </div>
    );
}

export default MitarbeiterModal;

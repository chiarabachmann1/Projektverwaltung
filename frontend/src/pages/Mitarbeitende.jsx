import { useEffect, useState } from "react";
import { getMitarbeitende } from "../api";
import { Link } from "react-router-dom";
import MitarbeiterModal from "../components/MitarbeiterModal"; // 🔹 Importiere das Modal

function Mitarbeitende() {
    const [mitarbeitende, setMitarbeitende] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // 🔹 Status für Modal

    // 🔹 Daten abrufen und aktualisieren
    const fetchMitarbeitende = async () => {
        const data = await getMitarbeitende();
        setMitarbeitende(data);
    };

    useEffect(() => {
        fetchMitarbeitende();
    }, []);

    return (
        <div>
            <h2>Mitarbeitende</h2>

            {/* 🔹 Button für Modal */}
            <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: "grey", color: "white" }}>Neue Person</button>

            {/* 🔹 Modal für neue Mitarbeiter */}
            <MitarbeiterModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onMitarbeiterGespeichert={fetchMitarbeitende} // 🔹 Aktualisiere die Liste nach Speichern
            />

            {/* 🔹 Liste der Mitarbeiter */}
            <ul>
                {mitarbeitende.map((mitarbeiter) => (
                    <li key={mitarbeiter.personalnummer}>
                        <Link to={`/mitarbeitende/${mitarbeiter.personalnummer}`}>
                            {mitarbeiter.vorname} {mitarbeiter.name} ({mitarbeiter.personalnummer})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Mitarbeitende;

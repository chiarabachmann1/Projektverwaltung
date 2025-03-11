import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Link für Navigation hinzufügen
import { getProjekte } from "../api";
import axios from "axios";
import ProjektModal from "../components/ProjektModal";

function Projekte() {
    const [projekte, setProjekte] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const data = await getProjekte();
            setProjekte(data);
        }
        fetchData();
    }, []);

    const handleSaveProjekt = async (projektdaten) => {
        try {
            const response = await axios.post("http://localhost:5000/api/projekte", projektdaten);
            const newProjekt = response.data; // Serverantwort mit projektId & projektreferenz
    
            // Neues Projekt in der Liste mit Projektreferenz speichern
            setProjekte([...projekte, { ...projektdaten, projektreferenz: newProjekt.projektreferenz }]);
            return newProjekt; // Die Projektreferenz wird ans Modal zurückgegeben
        } catch (error) {
            console.error("Fehler beim Speichern des Projekts:", error.response ? error.response.data : error.message);
        }
    };
    

    return (
        <div>
            <h2>Projekte</h2>
            <button onClick={() => setIsModalOpen(true)} style={{ marginTop: "20px", background: "grey", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>Neues Projekt</button>

            <ProjektModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveProjekt} 
            />

            <ul>
                {projekte.map((projekt) => (
                    <li key={projekt.projektId}>
                        {/* ✅ Projekt als anklickbarer Link */}
                        <Link to={`/projekte/${projekt.projektId}`}>
                            <h3>{projekt.titel} ({projekt.projektreferenz})</h3>
                        </Link>
                        <p>{projekt.beschreibung}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Projekte;

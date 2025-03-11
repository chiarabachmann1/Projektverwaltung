import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, Route, Routes } from "react-router-dom";
import axios from "axios";
import Projektdetails from "./ProjektTabs/Projektdetails";
import Projektphasen from "./ProjektTabs/Projektphasen";
import ProjektphaseDetail from "./ProjektTabs/ProjektphaseDetail";
import Dokumente from "./ProjektTabs/Dokumente";

function ProjektDetail() {
    const { projektId } = useParams();
    const navigate = useNavigate();
    const [projekt, setProjekt] = useState(null);

    useEffect(() => {
        async function fetchProjekt() {
            const response = await fetch(`http://localhost:5000/api/projekte/${projektId}`);
            const data = await response.json();
            setProjekt(data);
        }
        fetchProjekt();
    }, [projektId]);

    const handleDelete = async () => {
        if (window.confirm("Möchtest du dieses Projekt wirklich löschen?")) {
            try {
                await axios.delete(`http://localhost:5000/api/projekte/${projektId}`);
                alert("Projekt erfolgreich gelöscht!");
                navigate("/projekte"); // 🔹 Zurück zur Projektliste nach Löschen
            } catch (error) {
                console.error("Fehler beim Löschen des Projekts:", error.response ? error.response.data : error.message);
            }
        }
    };

    if (!projekt) return <h2>Lade Projekt...</h2>;

    return (
        <div>
            <h2>{projekt.titel}</h2>
            <nav>
                <Link to="">Projektdetails</Link> | 
                <Link to="phasen">Projektphasen</Link> | 
                <Link to="dokumente">Dokumente</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Projektdetails projekt={projekt} />} />
                <Route path="phasen" element={<Projektphasen projektId={projektId} />} />
                <Route path="phasen/:phasenId/*" element={<ProjektphaseDetail />} />  {/* 🔹 WICHTIG: Hier muss das `/*` hin */}
                <Route path="dokumente" element={<Dokumente projektId={projektId} />} />
            </Routes>


            {/* 🔹 "Projekt löschen" Button */}
            <button onClick={handleDelete} style={{ marginTop: "20px", background: "red", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
                Projekt löschen
            </button>
        </div>
    );
}

export default ProjektDetail;

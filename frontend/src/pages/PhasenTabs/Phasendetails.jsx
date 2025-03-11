import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Phasendetails() {
    const { projektId, phaseId } = useParams();
    const [phase, setPhase] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPhase() {
            try {
                const response = await fetch(`http://localhost:5000/api/projekte/${projektId}/phasen/${phaseId}`);
                if (!response.ok) {
                    throw new Error("Phase nicht gefunden");
                }
                const data = await response.json();
                setPhase(data);
            } catch (err) {
                setError(err.message);
            }
        }
        fetchPhase();
    }, [projektId, phaseId]);

    if (error) return <h2>{error}</h2>;
    if (!phase) return <h2>Lade Phasendetails...</h2>;

    return (
        <div>
            <h3>Details zur Phase: {phase.phasenstatus || "Unbekannte Phase"}</h3>
            <p><strong>Geplantes Startdatum:</strong> {phase.startGeplant}</p>
            <p><strong>Geplantes Enddatum:</strong> {phase.endGeplant}</p>
            <p><strong>Effektives Startdatum:</strong> {phase.startEffektiv || "Noch nicht gestartet"}</p>
            <p><strong>Effektives Enddatum:</strong> {phase.endEffektiv || "Noch nicht abgeschlossen"}</p>
        </div>
    );
}

export default Phasendetails;

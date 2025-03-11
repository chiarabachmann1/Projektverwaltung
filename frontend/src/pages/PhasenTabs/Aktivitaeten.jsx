import { useEffect, useState } from "react";

function Aktivitaeten({ projektId, phasenId }) {
    const [aktivitaeten, setAktivitaeten] = useState([]);

    useEffect(() => {
        async function fetchAktivitaeten() {
            const response = await fetch(`http://localhost:5000/api/projekte/${projektId}/phasen/${phasenId}/aktivitaeten`);
            const data = await response.json();
            setAktivitaeten(data);
        }
        fetchAktivitaeten();
    }, [projektId, phasenId]);

    return (
        <div>
            <h3>Aktivitäten in dieser Phase</h3>
            <ul>
                {aktivitaeten.length === 0 ? (
                    <p>Keine Aktivitäten vorhanden.</p>
                ) : (
                    aktivitaeten.map((aktivitaet) => (
                        <li key={aktivitaet.aktivitaetId}>{aktivitaet.name} - {aktivitaet.status}</li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Aktivitaeten;

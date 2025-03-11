import { useEffect, useState } from "react";

function Dokumente({ projektId, phasenId }) {
    const [dokumente, setDokumente] = useState([]);

    useEffect(() => {
        async function fetchDokumente() {
            const response = await fetch(`http://localhost:5000/api/projekte/${projektId}/phasen/${phasenId}/dokumente`);
            const data = await response.json();
            setDokumente(data);
        }
        fetchDokumente();
    }, [projektId, phasenId]);

    return (
        <div>
            <h3>Dokumente in dieser Phase</h3>
            <ul>
                {dokumente.length === 0 ? (
                    <p>Keine Dokumente vorhanden.</p>
                ) : (
                    dokumente.map((dokument) => (
                        <li key={dokument.dokumentId}>
                            <a href={dokument.dateiPfad} target="_blank" rel="noopener noreferrer">{dokument.titel}</a>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Dokumente;

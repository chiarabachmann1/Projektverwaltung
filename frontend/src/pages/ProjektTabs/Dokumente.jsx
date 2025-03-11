import { useEffect, useState } from "react";

function Dokumente({ projektId }) {
    const [dokumente, setDokumente] = useState([]);

    useEffect(() => {
        async function fetchDokumente() {
            const response = await fetch(`http://localhost:5000/api/projekte/${projektId}/dokumente`);
            const data = await response.json();
            setDokumente(data);
        }
        fetchDokumente();
    }, [projektId]);

    return (
        <div>
            <h2>Dokumente</h2>
            <ul>
                {dokumente.map((dokument) => (
                    <li key={dokument.dokumentId}>
                        <a href={dokument.dateiPfad} target="_blank" rel="noopener noreferrer">{dokument.titel}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dokumente;

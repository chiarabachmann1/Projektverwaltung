import { Link } from "react-router-dom";

function Projektphasen({ projektId }) {
    const phasen = [
        { name: "Initialisierungsphase", id: "1" },
        { name: "Konzeptphase", id: "2" },
        { name: "Realisierungsphase", id: "3" },
        { name: "Testphase", id: "4" },
        { name: "Abschlussphase", id: "5" }
    ];

    return (
        <div>
            <h2>Projektphasen</h2>
            <ul>
                {phasen.map((phase) => (
                    <li key={phase.id}>
                        <Link to={`/projekte/${projektId}/phasen/${phase.id}`}>
                            {phase.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Projektphasen;

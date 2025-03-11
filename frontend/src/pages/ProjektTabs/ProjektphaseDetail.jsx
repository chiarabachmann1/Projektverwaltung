import { useParams, Link, Routes, Route } from "react-router-dom";
import Phasendetails from "../PhasenTabs/Phasendetails";
import Aktivitaeten from "../PhasenTabs/Aktivitaeten";
import Dokumente from "../PhasenTabs/Dokumente";

function ProjektphaseDetail() {
    const { projektId, phaseId } = useParams();

    return (
        <div>
            <h2>Projektphase: {phaseId}</h2>

            {/* Navigation für die Unterseiten */}
            <nav>
                <Link to="">Phasendetails</Link> |  
                <Link to="aktivitaeten">Aktivitäten</Link> |  
                <Link to="dokumente">Dokumente</Link>
            </nav>

            {/* Routen für die Unterseiten */}
            <Routes>
                <Route index element={<Phasendetails />} />
                <Route path="aktivitaeten" element={<Aktivitaeten />} />
                <Route path="dokumente" element={<Dokumente />} />
            </Routes>
        </div>
    );
}

export default ProjektphaseDetail;

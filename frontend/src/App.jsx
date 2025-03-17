import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projekte from "./pages/Projekte";
import ProjektDetail from "./pages/ProjektDetail";
import Vorgehensmodelle from "./pages/Vorgehensmodelle";
import Mitarbeitende from "./pages/Mitarbeitende";
import MitarbeiterDetail from "./pages/MitarbeiterDetail";
import Berichte from "./pages/Berichte";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projekte" element={<Projekte />} />
                    <Route path="/projekte/:projektId/*" element={<ProjektDetail />} />
                    <Route path="/vorgehensmodelle" element={<Vorgehensmodelle />} />
                    <Route path="/mitarbeitende" element={<Mitarbeitende />} />
                    <Route path="/mitarbeitende/:personalnummer" element={<MitarbeiterDetail />} />
                    <Route path="/berichte" element={<Berichte />} />
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return <p>Bitte wähle eine Kategorie aus dem Menü.</p>;
}

export default App;

import { Link } from "react-router-dom";
import "./Navbar.css"; // Stelle sicher, dass die CSS-Datei existiert

function Navbar() {
    return (
        <nav className="navbar">
            <h1>Projektverwaltung</h1>
            <ul>
                <li><Link to="/projekte">Projekte</Link></li>
                <li><Link to="/vorgehensmodelle">Vorgehensmodelle</Link></li>
                <li><Link to="/mitarbeitende">Mitarbeitende</Link></li>
                <li><Link to="/berichte">Berichte</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;

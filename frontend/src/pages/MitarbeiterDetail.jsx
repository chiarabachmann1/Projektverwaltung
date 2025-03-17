import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function MitarbeiterDetail() {
    const { personalnummer } = useParams();
    const navigate = useNavigate();
    const [mitarbeiter, setMitarbeiter] = useState(null);

    useEffect(() => {
        async function fetchMitarbeiter() {
            try {
                const response = await axios.get(`http://localhost:5000/api/mitarbeitende/${personalnummer}`);
                setMitarbeiter(response.data);
            } catch (error) {
                console.error("Fehler beim Abrufen des Mitarbeiters:", error);
            }
        }
        fetchMitarbeiter();
    }, [personalnummer]);

    const handleChange = (e) => {
        setMitarbeiter({ ...mitarbeiter, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axios.patch(`http://localhost:5000/api/mitarbeitende/${personalnummer}`, mitarbeiter);
            alert("Änderungen gespeichert!");
        } catch (error) {
            console.error("Fehler beim Speichern der Änderungen:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Möchtest du diesen Mitarbeiter wirklich löschen?")) {
            try {
                await axios.delete(`http://localhost:5000/api/mitarbeitende/${personalnummer}`);
                alert("Mitarbeiter erfolgreich gelöscht!");
                navigate("/mitarbeitende"); // Zurück zur Liste
            } catch (error) {
                console.error("Fehler beim Löschen des Mitarbeiters:", error);
            }
        }
    };

    if (!mitarbeiter) return <h2>Lade Mitarbeiterdetails...</h2>;

    return (
        <div>
            <h2>Personendetails bearbeiten: {mitarbeiter.vorname} {mitarbeiter.name}</h2>
            <label>Name: <input type="text" name="vorname" value={mitarbeiter.vorname} onChange={handleChange} /></label><br></br>
            <label>Vorname: <input type="text" name="name" value={mitarbeiter.name} onChange={handleChange} /></label><br></br>
            <label>Abteilung: <input type="text" name="abteilung" value={mitarbeiter.abteilung} onChange={handleChange} /></label><br></br>
            <label>Arbeitspensum: <input type="number" name="arbeitspensum" value={mitarbeiter.arbeitspensum} onChange={handleChange} /></label><br></br>
            <br></br>
            <button onClick={handleSave} style={{ backgroundColor: "grey", color: "white" }}>Speichern</button>
            <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>Mitarbeiter löschen</button>
        </div>
    );
}

export default MitarbeiterDetail;

import axios from "axios";

const API_URL = "http://localhost:5000/api";  // Prüfe, ob der Port 5000 korrekt ist

export const getProjekte = async () => {
    try {
        const response = await axios.get(`${API_URL}/projekte`);
        return response.data;
    } catch (error) {
        console.error("Fehler beim Laden der Projekte:", error);
        return [];
    }
};

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SelectLocation() {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(useLocation().search);
    const service = searchParams.get("service");

    useEffect(() => {
        if (service) {
            fetch(`http://localhost:8080/api/user/locations?service=${service}`)
                .then((response) => response.json())
                .then((data) => setLocations(data))
                .catch((error) => console.error("Erreur de chargement :", error));
        }
    }, [service]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedLocation) {
            alert("Veuillez sélectionner une localisation.");
            return;
        }

        navigate(`/user-ticket?service=${service}&location=${selectedLocation}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">
                Choisissez une localisation pour <span className="text-blue-500">{service}</span>
            </h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                {/* Sélection de la Localisation */}
                <select
                    className="border p-2 rounded mb-4 w-full"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    required
                >
                    <option value="">Sélectionner une localisation</option>
                    {locations.map((loc, index) => (
                        <option key={index} value={loc}>{loc}</option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg shadow-md hover:from-blue-500 hover:to-green-500 transition duration-300"
                >
                    Générer un ticket
                </button>
            </form>
        </div>
    );
}

export default SelectLocation;

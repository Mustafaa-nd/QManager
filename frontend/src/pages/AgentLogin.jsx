import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AgentLogin() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Charger les services depuis l'API
    useEffect(() => {
        fetch("http://localhost:8080/api/user/services")
            .then((response) => response.json())
            .then((data) => setServices(data))
            .catch((error) => console.error("Erreur de chargement :", error));
    }, []);

    // Mettre à jour les localisations en fonction du service sélectionné
    const handleServiceChange = async (service) => {
        setSelectedService(service);
        setSelectedLocation("");

        const response = await fetch(`http://localhost:8080/api/user/locations?service=${service}`);
        const data = await response.json();
        setLocations(data);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Réinitialiser les erreurs

        try {
            const response = await fetch("http://localhost:8080/api/agent/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ service: selectedService, location: selectedLocation, username, password }),
            });

            const success = await response.json();
            if (success) {
                navigate("/agent/dashboard");
            } else {
                setError("Identifiants incorrects. Veuillez réessayer.");
            }
        } catch (error) {
            setError("Erreur de connexion au serveur.");
            console.error("Erreur lors de la connexion :", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">Connexion Agent - QManager</h1>

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Se connecter</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="flex flex-col">
                    {/* Sélection du Service */}
                    <label className="text-gray-700 font-medium">Service</label>
                    <select
                        className="border p-2 rounded mb-4"
                        value={selectedService}
                        onChange={(e) => handleServiceChange(e.target.value)}
                        required
                    >
                        <option value="">Sélectionner un service</option>
                        {services.map((service) => (
                            <option key={service.name} value={service.name}>
                                {service.name}
                            </option>
                        ))}
                    </select>

                    {/* Sélection de la Localisation */}
                    <label className="text-gray-700 font-medium">Localisation</label>
                    <select
                        className="border p-2 rounded mb-4"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        required
                        disabled={!selectedService}
                    >
                        <option value="">Sélectionner une localisation</option>
                        {locations.map((loc, index) => (
                            <option key={index} value={loc}>{loc}</option>
                        ))}
                    </select>

                    {/* Nom d'utilisateur */}
                    <label className="text-gray-700 font-medium">Nom d'utilisateur</label>
                    <input
                        type="text"
                        placeholder="Entrez votre nom d'utilisateur"
                        className="border p-2 rounded mb-4"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    {/* Mot de passe */}
                    <label className="text-gray-700 font-medium">Mot de passe</label>
                    <input
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        className="border p-2 rounded mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg shadow-md hover:from-blue-500 hover:to-green-500 transition duration-300"
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AgentLogin;

import { useEffect, useState } from "react";

function AgentDashboard() {
    const [service, setService] = useState("Non défini");
    const [location, setLocation] = useState("Non définie");
    const [username, setUsername] = useState("Agent");
    const [currentTicket, setCurrentTicket] = useState(null);
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        // Récupération des données du ticket en cours
        fetch("http://localhost:8080/api/agent/ticket")
            .then((response) => response.json())
            .then((data) => {
                setCurrentTicket(data.currentTicket);
                setRemaining(data.remaining);
            })
            .catch((error) => console.error("Erreur de chargement :", error));

        // Simulons des valeurs pour service, location et agent (à remplacer par de vraies valeurs)
        setService("Senelec");
        setLocation("Dakar");
        setUsername("Agent1");
    }, []);

    const handleNext = async () => {
        await fetch("http://localhost:8080/api/agent/next", { method: "POST" });
        window.location.reload();
    };

    const handlePrevious = async () => {
        await fetch("http://localhost:8080/api/agent/previous", { method: "POST" });
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">Tableau de Bord - Agent</h1>
            <h2 className="text-xl font-semibold">Service : <span className="font-bold text-blue-600">{service}</span></h2>
            <h2 className="text-xl font-semibold">Localisation : <span className="font-bold text-blue-600">{location}</span></h2>
            <h3 className="text-lg font-medium mb-6">Connecté en tant que : <span className="font-bold text-blue-600">{username}</span></h3>

            {/* Info Ticket */}
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center mb-6">
                {currentTicket ? (
                    <>
                        <p className="text-lg">Numéro en cours de traitement : <span className="font-bold text-blue-600">{currentTicket.ticketNumber}</span></p>
                        <p className="text-lg">Clients restants dans la file : <span className="font-bold text-blue-600">{remaining}</span></p>
                    </>
                ) : (
                    <p className="text-lg text-gray-500">Aucun ticket en cours</p>
                )}
            </div>

            {/* Boutons d'action */}
            <div className="flex space-x-4">
                <button
                    onClick={handleNext}
                    className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                >
                    Passer au suivant
                </button>

                <button
                    onClick={handlePrevious}
                    className="bg-red-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                >
                    Revenir au précédent
                </button>
            </div>
        </div>
    );
}

export default AgentDashboard;

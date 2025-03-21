import { useEffect, useState } from "react";

function AdminDashboard() {
    const [service, setService] = useState("Non défini");
    const [location, setLocation] = useState("Non définie");
    const [actions, setActions] = useState([]);

    useEffect(() => {
        // Récupération des actions de l'admin
        fetch("http://localhost:8080/api/admin/actions")
            .then((response) => response.json())
            .then((data) => setActions(data))
            .catch((error) => console.error("Erreur de chargement :", error));

        // Simulons des valeurs pour service et location (à modifier selon besoin)
        setService("Senelec");
        setLocation("Dakar");
    }, []);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-blue-700 mb-4">Administrateur QM</h1>
            <p className="text-lg">Service : <span className="font-bold text-blue-600">{service}</span></p>
            <p className="text-lg mb-6">Localisation : <span className="font-bold text-blue-600">{location}</span></p>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Historique des actions</h2>

            {/* Tableau des actions */}
            <div className="overflow-x-auto w-full max-w-4xl">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Action</th>
                        <th className="py-3 px-4 text-left">Numéro de Ticket</th>
                        <th className="py-3 px-4 text-left">Date/Heure</th>
                    </tr>
                    </thead>
                    <tbody>
                    {actions.length > 0 ? (
                        actions.map((action, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-4">{action.action}</td>
                                <td className="py-3 px-4">{action.ticketNumber}</td>
                                <td className="py-3 px-4">{action.timestamp}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="py-3 px-4 text-center text-gray-500">
                                Aucune action enregistrée
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;

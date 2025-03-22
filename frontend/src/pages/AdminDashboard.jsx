import { useEffect, useState } from "react";

function AdminDashboard() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/admin/all")
            .then((res) => res.json())
            .then((data) => setTickets(data))
            .catch((err) => console.error("Erreur chargement historique :", err));
    }, []);

    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-blue-700 mb-6">Historique des Tickets</h1>

            <div className="overflow-x-auto w-full max-w-4xl">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 text-white">
                    <tr>
                        <th className="py-3 px-4 text-left">Ticket #</th>
                        <th className="py-3 px-4 text-left">Service</th>
                        <th className="py-3 px-4 text-left">Localisation</th>
                        <th className="py-3 px-4 text-left">Actif</th>
                        <th className="py-3 px-4 text-left">Date/Heure</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.length > 0 ? (
                        tickets.map((ticket, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-4">{ticket.ticketNumber}</td>
                                <td className="py-3 px-4">{ticket.service}</td>
                                <td className="py-3 px-4">{ticket.location}</td>
                                <td className="py-3 px-4">
                                    {ticket.active ? "🟢 En cours" : "⚪ Terminé"}
                                </td>
                                <td className="py-3 px-4">{new Date(ticket.createdAt).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-3 px-4 text-center text-gray-500">
                                Aucun ticket généré
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

import { useState, useEffect } from "react";
import {
    getAgentsByServiceAndLocation,
    createAgent,
    deleteAgent
} from "@/services/api/adminApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function AgentsManager({ service, location }) {
    const [agents, setAgents] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loadAgents = async () => {
        try {
            const data = await getAgentsByServiceAndLocation(service.id, location.id);
            setAgents(data);
        } catch (err) {
            console.error("Erreur chargement agents :", err);
        }
    };

    useEffect(() => {
        if (service?.id && location?.id) {
            loadAgents();
        }
    }, [service, location]);

    const handleCreateAgent = async () => {
        if (!username.trim() || !password.trim()) return;

        try {
            await createAgent(service.id, location.id, { username, password });
            setUsername("");
            setPassword("");
            await loadAgents();
        } catch (err) {
            MySwal.fire("Erreur", "Impossible de créer l'agent", "error");
        }
    };

    const handleDelete = async (agentId) => {
        const confirmed = await MySwal.fire({
            title: "Supprimer l'agent ?",
            text: "Cette action est irréversible.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, supprimer",
            cancelButtonText: "Annuler",
        });

        if (confirmed.isConfirmed) {
            try {
                await deleteAgent(agentId);
                await loadAgents();
            } catch (err) {
                MySwal.fire("Erreur", err.message || "Suppression impossible", "error");
            }
        }
    };

    if (!service || !location) return null;

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Agents - {service.name} / {location.name}
            </h3>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nom d'utilisateur"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <button onClick={handleCreateAgent} className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
                    Ajouter
                </button>
            </div>

            {agents.length === 0 ? (
                <p className="text-gray-500">Aucun agent pour cette localisation.</p>
            ) : (
                <ul className="space-y-2">
                    {agents.map((agent) => (
                        <li key={agent.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
                            <span>{agent.username}</span>
                            <button
                                onClick={() => handleDelete(agent.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                Supprimer
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AgentsManager;

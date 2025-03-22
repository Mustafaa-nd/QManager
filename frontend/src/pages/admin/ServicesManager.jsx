import { useEffect, useState } from "react";
import {
    fetchServices,
    createService,
    deleteService,
} from "@/services/api/adminApi";

function ServicesManager() {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState("");

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = () => {
        fetchServices().then(setServices).catch(console.error);
    };

    const handleAdd = async () => {
        if (!newService.trim()) return;

        const added = await createService(newService);
        if (added?.id) {
            setNewService("");
            loadServices();
        } else {
            alert("Service déjà existant ou erreur !");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer ce service ?")) {
            await deleteService(id);
            loadServices();
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Gestion des Services</h2>

            <div className="flex mb-4 gap-2">
                <input
                    type="text"
                    placeholder="Nom du service"
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="flex-1 border p-2 rounded"
                />
                <button
                    onClick={handleAdd}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Ajouter
                </button>
            </div>

            <ul className="bg-white shadow rounded">
                {services.map((s) => (
                    <li
                        key={s.id}
                        className="flex justify-between items-center p-3 border-b last:border-none"
                    >
                        <span>{s.name}</span>
                        <button
                            onClick={() => handleDelete(s.id)}
                            className="text-red-600 hover:underline"
                        >
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ServicesManager;

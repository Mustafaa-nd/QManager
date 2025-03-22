import { useEffect, useState } from "react";
import {
    fetchServices,
    createService,
    deleteService,
    getLocationsByService,
    addLocationToService,
    deleteLocation,
    getAgentsByServiceAndLocation,
    createAgent,
    deleteAgent,
} from "../../services/api/adminApi";

function AdminDashboard() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [locations, setLocations] = useState([]);
    const [agents, setAgents] = useState([]);

    const [newServiceName, setNewServiceName] = useState("");
    const [newLocationName, setNewLocationName] = useState("");
    const [newAgent, setNewAgent] = useState({ username: "", password: "" });

    useEffect(() => {
        fetchServices().then(setServices);
    }, []);

    const handleSelectService = (service) => {
        setSelectedService(service);
        getLocationsByService(service.id).then(setLocations);
        setAgents([]);
    };

    const handleAddService = async () => {
        const service = await createService(newServiceName);
        setServices([...services, service]);
        setNewServiceName("");
    };

    const handleDeleteService = async (id) => {
        await deleteService(id);
        setServices(services.filter(s => s.id !== id));
        if (selectedService?.id === id) {
            setSelectedService(null);
            setLocations([]);
            setAgents([]);
        }
    };

    const handleAddLocation = async () => {
        const location = await addLocationToService(selectedService.id, newLocationName);
        setLocations([...locations, location]);
        setNewLocationName("");
    };

    const handleDeleteLocation = async (locationId) => {
        await deleteLocation(selectedService.id, locationId);
        setLocations(locations.filter(l => l.id !== locationId));
        setAgents([]);
    };

    const handleShowAgents = async (locationId) => {
        const found = locations.find(l => l.id === locationId);
        const agentsList = await getAgentsByServiceAndLocation(selectedService.id, found.id);
        setAgents(agentsList);
    };

    const handleAddAgent = async (locationId) => {
        const agent = await createAgent(selectedService.id, locationId, newAgent);
        setAgents([...agents, agent]);
        setNewAgent({ username: "", password: "" });
    };

    const handleDeleteAgent = async (agentId) => {
        await deleteAgent(agentId);
        setAgents(agents.filter(a => a.id !== agentId));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">Admin Dashboard</h1>

            {/* Services */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Services</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Nom du service"
                        className="border px-2 py-1 rounded"
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                    />
                    <button onClick={handleAddService} className="bg-green-500 text-white px-3 py-1 rounded">Ajouter</button>
                </div>
                <ul className="mt-3 space-y-1">
                    {services.map(service => (
                        <li key={service.id} className="flex justify-between items-center">
              <span
                  className={`cursor-pointer ${selectedService?.id === service.id ? "font-bold text-blue-600" : ""}`}
                  onClick={() => handleSelectService(service)}>
                {service.name}
              </span>
                            <button
                                className="text-red-500 hover:underline"
                                onClick={() => handleDeleteService(service.id)}>
                                Supprimer
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Locations */}
            {selectedService && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Localisations pour {selectedService.name}</h2>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Nom de la localisation"
                            className="border px-2 py-1 rounded"
                            value={newLocationName}
                            onChange={(e) => setNewLocationName(e.target.value)}
                        />
                        <button onClick={handleAddLocation} className="bg-green-500 text-white px-3 py-1 rounded">Ajouter</button>
                    </div>
                    <ul className="mt-3 space-y-1">
                        {locations.map(loc => (
                            <li key={loc.id} className="flex justify-between items-center">
                                <span className="cursor-pointer" onClick={() => handleShowAgents(loc.id)}>{loc.name}</span>
                                <button className="text-red-500 hover:underline" onClick={() => handleDeleteLocation(loc.id)}>Supprimer</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Agents */}
            {agents.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Agents</h2>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            className="border px-2 py-1 rounded"
                            value={newAgent.username}
                            onChange={(e) => setNewAgent({ ...newAgent, username: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="border px-2 py-1 rounded"
                            value={newAgent.password}
                            onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })}
                        />
                        <button onClick={() => handleAddAgent(agents[0].location.id)} className="bg-green-500 text-white px-3 py-1 rounded">Ajouter</button>
                    </div>
                    <ul className="space-y-1">
                        {agents.map(agent => (
                            <li key={agent.id} className="flex justify-between items-center">
                                {agent.username}
                                <button className="text-red-500 hover:underline" onClick={() => handleDeleteAgent(agent.id)}>Supprimer</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;

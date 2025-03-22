import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/admin",
});

// Ajouter le token JWT automatiquement si dispo
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// SERVICES
export const fetchServices = async () => {
    const res = await API.get("/services");
    return res.data;
};

export const createService = async (name) => {
    const res = await API.post("/services", { name });
    return res.data;
};

export const deleteService = async (id) => {
    return await API.delete(`/services/${id}`);
};

// LOCATIONS
export const getLocationsByService = async (serviceId) => {
    const res = await API.get(`/services/${serviceId}/locations`);
    return res.data;
};

export const addLocationToService = async (serviceId, name) => {
    const res = await API.post(`/services/${serviceId}/locations`, { name });
    return res.data;
};

export const deleteLocation = async (serviceId, locationId) => {
    return await API.delete(`/services/${serviceId}/locations/${locationId}`);
};

// AGENTS
export const getAgentsByServiceAndLocation = async (serviceId, locationId) => {
    const res = await API.get(`/services/${serviceId}/locations/${locationId}/agents`);
    return res.data;
};

export const createAgent = async (serviceId, locationId, agent) => {
    const res = await API.post(`/services/${serviceId}/locations/${locationId}/agents`, agent);
    return res.data;
};

export const deleteAgent = async (agentId) => {
    return await API.delete(`/agents/${agentId}`);
};

// QUEUES
export const getQueue = async (service, location) => {
    const res = await API.get(`/queues`, {
        params: { service, location },
    });
    return res.data;
};

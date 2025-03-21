import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectService() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const navigate = useNavigate();

    // Charger les services depuis l'API
    useEffect(() => {
        fetch("http://localhost:8080/api/user/services")
            .then((response) => response.json())
            .then((data) => setServices(data))
            .catch((error) => console.error("Erreur lors du chargement des services :", error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedService) {
            alert("Veuillez sélectionner un service.");
            return;
        }
        navigate(`/select-location?service=${selectedService}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Choisissez un service</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <label htmlFor="service" className="text-gray-700 font-medium mb-2 block">
                    Choisissez un service :
                </label>

                <select
                    id="service"
                    name="service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="border p-2 rounded mb-4 w-full"
                    required
                >
                    <option value="">-- Sélectionner --</option>
                    {services.map((service) => (
                        <option key={service.name} value={service.name}>
                            {service.name}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg shadow-md hover:from-blue-500 hover:to-green-500 transition duration-300"
                >
                    Suivant
                </button>
            </form>
        </div>
    );
}

export default SelectService;

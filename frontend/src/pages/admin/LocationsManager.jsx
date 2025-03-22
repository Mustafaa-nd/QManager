import { useState, useEffect } from "react";
import { getLocationsByService, addLocationToService, deleteLocationFromService } from "@/services/api/adminApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function LocationsManager({ service }) {
    const [locations, setLocations] = useState([]);
    const [newLocation, setNewLocation] = useState("");

    const loadLocations = async () => {
        try {
            const data = await getLocationsByService(service.id);
            setLocations(data);
        } catch (error) {
            console.error("Erreur lors du chargement des localisations :", error);
        }
    };

    useEffect(() => {
        if (service?.id) loadLocations();
    }, [service]);

    const handleAddLocation = async () => {
        if (!newLocation.trim()) return;

        try {
            await addLocationToService(service.id, { name: newLocation });
            setNewLocation("");
            await loadLocations();
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            MySwal.fire("Erreur", "Impossible d'ajouter la localisation.", "error");
        }
    };

    const handleDelete = async (locId) => {
        const confirmed = await MySwal.fire({
            title: "Supprimer la localisation ?",
            text: "Cette action est irréversible.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, supprimer",
            cancelButtonText: "Annuler",
        });

        if (confirmed.isConfirmed) {
            try {
                await deleteLocationFromService(service.id, locId);
                await loadLocations();
            } catch (error) {
                MySwal.fire("Erreur", error.message || "Suppression impossible.", "error");
            }
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Localisations pour <span className="text-blue-600">{service.name}</span>
            </h3>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="Ajouter une localisation"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <button onClick={handleAddLocation} className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
                    Ajouter
                </button>
            </div>

            {locations.length === 0 ? (
                <p className="text-gray-500">Aucune localisation pour ce service.</p>
            ) : (
                <ul className="space-y-2">
                    {locations.map((loc) => (
                        <li key={loc.id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
                            <span>{loc.name}</span>
                            <button
                                onClick={() => handleDelete(loc.id)}
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

export default LocationsManager;

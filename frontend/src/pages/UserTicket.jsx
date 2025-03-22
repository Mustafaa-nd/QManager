import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function UserTicket() {
    const [ticket, setTicket] = useState(null);
    const [currentTicket, setCurrentTicket] = useState(null);
    const [position, setPosition] = useState(0);
    const [peopleAhead, setPeopleAhead] = useState(0);

    const searchParams = new URLSearchParams(useLocation().search);
    const service = searchParams.get("service");
    const location = searchParams.get("location");

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!service || !location || hasFetched.current) return;

        const cacheKey = `ticket-${service}-${location}`;
        const sessionKey = `fetched-${service}-${location}`;

        // 👇 Supprimer uniquement si c'est la première fois de la session
        if (!sessionStorage.getItem(sessionKey)) {
            localStorage.removeItem(cacheKey);
            sessionStorage.setItem(sessionKey, "true");
        }

        const cached = localStorage.getItem(cacheKey);
        if (cached) {
            const data = JSON.parse(cached);
            setTicket(data.ticket);
            setPosition(data.position);
            setPeopleAhead(data.peopleAhead);
            setCurrentTicket(data.currentTicket);
            return;
        }

        hasFetched.current = true;

        fetch(`http://localhost:8080/api/user/generateTicketWithInfo?service=${service}&location=${location}`, {
            method: "POST"
        })
            .then(res => res.json())
            .then(data => {
                setTicket(data.ticket);
                setPosition(data.position);
                setPeopleAhead(data.peopleAhead);
                setCurrentTicket(data.currentTicket);
                localStorage.setItem(cacheKey, JSON.stringify(data));
            })
            .catch((err) => {
                console.error("Erreur lors de la génération du ticket :", err);
            });
    }, [service, location]);


    const handleNewTicketClick = () => {
        MySwal.fire({
            title: "Êtes-vous sûr ?",
            text: "Vous êtes sur le point de générer un nouveau ticket.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Oui, générer",
            cancelButtonText: "Annuler",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem(`ticket-${service}-${location}`);
                window.location.reload();
            }
        });
    };

    if (!ticket || !currentTicket) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
                <p className="text-xl">Chargement du ticket...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-6">
            <h1 className="text-3xl font-bold text-blue-700 mb-6">Votre Ticket</h1>

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <p className="text-lg">Service : <span className="font-bold">{ticket.service}</span></p>
                <p className="text-lg">Localisation : <span className="font-bold">{ticket.location}</span></p>
                <p className="text-xl text-green-600 font-bold mt-2">Numéro de Ticket : {ticket.ticketNumber}</p>
                <p className="text-lg mt-4">Votre position dans la file : <span className="font-semibold">{position}</span></p>
                <p className="text-lg">Personnes devant vous : <span className="font-semibold">{peopleAhead}</span></p>
                <p className="text-lg mt-4">Numéro en cours de traitement : <span className="font-semibold">{currentTicket?.ticketNumber || "Aucun"}</span></p>
            </div>

            <button
                className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                onClick={handleNewTicketClick}
            >
                Générer un nouveau ticket
            </button>

            <footer className="mt-6 text-center text-gray-500 text-sm">
                Merci d'avoir utilisé le service <span className="font-semibold">{ticket.service}</span> QM. <br />
                Bonne attente !
            </footer>
        </div>
    );
}

export default UserTicket;

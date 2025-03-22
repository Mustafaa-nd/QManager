import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("adminToken", data.token);

                await MySwal.fire({
                    icon: "success",
                    title: "Connexion réussie",
                    text: "Bienvenue dans l'espace d'administration.",
                });

                navigate("/admin/dashboard");
            } else {
                MySwal.fire({
                    icon: "error",
                    title: "Échec de la connexion",
                    text: "Nom d'utilisateur ou mot de passe incorrect.",
                });
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            MySwal.fire({
                icon: "error",
                title: "Erreur réseau",
                text: "Impossible de se connecter au serveur.",
            });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Connexion Admin</h2>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Nom d'utilisateur</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-sm font-medium">Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-300"
                >
                    Se connecter
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;

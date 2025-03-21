import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            {/* En-tête */}
            <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
                Bienvenue sur le portail QManager
            </h1>

            {/* Boutons d'action */}
            <div className="w-full max-w-md space-y-4">
                <Link
                    to="/select-service"
                    className="block w-full text-center bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-lg shadow-md hover:from-blue-500 hover:to-green-500 transition duration-300"
                >
                    Choisir un service
                </Link>

                <Link
                    to="/agent/login"
                    className="block w-full text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg shadow-md hover:from-purple-500 hover:to-indigo-500 transition duration-300"
                >
                    Se connecter en tant qu'agent QM
                </Link>

                <Link
                    to="/admin/login"
                    className="block w-full text-center bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-lg shadow-md hover:from-orange-500 hover:to-red-500 transition duration-300"
                >
                    Se connecter en tant qu'admin QM
                </Link>
            </div>

            {/* Footer */}
            <footer className="mt-10 text-sm text-gray-500">
                © {new Date().getFullYear()} QManager - Tous droits réservés.
            </footer>
        </div>
    );
}

export default Home;

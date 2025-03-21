import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">QManager</h1>
                {/*<div className="space-x-4">*/}
                {/*    <Link to="/" className="hover:underline">Accueil</Link>*/}
                {/*    <Link to="/select-service" className="hover:underline">Services</Link>*/}
                {/*    <Link to="/agent/login" className="hover:underline">Agent</Link>*/}
                {/*    <Link to="/admin/login" className="hover:underline">Admin</Link>*/}
                {/*</div>*/}
            </div>
        </nav>
    );
}

import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet /> {/* Affiche les pages dynamiquement ici */}
            </main>
        </div>
    );
}

export default MainLayout;

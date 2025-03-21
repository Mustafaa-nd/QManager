import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AgentLogin from "./pages/AgentLogin";
import AgentDashboard from "./pages/AgentDashboard";
import SelectService from "./pages/SelectService";
import SelectLocation from "./pages/SelectLocation";
import UserTicket from "./pages/UserTicket";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="admin/login" element={<AdminLogin />} />
                <Route path="admin/dashboard" element={<AdminDashboard />} />
                <Route path="agent/login" element={<AgentLogin />} />
                <Route path="agent/dashboard" element={<AgentDashboard />} />
                <Route path="select-service" element={<SelectService />} />
                <Route path="select-location" element={<SelectLocation />} />
                <Route path="user-ticket" element={<UserTicket />} />
            </Route>
        </Routes>
    );
}

export default App;

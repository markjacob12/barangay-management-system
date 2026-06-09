import { Route, Routes } from "react-router-dom";
import ProtectionRoutes from "./routes/ProtectedRoute";
import LandingPage from "./pages/Landing/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

//ADMIN SIDE
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import Resident from "./pages/admin/Residents/Resident";
import RequestManagement from "./pages/admin/RequestManagement/RequestManagement";
import Concern from "./pages/admin/Concern/Concern";

//USER SIDE
import HomeUser from "./pages/user/Home/HomeUser";
import MyRequests from "./pages/user/MyRequests/MyRequests";
import BarangayConcern from "./pages/user/BarangayConcern/BarangayConcern";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        // ===== ADMIN =====
        <Route
          path="AdminDashboard"
          element={
            <ProtectionRoutes allowedRole="admin">
              <AdminDashboard />
            </ProtectionRoutes>
          }
        />
        <Route
          path="/residents"
          element={
            <ProtectionRoutes allowedRole="admin">
              <Resident />
            </ProtectionRoutes>
          }
        />
        <Route
          path="/RequestManagement"
          element={
            <ProtectionRoutes allowedRole="admin">
              <RequestManagement />
            </ProtectionRoutes>
          }
        />
        <Route
          path="/Concern"
          element={
            <ProtectionRoutes allowedRole="admin">
              <Concern />
            </ProtectionRoutes>
          }
        />
        <Route
          path="HomeUser"
          element={
            <ProtectionRoutes allowedRole="user">
              <HomeUser />
            </ProtectionRoutes>
          }
        />
        <Route
          path="/MyRequests"
          element={
            <ProtectionRoutes allowedRole="user">
              <MyRequests />
            </ProtectionRoutes>
          }
        />
        <Route
          path="/BarangayConcern"
          element={
            <ProtectionRoutes allowedRole="user">
              <BarangayConcern />
            </ProtectionRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;

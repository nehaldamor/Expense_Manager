import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import VerifyEmail from "./pages/VerifyEmail";


import ProtectedRoute from "./components/ProtectedRoute";

function App() {
return (
<AuthProvider>
<BrowserRouter>
<Routes>
<Route path="/" element={<Login />} />
<Route path="/signup" element={<Signup />} />
 <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["admin", "manager", "agent"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
<Route path="/verify-email" element={<VerifyEmail />} />
</Routes>
</BrowserRouter>
</AuthProvider>
);
}


export default App;
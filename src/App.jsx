import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import EmployeeList from "./components/EmployeeList";
import Login from "./pages/Login";
import HomeRedirect from "./pages/HomeRedirect";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import OfficeChart from "./pages/OfficeChart";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeRedirect />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/directory"
          element={
            <ProtectedRoute>
              <Layout>
                <EmployeeDirectory />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <Layout>
                <EmployeeList />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/officechart"
          element={
            <ProtectedRoute>
              <Layout>
                <OfficeChart />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

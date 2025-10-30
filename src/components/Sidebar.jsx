// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, UserCog } from "lucide-react";
import AuthService from "../services/AuthService";

export default function Sidebar() {
  const user = AuthService.getCurrentUser(); // ดึง role ของผู้ใช้ปัจจุบัน

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-50 text-blue-600 font-medium"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="bg-white shadow-lg h-screen flex flex-col p-4 space-y-4 w-20 md:w-64 transition-all duration-300">
      {/* Logo */}
      <div className="text-4xl font-semibold text-black mb-6 flex justify-center">
        {/* แสดงชื่อเต็มบน Desktop */}
        <span className="hidden md:inline">
          EMP | <span className="text-blue-800 text-2xl">System</span>
        </span>
        {/* แสดงย่อบน Mobile */}
        <span className="md:hidden text-blue-800 text-2xl">EMP</span>
      </div>

      {/* Menu */}
      <NavLink to="/dashboard" className={linkClass}>
        <LayoutDashboard size={24} />
        <span className="hidden md:inline">Dashboard</span>
      </NavLink>

      <NavLink to="/directory" className={linkClass}>
        <Users size={24} />
        <span className="hidden md:inline">รายชื่อพนักงาน</span>
      </NavLink>

      {user?.role === "Manager" && (
        <NavLink to="/employees" className={linkClass}>
          <UserCog size={24} />
          <span className="hidden md:inline">จัดการพนักงาน</span>
        </NavLink>
      )}
    </div>
  );
}

import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Settings as SettingsIcon,
  Network,
} from "lucide-react";
import AuthService from "../services/AuthService";
import SettingsModal from "./SettingsModal";

export default function Sidebar() {
  const user = AuthService.getCurrentUser();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
        <span className="hidden md:inline">
          EMP | <span className="text-blue-800 text-2xl">System</span>
        </span>
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

      <NavLink to="/officechart" className={linkClass}>
        <Network size={24} />
        <span className="hidden md:inline">แผนผังออฟฟิศ</span>
      </NavLink>

      <div className="mt-auto">
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition w-full"
        >
          <SettingsIcon size={24} />
          <span className="hidden md:inline">ตั้งค่า</span>
        </button>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
}

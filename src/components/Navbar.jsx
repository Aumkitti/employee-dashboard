import React, { useState, useEffect, useRef } from "react";
import AuthService from "../services/AuthService";
import { UserCircle2, Edit2 } from "lucide-react";
import EmployeeForm from "./EmployeeForm";
import EmployeeService from "../services/EmployeeService";

export default function Navbar() {
  const userBasic = AuthService.getCurrentUser();
  const [showProfile, setShowProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fullUser, setFullUser] = useState(null);

  const profileRef = useRef(null); // ✅ ref สำหรับ dropdown

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = "/login";
  };

  const handleEditClick = async () => {
    try {
      const data = await EmployeeService.getEmployeeById(userBasic.id);
      setFullUser(data);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  // ✅ ฟัง event click บน document เพื่อตรวจสอบ click นอก dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  if (!userBasic) return null;

  return (
    <div className="p-4 bg-white relative z-20 border-b border-gray-300">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-black"></h1>

        <div className="flex items-center gap-3 relative">
          <span className="text-gray-600">
            👋 สวัสดี, <b>{userBasic.username}</b> ({userBasic.role})
          </span>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 
              flex items-center justify-center hover:scale-105 hover:shadow-md transition-all"
          >
            <UserCircle2 className="text-blue-600" size={24} />
          </button>

          {showProfile && (
            <div
              ref={profileRef} // ✅ เพิ่ม ref
              className="absolute right-0 top-12 bg-white border border-gray-100 rounded-2xl shadow-lg w-72 p-4 
                animate-fadeIn z-50 transition-all"
            >
              <h3 className="font-semibold text-lg mb-2 border-b pb-2">
                ข้อมูลผู้ใช้
              </h3>
              <p>
                <b>ชื่อผู้ใช้:</b> {userBasic.username}
              </p>
              <p>
                <b>ตำแหน่ง:</b> {userBasic.role}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                เข้าสู่ระบบเมื่อ: {new Date().toLocaleString("th-TH")}
              </p>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-700 
                    rounded-xl hover:bg-yellow-200 transition-all"
                >
                  <Edit2 size={16} /> แก้ไขข้อมูล
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 
                    rounded-xl hover:bg-red-200 transition-all"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && fullUser && (
        <div className="bg-black/60 fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
          <div className="w-[900px]">
            <EmployeeForm
              selectedEmployee={fullUser}
              onCancel={() => setShowModal(false)}
              onSave={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

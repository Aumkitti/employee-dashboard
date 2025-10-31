import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, CheckCircle2, XCircle } from "lucide-react";
import AuthService from "../services/AuthService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState({ show: false, type: "", message: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthService.login(username, password);
      if (res) {
        setModal({
          show: true,
          type: "success",
          message: "เข้าสู่ระบบสำเร็จ! กำลังนำทาง...",
        });
        setTimeout(() => {
          setModal({ show: false });
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      setModal({
        show: true,
        type: "error",
        message: err.message || "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง",
      });
      setTimeout(() => setModal({ show: false }), 1000);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 relative">
      <div className="w-[900px] h-[520px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">
        <div className="w-1/2 bg-blue-800 text-white flex flex-col items-center justify-center p-10">
          <div className="text-5xl font-bold tracking-wide mb-3 animate-fadeIn">
            EMP
          </div>
          <div className="text-xl opacity-90 animate-fadeIn delay-100">
            Employee Management System
          </div>
          <div className="w-24 h-1 bg-white mt-6 mb-4 rounded-full opacity-60 animate-fadeIn delay-200"></div>
          <p className="text-sm text-blue-100 text-center px-4 animate-fadeIn delay-300">
            ระบบจัดการพนักงานสำหรับฝ่ายบุคคล 
          </p>
        </div>

        <div className="w-1/2 flex flex-col justify-center p-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            เข้าสู่ระบบ
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="relative group">
              <User
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 pt-5 pb-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition outline-none peer text-gray-800"
              />
              <label
                htmlFor="username"
                className={`absolute left-10 px-1 bg-white text-gray-400 text-sm transition-all duration-300 ease-out z-20
                peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600
                ${username ? "-top-2.5 text-xs text-blue-600" : "top-3.5"}
                before:absolute before:-left-1 before:right-[-1px] before:top-[8px] before:h-[2px] before:bg-white before:z-[-1]`}
              >
                {Array.from("ชื่อผู้ใช้").map((char, i) => (
                  <span
                    key={i}
                    style={{ animationDelay: `${i * 40}ms` }}
                    className="inline-block animate-letter"
                  >
                    {char}
                  </span>
                ))}
              </label>
            </div>

            <div className="relative group">
              <Lock
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 pt-5 pb-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition outline-none peer text-gray-800"
              />
              <label
                htmlFor="password"
                className={`absolute left-10 px-1 bg-white text-gray-400 text-sm transition-all duration-300 ease-out z-20
                peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-blue-600
                ${password ? "-top-2.5 text-xs text-blue-600" : "top-3.5"}
                before:absolute before:-left-1 before:right-[-1px] before:top-[8px] before:h-[2px] before:bg-white before:z-[-1]`}
              >
                {Array.from("รหัสผ่าน").map((char, i) => (
                  <span
                    key={i}
                    style={{ animationDelay: `${i * 40}ms` }}
                    className="inline-block animate-letter"
                  >
                    {char}
                  </span>
                ))}
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition duration-200 shadow-sm"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          <p className="text-gray-400 text-xs mt-6 text-center">
            หากเข้าสู่ระบบไม่ได้ กรุณาติดต่อ{" "}
            <span className="text-blue-600 font-semibold">Manager</span>
          </p>
        </div>
      </div>

      {modal.show && (
        <div className="fixed inset-0 bg-white/30 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white w-[340px] p-6 rounded-2xl shadow-2xl text-center animate-slideUp">
            {modal.type === "success" ? (
              <CheckCircle2 className="mx-auto text-green-500" size={60} />
            ) : (
              <XCircle className="mx-auto text-red-500" size={60} />
            )}
            <h3 className="text-lg font-semibold mt-3 mb-2">
              {modal.type === "success" ? "สำเร็จ!" : "เกิดข้อผิดพลาด"}
            </h3>
            <p className="text-gray-600 text-sm">{modal.message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

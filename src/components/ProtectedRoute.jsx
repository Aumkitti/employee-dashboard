// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = AuthService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ ถ้ามี allowedRoles ให้ตรวจสอบ role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          🚫 คุณไม่มีสิทธิ์เข้าหน้านี้
        </h1>
        <p className="text-gray-600">
          กรุณาติดต่อผู้ดูแลระบบหากต้องการสิทธิ์เพิ่มเติม
        </p>
      </div>
    );
  }

  return children;
}

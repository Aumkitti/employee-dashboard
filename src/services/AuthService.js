// src/services/AuthService.js


const API_URL = "http://localhost:3001/employees";
import axios from "axios";


class AuthService {
  async login(username, password) {
    const response = await axios.get(API_URL);
    const employees = response.data;

    // ตรวจสอบว่า name กับ citizenId ตรงกันไหม
    const user = employees.find(
      (emp) =>
        emp.name.toLowerCase() === username.toLowerCase() &&
        emp.citizenId === password
    );

    if (!user) {
      throw new Error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }

    const currentUser = {
      username: user.name,
      role:
        typeof user.role === "object"
          ? user.role.name
          : user.role || "Employee",
      id: user.id,
    };

    localStorage.setItem("user", JSON.stringify(currentUser));
    return currentUser;
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  isAuthenticated() {
    return !!localStorage.getItem("user");
  }
}

export default new AuthService();
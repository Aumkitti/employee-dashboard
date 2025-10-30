// src/services/employeeservice.js
import axios from "axios";
import Role from "../models/Role";
import Permission from "../models/Permission";
import Employee from "../models/Employee";
import {
  Manager,
  Intern,
  PartTime,
  RegularEmployee,
} from "../models/EmployeeTypes";


const API_URL = "http://localhost:3001/employees";

class EmployeeService {
  async getAllEmployees() {
    const response = await axios.get(API_URL);
    const employees = response.data.map((e) => {
      const roleName = typeof e.role === "object" ? e.role.name : e.role;
      const role = new Role(roleName);
      const permission = new Permission(roleName);

      let employeeInstance;
      switch (roleName) {
        case "Manager":
          employeeInstance = new Manager({ ...e, role, permission });
          break;
        case "Intern":
          employeeInstance = new Intern({ ...e, role, permission });
          break;
        case "PartTime":
          employeeInstance = new PartTime({ ...e, role, permission });
          break;
        default:
          employeeInstance = new RegularEmployee({ ...e, role, permission });
      }

      employeeInstance.bonus = employeeInstance.calculateBonus();


      return employeeInstance;
    });

    return employees;
  }

  async addEmployee(data) {
    const id = Date.now().toString();
    const roleName = typeof data.role === "object" ? data.role.name : data.role;
    const permission = new Permission(roleName);

    const startDate = data.startDate || new Date().toISOString();

    const newEmployee = {
      id,
      name: data.name,
      citizenId: data.citizenId || "",
      role: roleName,
      permission: permission.name,
      salary: data.salary || 0,
      startDate,
    };

    return axios.post(API_URL, newEmployee);
  }

  async updateEmployee(id, updatedData) {
    const roleName =
      typeof updatedData.role === "object"
        ? updatedData.role.name
        : updatedData.role;

    const permission = new Permission(roleName);

    const cleanedData = {
      name: updatedData.name,
      citizenId: updatedData.citizenId || "",
      role: roleName,
      permission: permission.name,
      salary: updatedData.salary || 0,
      startDate: updatedData.startDate || new Date().toISOString(),
    };

    const response = await axios.put(`${API_URL}/${id}`, cleanedData);
    return response.data;
  }

  async deleteEmployee(id) {
    return axios.delete(`${API_URL}/${String(id)}`);
  }

   async getEmployeeById(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
}

export default new EmployeeService();

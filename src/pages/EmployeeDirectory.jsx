// src/components/EmployeeDirectory.jsx
import React, { useEffect, useState, useRef } from "react";
import EmployeeService from "../services/EmployeeService";
import { formatDate } from "../utils/FormatUtils";
import { Search } from "lucide-react";

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      const tableHeight = tableRef.current.clientHeight;
      const row = tableRef.current.querySelector("tbody tr");
      if (row) {
        const rowHeight = row.clientHeight;
        setRowsPerPage(Math.floor(tableHeight / rowHeight));
      }
    }
  }, [employees]);

  const fetchEmployees = async () => {
    const data = await EmployeeService.getAllEmployees();
    setEmployees(data);
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole =
      selectedRole === "All" || emp.role?.name === selectedRole;

    let matchesDate = true;
    const empDate = new Date(emp.startDate);
    if (startDate) matchesDate = matchesDate && empDate >= new Date(startDate);
    if (endDate) matchesDate = matchesDate && empDate <= new Date(endDate);

    return matchesSearch && matchesRole && matchesDate;
  });

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const paginatedEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

  const roles = [
    "ตำแหน่งทั้งหมด",
    ...new Set(employees.map((e) => e.role?.name).filter(Boolean)),
  ];

  // ฟังก์ชันช่วยกำหนด Contact
  const getContactInfo = (emp) => {
    if (!emp.role?.name) return "-";
    if (emp.role.name === "Manager") {
      return `ห้องทำงาน: ${emp.office} โต๊ะ: ${emp.desk}`;
    } else {
      return "ติดต่อผ่านหัวหน้างานเท่านั้น";
    }
  };


  return (
    <div className="w-full max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <h1 className="text-3xl font-bold text-gray-800">
          รายชื่อพนักงานทั้งหมด
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="ค้นหาชื่อพนักงาน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-blue-200 px-3 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition text-sm text-gray-700 shadow-sm bg-white"
            />
            <Search
              className="absolute left-3 top-2.5 text-blue-300"
              size={18}
            />
          </div>

          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white text-gray-700 shadow-sm"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          {/* Date Filter */}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white text-gray-700 shadow-sm"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white text-gray-700 shadow-sm"
          />
        </div>
      </div>

      {/* ตาราง */}
      <div
        className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-blue-100 overflow-hidden h-190"
        ref={tableRef}
      >
        <table className="min-w-full text-sm text-gray-700">
          <thead>
            <tr className="bg-blue-50 text-left text-blue-800 uppercase text-xs">
              <th className="px-6 py-3 font-medium">ชื่อ</th>
              <th className="px-6 py-3 font-medium">ตำแหน่ง</th>
              <th className="px-6 py-3 font-medium">วันที่เริ่มงาน</th>
              <th className="px-6 py-3 font-medium">ข้อมูลติดต่อ</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b border-blue-100 transition-colors hover:bg-blue-50"
                >
                  <td className="px-6 py-3">{emp.name}</td>
                  <td className="px-6 py-3">{emp.role?.name || "-"}</td>
                  <td className="px-6 py-3">{formatDate(emp.startDate)}</td>
                  <td className="px-6 py-3">{getContactInfo(emp)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-400 italic"
                >
                  ไม่พบพนักงานที่ค้นหา
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white border border-blue-200 text-blue-600 hover:bg-blue-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState, useRef } from "react";
import EmployeeService from "../services/EmployeeService";
import EmployeeForm from "./EmployeeForm";
import { formatCurrency, formatDate } from "../utils/FormatUtils";
import AuthService from "../services/AuthService";
import { Search } from "lucide-react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [deleteModal, setDeleteModal] = useState({
    visible: false,
    employee: null,
  });

  const tableContainerRef = useRef(null);

  const user = AuthService.getCurrentUser();
  const canEdit = user?.role === "Manager" || user?.role === "PartTime";

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    calculateRowsPerPage();
    window.addEventListener("resize", calculateRowsPerPage);
    return () => window.removeEventListener("resize", calculateRowsPerPage);
  }, [employees]);

  const fetchEmployees = async () => {
    const data = await EmployeeService.getAllEmployees();
    setEmployees(data);
  };

  const handleAdd = () => {
    if (!canEdit) return alert("คุณไม่มีสิทธิ์เพิ่มพนักงาน");
    setSelectedEmployee(null);
    setFormVisible(true);
  };

  const handleEdit = (emp) => {
    if (!canEdit) return alert("คุณไม่มีสิทธิ์แก้ไขข้อมูลพนักงาน");
    setSelectedEmployee(emp);
    setFormVisible(true);
  };

  const openDeleteModal = (emp) => {
    setDeleteModal({ visible: true, employee: emp });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ visible: false, employee: null });
  };

  const handleDelete = async () => {
    if (!deleteModal.employee) return;
    await EmployeeService.deleteEmployee(deleteModal.employee.id);
    fetchEmployees();
    closeDeleteModal();
  };

  const handleSave = () => {
    setFormVisible(false);
    fetchEmployees();
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole =
      selectedRole === "All" || emp.role?.name === selectedRole;
    return matchesSearch && matchesRole;
  });

  const calculateRowsPerPage = () => {
    if (tableContainerRef.current) {
      const containerHeight = tableContainerRef.current.clientHeight;
      const rowHeight = 40;
      const headerHeight = 40;
      const rows = Math.floor((containerHeight - headerHeight) / rowHeight);
      setRowsPerPage(rows > 0 ? rows : 10);
    }
  };

  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const roles = [
    "ตำแหน่งทั้งหมด",
    ...new Set(employees.map((e) => e.role?.name).filter(Boolean)),
  ];

  return (
    <div className="w-full max-w-full relative">
      {!isFormVisible ? (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">จัดการพนักงาน</h1>
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="ค้นหาชื่อพนักงาน..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition text-sm text-gray-700 shadow-lg bg-white"
                />
                <Search
                  className="absolute left-3 top-2.5 text-blue-300"
                  size={18}
                />
              </div>

              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-blue-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white text-gray-700 shadow-lg"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              {canEdit && (
                <button
                  onClick={handleAdd}
                  className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow-lg hover:bg-blue-800 transition-all"
                >
                  + เพิ่มพนักงาน
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div
            ref={tableContainerRef}
            className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-blue-100 overflow-hidden h-195"
          >
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-blue-50 text-left text-blue-800 uppercase text-xs">
                  <th className="py-3 px-6">ชื่อ</th>
                  <th className="py-3 px-6">ตำแหน่ง</th>
                  <th className="py-3 px-6">เงินเดือน</th>
                  <th className="py-3 px-6">โบนัส</th>
                  <th className="py-3 px-6">สิทธิ์การใช้งาน</th>
                  <th className="py-3 px-6">วันที่เริ่มงาน</th>
                  {canEdit && <th className="py-3 px-6 text-center">จัดการ</th>}
                </tr>
              </thead>
              <tbody>
                {paginatedEmployees.length > 0 ? (
                  paginatedEmployees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="border-b border-blue-100 transition-colors hover:bg-blue-50"
                    >
                      <td className="py-3 px-6">{emp.name}</td>
                      <td className="py-3 px-6">{emp.role?.name || "-"}</td>
                      <td className="py-3 px-6">
                        {formatCurrency(emp.salary)}
                      </td>
                      <td className="py-3 px-6">
                        {formatCurrency(emp.bonus || 0)}
                      </td>
                      <td className="py-3 px-6">
                        {emp.permission?.canApprove
                          ? "All Access"
                          : emp.permission?.canEdit
                          ? "Edit Only"
                          : "View Only"}
                      </td>
                      <td className="py-3 px-6">{formatDate(emp.startDate)}</td>
                      {canEdit && (
                        <td className="py-3 px-6 text-center space-x-2">
                          <button
                            onClick={() => handleEdit(emp)}
                            className="px-3 py-1 text-yellow-600 hover:text-yellow-700 transition"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => openDeleteModal(emp)}
                            className="px-3 py-1 text-red-500 hover:text-red-600 transition"
                          >
                            🗑️
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={canEdit ? 7 : 6}
                      className="text-center py-6 text-gray-400 italic"
                    >
                      ไม่พบข้อมูลพนักงาน
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
        </>
      ) : (
        <EmployeeForm
          onSave={handleSave}
          onCancel={() => setFormVisible(false)}
          selectedEmployee={selectedEmployee}
        />
      )}

      {/* Delete Modal */}
      {deleteModal.visible && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 transition-opacity">
          <div className="bg-white rounded-2xl p-6 w-96 transform transition-transform duration-300 scale-100 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4">ยืนยันการลบ</h3>
            <p>
              คุณแน่ใจหรือไม่ว่าต้องการลบ{" "}
              <b>{deleteModal.employee?.name}</b>?
            </p>
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
              >
                ลบ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;

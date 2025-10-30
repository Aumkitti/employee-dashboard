// src/components/EmployeeForm.jsx
import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { Thai } from "flatpickr/dist/l10n/th.js";

const EmployeeForm = ({ selectedEmployee, onSave, onCancel }) => {
  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    salary: "",
    startDate: "",
    citizenId: "",
  });

  useEffect(() => {
    if (selectedEmployee) {
      setEmployee({
        id: selectedEmployee.id || "",
        name: selectedEmployee.name || "",
        citizenId: selectedEmployee.citizenId || "",
        role: selectedEmployee.role?.name || selectedEmployee.role || "",
        salary: selectedEmployee.salary || "",
        startDate: selectedEmployee.startDate
          ? new Date(selectedEmployee.startDate).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [selectedEmployee]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleDateChange = (date) => {
    setEmployee({ ...employee, startDate: date[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (employee.id) {
      await EmployeeService.updateEmployee(employee.id, employee);
    } else {
      await EmployeeService.addEmployee({
        ...employee,
        startDate: employee.startDate || new Date().toISOString(),
      });
    }
    onSave();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-2xl shadow-lg max-w-full mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {employee.id ? "แก้ไขข้อมูลพนักงาน" : "เพิ่มพนักงานใหม่"}
      </h2>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-500">
          ชื่อพนักงาน
        </label>
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-500">
          เลขบัตรประชาชน
        </label>
        <input
          type="text"
          name="citizenId"
          value={employee.citizenId || ""}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
          required
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-500">
          ตำแหน่ง (Role)
        </label>
        <select
          name="role"
          value={employee.role}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
        >
          <option value="">-- เลือกตำแหน่ง --</option>
          <option value="Manager">Manager</option>
          <option value="Intern">Intern</option>
          <option value="PartTime">Part-Time</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-500">
          เงินเดือน (บาท)
        </label>
        <input
          type="number"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
          required
        />
      </div>

      <div className="space-y-1">
        {" "}
        <label className="block text-sm font-medium text-gray-500">
          {" "}
          วันที่เริ่มงาน{" "}
        </label>{" "}
        <Flatpickr
          value={employee.startDate}
          onChange={handleDateChange}
          options={{
            dateFormat: "d-m-Y H:i",
            enableTime: true,
            time_24hr: true,
            locale: Thai,
            defaultDate: new Date(),
            allowInput: true,
            wrap: false,
            weekNumbers: false,
            plugins: [
              function (fp) {
                return {
                  onReady: function () {
                    const btn = document.createElement("button");
                    btn.textContent = "Today";
                    btn.type = "button";
                    btn.className =
                      "bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-700 transition w-full";
                    btn.addEventListener("click", () => {
                      fp.setDate(new Date());
                      fp.close();
                    });
                    fp.calendarContainer.appendChild(btn);
                  },
                };
              },
            ],
          }}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
        />{" "}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-sm"
        >
          บันทึก
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;

// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const data = await EmployeeService.getAllEmployees();
    setEmployees(data);
  };

  const totalEmployees = employees.length;

  const roleCounts = employees.reduce(
    (acc, emp) => {
      if (emp.role?.name === "Manager") acc.manager += 1;
      else if (emp.role?.name === "Intern") acc.intern += 1;
      else if (emp.role?.name === "PartTime") acc.parttime += 1;
      return acc;
    },
    { manager: 0, intern: 0, parttime: 0 }
  );

  // ฟังก์ชันช่วยคำนวณระยะเวลาทำงาน
  const calculateWorkDuration = (startDate) => {
    if (!startDate) return { years: 0, months: 0, days: 0, totalDays: 0 };
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = now - start; // milliseconds
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // คำนวณปี เดือน วัน
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days, totalDays };
  };

  // เรียงพนักงานจากทำงานนานที่สุด
  const sortedByWorkDuration = [...employees].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  const roleData = [
    { name: "Manager", value: roleCounts.manager },
    { name: "Intern", value: roleCounts.intern },
    { name: "PartTime", value: roleCounts.parttime },
  ];

  const COLORS = ["#2563eb", "#60a5fa", "#93c5fd"];

  const barData = [
    { name: "Manager", จำนวน: roleCounts.manager },
    { name: "Intern", จำนวน: roleCounts.intern },
    { name: "PartTime", จำนวน: roleCounts.parttime },
  ];

  return (
    <div className="h-[800px] p-1">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        📊 Dashboard ข้อมูลพนักงาน
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ซ้าย: การ์ดสรุปจำนวนพนักงาน */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl h-[830px]">
          <h2 className="text-xl font-semibold text-blue-800 mb-6">
            ข้อมูลสรุปทั้งหมด
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 text-blue-800 p-6 rounded-2xl shadow-sm text-center hover:scale-[1.02] transition">
              <h2 className="text-lg font-medium">พนักงานทั้งหมด</h2>
              <p className="text-4xl mt-2 font-bold">{totalEmployees}</p>
            </div>

            <div className="bg-blue-50 text-blue-800 p-6 rounded-2xl shadow-sm text-center hover:scale-[1.02] transition">
              <h2 className="text-lg font-medium">Manager</h2>
              <p className="text-4xl mt-2 font-bold">{roleCounts.manager}</p>
            </div>

            <div className="bg-blue-50 text-blue-800 p-6 rounded-2xl shadow-sm text-center hover:scale-[1.02] transition">
              <h2 className="text-lg font-medium">Intern</h2>
              <p className="text-4xl mt-2 font-bold">{roleCounts.intern}</p>
            </div>

            <div className="bg-blue-50 text-blue-800 p-6 rounded-2xl shadow-sm text-center hover:scale-[1.02] transition">
              <h2 className="text-lg font-medium">PartTime</h2>
              <p className="text-4xl mt-2 font-bold">{roleCounts.parttime}</p>
            </div>
          </div>

          <div className="mt-8 h-[350px]">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              สัดส่วนตำแหน่งในบริษัท
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  fill="#2563eb"
                  label
                >
                  {roleData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ขวา: กราฟแท่ง + รายชื่อพนักงาน */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-blue-100 h-[340px]">
            <h2 className="text-lg font-semibold text-blue-800 mb-4">
              กราฟจำนวนพนักงานแต่ละตำแหน่ง
            </h2>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="จำนวน" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-blue-100 overflow-y-auto max-h-[465px]">
            <h2 className="text-lg font-semibold text-blue-800 mb-4">
              พนักงานที่มีระยะเวลาร่วมงานกับเรานานที่สุด
            </h2>
            <div className="space-y-2">
              {sortedByWorkDuration.map((emp) => {
                const duration = calculateWorkDuration(emp.startDate);
                return (
                  <div
                    key={emp.id}
                    className="flex justify-between bg-blue-50 px-4 py-2 rounded-xl text-gray-700 hover:bg-blue-100 transition"
                  >
                    <div>
                      <span className="font-medium">{emp.name}</span> <br />
                      <span className="text-xs text-gray-500">
                        ตำแหน่ง: {emp.role?.name || "-"} <br />
                        เริ่มทำงาน:{" "}
                        {new Date(emp.startDate).toLocaleDateString("th-TH")}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      (ทำงานกับเรามาแล้ว {duration.totalDays} วัน)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

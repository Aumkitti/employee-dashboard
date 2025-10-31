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
import { Users, UserCheck, UserCog, UserPlus, User, Crown } from "lucide-react";

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
      else if (emp.role?.name === "PermanentEmployee") acc.permanent += 1;
      return acc;
    },
    { manager: 0, intern: 0, parttime: 0, permanent: 0 }
  );

  const calculateWorkDuration = (startDate) => {
    if (!startDate) return { totalDays: 0 };
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = now - start;
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return { totalDays };
  };

  const sortedByWorkDuration = [...employees].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  const roleData = [
    { name: "Manager", value: roleCounts.manager },
    { name: "Intern", value: roleCounts.intern },
    { name: "PartTime", value: roleCounts.parttime },
    { name: "Permanent", value: roleCounts.permanent },
  ];

  const COLORS = ["#2563eb", "#60a5fa", "#93c5fd", "#3297fdff"];

  const barData = [
    { name: "Manager", จำนวน: roleCounts.manager },
    { name: "Intern", จำนวน: roleCounts.intern },
    { name: "PartTime", จำนวน: roleCounts.parttime },
    { name: "Permanent", จำนวน: roleCounts.permanent },
  ];

  const StatCard = ({ title, value, Icon }) => {
    const IconComponent = Icon;
    return (
      <div className="flex items-center justify-between bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 p-5 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition">
        <div>
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="text-3xl mt-1 font-bold">{value}</p>
        </div>
        {IconComponent ? (
          <IconComponent className="w-10 h-10 text-blue-500" />
        ) : null}
      </div>
    );
  };

  return (
    <div className="h-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        📊 Dashboard ข้อมูลพนักงาน
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-blue-100 h-auto">
          <h2 className="text-xl font-semibold text-blue-800 mb-6">
            ข้อมูลสรุปทั้งหมด
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4">
            <StatCard
              title="พนักงานทั้งหมด"
              value={totalEmployees}
              Icon={Users}
            />
            <StatCard
              title="Manager"
              value={roleCounts.manager}
              Icon={UserCog}
            />
            <StatCard
              title="Permanent"
              value={roleCounts.permanent}
              Icon={User}
            />
            <StatCard
              title="Intern"
              value={roleCounts.intern}
              Icon={UserPlus}
            />
            <div className="sm:col-span-2 xl:col-span-2">
              <StatCard
                title="Part-Time"
                value={roleCounts.parttime}
                Icon={UserCheck}
              />
            </div>
          </div>

          <div className="mt-5 h-[350px]">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              สัดส่วนตำแหน่งในบริษัท
            </h3>
            <ResponsiveContainer width="100%" height="90%">
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

        <div className="xl:col-span-2 flex flex-col gap-6">
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

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-blue-100 flex flex-col items-center justify-center text-center">
              <h2 className="text-lg font-semibold text-blue-800 mb-4">
                ผู้บริหารระดับสูง (Executives)
              </h2>
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 flex items-center justify-center shadow-lg">
                  <Crown className="w-12 h-12 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-800">
                    คุณกิตติพงษ์ เดชจิต
                  </p>
                  <p className="text-gray-500 text-sm">
                    ตำแหน่ง: CEO / Founder
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    เริ่มบริหารตั้งแต่: 01/01/2021
                  </p>
                </div>
              </div>

              <div className="mt-6 w-full border-t border-blue-100 pt-4">
                <p className="text-sm text-gray-600">
                  “มุ่งมั่นสร้างทีมที่แข็งแกร่งและองค์กรที่เติบโตไปด้วยกัน”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";

const Card = ({ title, name, role, color }) => (
  <div
    className={`transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg p-4 rounded-2xl border bg-white ${color}`}
    style={{
      width: "200px",
      minHeight: "90px",
      display: "inline-block",
      verticalAlign: "middle",
    }}
  >
    <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
    <p className="text-gray-600 text-xs mt-1">{name}</p>
    <p className="text-blue-500 text-xs italic mt-1">{role}</p>
  </div>
);

export default function OfficeChart() {
  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-sm overflow-auto h-[900px]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center tracking-wide">
        แผนผังองค์กร
      </h2>

      <div className="w-full flex justify-center items-start">
        <div className="inline-flex">
          <Tree
            lineWidth="2px"
            lineColor="#d1d5db"
            lineBorderRadius="10px"
            label={
              <Card
                title="CEO"
                name="คุณสมชาย ใจดี"
                role="ผู้บริหารสูงสุด"
                color="bg-blue-50"
              />
            }
          >
            <TreeNode
              label={
                <Card
                  title="Manager"
                  name="คุณวิชัย พัฒนา"
                  role="หัวหน้าฝ่าย Frontend"
                  color="bg-green-50"
                />
              }
            >
              <TreeNode
                label={
                  <Card
                    title="Senior Dev"
                    name="คุณกิตติพงษ์ เดชจิต"
                    role="Frontend Lead (React / Vue)"
                    color="bg-yellow-50"
                  />
                }
              >
                <TreeNode
                  label={
                    <Card
                      title="Employee"
                      name="คุณณัฐชา ศรีสุข"
                      role="UI/UX Designer"
                      color="bg-pink-50"
                    />
                  }
                >
                  <TreeNode
                    label={
                      <Card
                        title="Intern"
                        name="คุณมะลิ จันทร์เพ็ญ"
                        role="นักศึกษาฝึกงาน (Frontend)"
                        color="bg-gray-50"
                      />
                    }
                  />
                  <TreeNode
                    label={
                      <Card
                        title="Intern"
                        name="คุณอธิศ พิสุทธิ์"
                        role="นักศึกษาฝึกงาน (React)"
                        color="bg-gray-50"
                      />
                    }
                  />
                </TreeNode>

                <TreeNode
                  label={
                    <Card
                      title="Employee"
                      name="คุณพีระพัฒน์ รัตนา"
                      role="Frontend Developer"
                      color="bg-pink-50"
                    />
                  }
                />
              </TreeNode>
            </TreeNode>

            <TreeNode
              label={
                <Card
                  title="Manager"
                  name="คุณอรทัย วิริยะ"
                  role="หัวหน้าฝ่าย Backend"
                  color="bg-green-50"
                />
              }
            >
              <TreeNode
                label={
                  <Card
                    title="Senior Dev"
                    name="คุณธนกฤต สุวรรณ"
                    role="Node.js / Database"
                    color="bg-yellow-50"
                  />
                }
              >
                <TreeNode
                  label={
                    <Card
                      title="Employee"
                      name="คุณมานพ สุขใจ"
                      role="Database Support"
                      color="bg-pink-50"
                    />
                  }
                >
                  <TreeNode
                    label={
                      <Card
                        title="Intern"
                        name="คุณศศิธร แก้วมณี"
                        role="Intern (SQL / API)"
                        color="bg-gray-50"
                      />
                    }
                  />
                </TreeNode>
              </TreeNode>
            </TreeNode>

            <TreeNode
              label={
                <Card
                  title="Manager"
                  name="คุณรุ่งทิพย์ พรรณนา"
                  role="หัวหน้าฝ่าย Design"
                  color="bg-green-50"
                />
              }
            >
              <TreeNode
                label={
                  <Card
                    title="Senior Designer"
                    name="คุณปัญญา เกิดสุข"
                    role="Graphic / UX"
                    color="bg-yellow-50"
                  />
                }
              >
                <TreeNode
                  label={
                    <Card
                      title="Intern"
                      name="คุณพิมพ์ชนก สุขศรี"
                      role="Intern (Graphic)"
                      color="bg-gray-50"
                    />
                  }
                />
              </TreeNode>
            </TreeNode>
          </Tree>
        </div>
      </div>
    </div>
  );
}

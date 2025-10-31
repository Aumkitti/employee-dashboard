import React, { useState } from "react";

export default function SettingsModal({ isOpen, onClose }) {
  const [settings, setSettings] = useState({
    defaultOffice: "Manager Office",
    theme: "light",
    language: "th",
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          ⚙️ ตั้งค่าระบบ
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-gray-600 font-medium">
              ค่าเริ่มต้น Office
            </label>
            <input
              type="text"
              value={settings.defaultOffice}
              onChange={(e) =>
                setSettings({ ...settings, defaultOffice: e.target.value })
              }
              className="border border-gray-300 rounded-xl px-3 py-2 mt-1 w-full"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">ธีม</label>
            <select
              value={settings.theme}
              onChange={(e) =>
                setSettings({ ...settings, theme: e.target.value })
              }
              className="border border-gray-300 rounded-xl px-3 py-2 mt-1 w-full"
            >
              <option value="light">สว่าง</option>
              <option value="dark">มืด</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-medium">ภาษา</label>
            <select
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
              className="border border-gray-300 rounded-xl px-3 py-2 mt-1 w-full"
            >
              <option value="th">ไทย</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          >
            ปิด
          </button>
          <button
            onClick={() => {
              console.log("Saved Settings:", settings);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import {
  Users,
  CalendarCheck,
  CheckCircle,
  Clock,
  LogOut,
  XCircle,
  MoreVertical,
} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function Attendance() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6 bg-[#F5F5F5] min-h-screen">
      {/* Attendance Dashboard Header */}
      <div className="bg-white rounded-xl px-6 py-4 mb-6 shadow-sm flex justify-between items-center relative">
        <h2 className="text-lg font-semibold text-gray-800">
          Attendance Dashboard
        </h2>

        {/* More menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => {
              setOpenMenu((prev) => !prev);
              navigate('/students/attendance/manage');
            }}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <MoreVertical size={20} />
          </button>

          {/* Animated Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50
              transform transition-all duration-200 ease-out
              ${
                openMenu
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
          >
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
              onClick={() => setOpenMenu(false)}
            >
              Manage Attendance
            </button>
          </div>
        </div>
      </div>

      {/* Users Section */}
      <div className="bg-white rounded-xl px-6 py-5 mb-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Users</h3>
        <select className="w-64 bg-gray-100 text-sm px-4 py-2 rounded-lg outline-none">
          <option>Select Users</option>
          <option>All</option>
          <option>Employees</option>
          <option>Students</option>
        </select>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Employees"
          value="10"
          bg="bg-[#F6E7D8]"
          icon={<Users size={22} />}
        />
        <Card
          title="Total Schedules"
          value="04"
          bg="bg-[#DDF4F8]"
          icon={<CalendarCheck size={22} />}
        />
        <Card
          title="On-Time Today"
          value="05"
          bg="bg-[#E9B4B4]"
          icon={<CheckCircle size={22} />}
        />
        <Card
          title="Late Today"
          value="02"
          bg="bg-[#E6C8A8]"
          icon={<Clock size={22} />}
        />
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-2xl">
        <Card
          title="On Leave Today"
          value="02"
          bg="bg-[#BDBDBD]"
          icon={<LogOut size={22} />}
        />
        <Card
          title="Absent Today"
          value="10"
          bg="bg-[#CDEAD4]"
          icon={<XCircle size={22} />}
        />
      </div>
    </div>
  );
}

/* Reusable Card */
function Card({ title, value, bg, icon }) {
  return (
    <div
      className={`${bg} rounded-2xl p-6 shadow-sm flex justify-between items-start`}
    >
      <div>
        <p className="text-sm text-gray-700">{title}</p>
        <h2 className="text-2xl font-bold mt-2">{value}</h2>
      </div>

      <div className="bg-white p-3 rounded-lg shadow-sm text-gray-700">
        {icon}
      </div>
    </div>
  );
}

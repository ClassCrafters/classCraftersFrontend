import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  BookOpen,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  School,
  Receipt,
  Presentation,
  Car,
  MessageCircle,
  BookCheck,
  BookOpenCheck
  
} from "lucide-react";
import { Link } from "react-router-dom"; // 🔥 IMPORTANT
import logo from "@/assets/logo.png";
import AppMenuModal from "@/components/modals/appMenuModal";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSubMenu = (label) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  const menuItems = [
    { href: "/", label: "Dashboard", icon: <Home size={20} /> },

    {
      label: "Front Office",
      icon: <Presentation size={20} />,
      children: [
        { href: "/front-office/enquiries", label: "Enquiries" },
        { href: "/front-office/visitor-book", label: "Visitor Book" },
        { href: "/front-office/dispatch", label: "Dispatch" },
        { href: "/front-office/receive", label: "Receive" },
        { href: "/front-office/complain", label: "Complain" },
      ],
    },
    {
      label: "Classrooms",
      icon: <School size={20} />,
      children: [{ href: "/classrooms/list", label: "All Classrooms" }],
    },

    {
      label: "Students",
      icon: <Users size={20} />,
      children: [
        { href: "/students/list", label: "Student List" },
        { href: "/students/admission", label: "Admissions" },
        { href: "/students/attendance", label: "Attendance" },
      ],
    },

    {
      label: "Academics",
      icon: <School size={20} />,
      children: [
        { href: "/student/timetable", label: "Student Timetable" },
        { href: "/teacher/timetable", label: "Teacher Timetable" },
        { href: "/classrooms/list", label: "Classrooms" },
        { href: "/subjects", label: "Subjects" },
        { href: "/academics/leave-management", label: "Leave Management" }
      ],
    },
    {
      label: "Examinations",
      icon: <BookCheck size={20} />,
      children: [
        { href: "/examinations/exam-group", label: "Exam Groups" },
        { href: "/examinations/exam-schedule", label: "Exam Schedule" },
        { href: "/examinations/exam-result", label: "Exam Results" },
      ],
    },
    {
      label: "Lessons",
      icon: <BookOpenCheck size={20} />,
    },

    {
      label: "Payment",
      icon: <Receipt size={20} />,
      children: [
        { href: "/payment/collect-fees", label: "Collect Fees" },
        { href: "/payment/assign-fees", label: "Assign Fees" },
        { href: "/payment/fee-structure", label: "Fee Structure" },
        { href: "/payment/payments", label: "Payments" },
        // { href: "/payment/history", label: "History" },
        { href: "/payment/search-due-fees", label: "Search Due Fees" },
      ],
    },
    {
      label: "Alumni",
      icon: <Users size={20} />,
      children: [
        { href: "/alumni", label: "Alumni" },
      ],
    },
    {
      label: "Library",
      icon: <BookOpen size={20} />,
      children: [
        { href: "/library", label: "Library" },
        { href: "/library/booklist", label: "Book List" },
        { href: "/library/issue-return", label: "Issue Return" },
      ],
    },
    {
      label: "Inventory",
      icon: <Receipt size={20} />,
      children: [
        { href: "/inventory", label: "Inventory" },
      ],
    },
    {
      label: "Human Resource",
      icon: <Settings size={20} />,
    },

    {
      label: "Transport",
      icon: <Car size={20} />,
      children: [
        { href: "/transport/vehicles", label: "Vehicles" },
        { href: "/transport/drivers", label: "Drivers" },
        { href: "/transport/routes", label: "Routes" },
        { href: "/transport/add-stop", label: "Add Stop" },
        { href: "/assign-student-transport", label: "Assign Student Transport" },
      ],
    },

    {
      label: "Messenger",
      icon: <MessageCircle size={20} />,
      children: [
        { href: "/messenger/list", label: "Profile" },
      ],
    },

    {
      label: "Settings",
      icon: <Settings size={20} />,
      children: [
        { href: "/settings/profile", label: "Profile" },
        { href: "/settings/account", label: "Account" },
      ],
    },
  ];

  return (
    <motion.aside
      animate={{ width: isOpen ? 240 : 80 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      className="bg-[#D3C9B6] border-r min-h-screen flex flex-col py-6 px-2 shadow relative"
    >
      {/* Collapse Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 bg-white border rounded-full shadow p-1"
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Logo */}
      <div className="mb-8 flex justify-center">
        {isOpen ? (
          <motion.img
            src={logo}
            alt="ClassCrafters Logo"
            className="h-14 w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ) : (
          <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow">
            CC
          </div>
        )}
      </div>
      
      {/* App Menu Modal */}
      <div className="mb-4 flex justify-center">
      <AppMenuModal />
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item, i) => {
          const hasChildren = item.children && item.children.length > 0;
          const isSubOpen = openMenu === item.label;

          return (
            <div key={i}>
              {/* MAIN ITEM */}
              {!hasChildren ? (
                // 🔥 DIRECT NAVIGATION PAGE LINK
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 text-gray-700 hover:bg-blue-50 hover:text-[#557A66] rounded px-3 py-2 cursor-pointer ${!isOpen ? "justify-center" : ""
                    }`}
                >
                  {item.icon}
                  {isOpen && <span>{item.label}</span>}
                </Link>
              ) : (
                // 🔥 MENU WITH CHILDREN (toggle only)
                <motion.div
                  onClick={() => toggleSubMenu(item.label)}
                  className={`flex items-center justify-between text-gray-700 hover:bg-blue-50 hover:text-[#557A66] rounded px-3 py-2 cursor-pointer ${!isOpen ? "justify-center" : ""
                    }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {isOpen && <span>{item.label}</span>}
                  </div>

                  {isOpen &&
                    (isSubOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />)}
                </motion.div>
              )}

              {/* SUB MENU */}
              <AnimatePresence>
                {isSubOpen && isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-10 mt-1 flex flex-col gap-1"
                  >
                    {item.children.map((sub, j) => (
                      <Link
                        key={j}
                        to={sub.href}
                        className="text-sm text-gray-600 hover:text-[#557A66] hover:bg-gray-200/40 rounded px-2 py-1"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      {isOpen && (
        <motion.div
          className="mt-auto pt-6 text-xs text-gray-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          © {new Date().getFullYear()} ClassCrafters
        </motion.div>
      )}
    </motion.aside>
  );
};

export default Sidebar;

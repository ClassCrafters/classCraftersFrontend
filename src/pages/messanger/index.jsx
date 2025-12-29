import React, { useEffect, useRef, useState } from "react";

const MessengerPage = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const menuRef = useRef(null);
  const plusBtnRef = useRef(null);
  const moreBtnRef = useRef(null);

  const [filters, setFilters] = useState({
    principalStudent: true,
    principalTeacher: false,
    principalCTeacher: false,
    cTeacherTeacher: false,
    cTeacherStudent: false,
    studentPrincipal: false,
  });

  // 🔹 Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !plusBtnRef.current.contains(e.target) &&
        !moreBtnRef.current.contains(e.target)
      ) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  const handleCheckboxChange = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const messengerData = [
    { id: 1, name: "Priyanka", message: "Sounds good !!" },
    { id: 2, name: "Bapu", message: "Ok fine" },
    { id: 3, name: "Sthiti", message: "See you" },
    { id: 4, name: "Debashish", message: "Thanks" },
    { id: 5, name: "Bunty", message: "On the way" },
    { id: 6, name: "Chin", message: "Got it" },
    { id: 7, name: "Girija", message: "Sure" },
    { id: 8, name: "Myself", message: "Yes" },
  ];

  return (
    <div className="flex h-screen bg-[#f3f3f3]">
      {/* ===== CHAT LIST ===== */}
      <div className="w-[320px] bg-white border-r p-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">Messenger</h3>

          {/* PLUS + MORE ICONS */}
          <div className="flex items-center gap-3">
            <button
              ref={plusBtnRef}
              onClick={() => setOpenMenu((prev) => !prev)}
              className="text-xl font-bold"
            >
              +
            </button>

            {/* MORE OPTIONS ICON (⋮) */}
            <button
              ref={moreBtnRef}
              onClick={() => setOpenMenu((prev) => !prev)}
              className="text-xl font-bold"
            >
              ⋮
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 text-xs">
          <button className="px-3 py-1 bg-gray-200 rounded-full">All</button>
          <button className="px-3 py-1 bg-gray-100 rounded-full">Unread</button>
          <button className="px-3 py-1 bg-gray-100 rounded-full">
            Favourites
          </button>
          <button className="px-3 py-1 bg-gray-100 rounded-full">Groups</button>
        </div>

        {/* Messenger List */}
        <table className="w-full">
          <tbody>
            {messengerData.map((chat) => (
              <tr
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`cursor-pointer transition ${
                  selectedChat?.id === chat.id
                    ? "bg-[#e6f0ec]"
                    : "hover:bg-gray-100"
                }`}
              >
                <td>
                  <div className="flex items-center gap-3 py-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    <div>
                      <p className="font-medium">{chat.name}</p>
                      <p className="text-xs text-gray-400">
                        {chat.message}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ===== CONVERSATION FILTER MENU ===== */}
        <div
          ref={menuRef}
          className={`absolute top-12 right-4 w-72 bg-white border rounded-lg shadow-lg p-4 z-50
          transform transition-all duration-300 ease-out
          ${
            openMenu
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          <h4 className="font-semibold text-sm mb-1">
            Conversation Filters
          </h4>
          <p className="text-xs text-gray-500 mb-3">
            Choose allowed communication
          </p>

          <div className="space-y-2 text-sm">
            {[
              ["principalStudent", "Principal to Student"],
              ["principalTeacher", "Principal to Teacher"],
              ["principalCTeacher", "Principal to C.Teacher"],
              ["cTeacherTeacher", "C.Teacher to Teacher"],
              ["cTeacherStudent", "C.Teacher to Student"],
              ["studentPrincipal", "Student to Principal"],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters[key]}
                  onChange={() => handleCheckboxChange(key)}
                />
                {label}
              </label>
            ))}
          </div>

          <button
            onClick={() => setOpenMenu(false)}
            className="mt-4 w-full bg-[#2f7d6d] text-white py-1.5 rounded text-sm"
          >
            Apply
          </button>
        </div>
      </div>

      {/* ===== CHAT WINDOW ===== */}
      <div className="flex-1 bg-gray-300 flex flex-col">
        <div className="bg-white px-6 py-3 border-b font-semibold">
          {selectedChat ? selectedChat.name : "Select a chat"}
        </div>

        <div className="flex-1 p-6 space-y-4">
          {selectedChat ? (
            <>
              <div className="bg-white p-3 rounded-md w-fit">
                Hi <span className="text-xs ml-2">8:13 pm</span>
              </div>
              <div className="bg-white p-3 rounded-md w-fit ml-auto">
                Hello <span className="text-xs ml-2">8:14 pm</span>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center mt-10">
              Click on a conversation to start chatting
            </p>
          )}
        </div>

        <div className="bg-white p-4 flex gap-2">
          <input
            disabled={!selectedChat}
            className="flex-1 px-4 py-2 rounded-full border outline-none"
            placeholder="Type a message"
          />
          <button
            disabled={!selectedChat}
            className="px-4 rounded-full bg-gray-200"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessengerPage;

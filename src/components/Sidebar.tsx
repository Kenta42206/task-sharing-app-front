import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full w-64 bg-gray-800 text-white p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          タスク管理
        </NavLink>
        <NavLink
          to="/rooms"
          className={({ isActive }) =>
            `p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          ルーム管理
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          設定
        </NavLink>
        <button
          onClick={handleLogout}
          className="mt-auto p-2 rounded bg-red-500 hover:bg-red-600"
        >
          ログアウト
        </button>
      </nav>
      <div className="mt-auto flex items-center space-x-4 pt-4 border-t border-gray-700">
        <div>
          <p className="text-lg font-semibold">{currentUser?.username}</p>
          <p className="text-sm text-gray-400">{currentUser?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

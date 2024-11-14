import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 bg-gray-100">
        <Outlet /> {/* Outletによりサイドバー右側の表示が切り替わる */}
      </main>
    </div>
  );
};

export default Dashboard;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import PrivateRoute from "./components/auth/PrivateRoute";
// import LoginPage from "./pages/LoginPage";
// import TaskPage from "./pages/TaskPage";
// import SignupPage from "./pages/SignupPage";
// import Header from "./components/Header";
// import { TaskProvider } from "./context/TaskContext";

// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       <TaskProvider>
//         <Router>
//           <Header />
//           <Routes>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/signup" element={<SignupPage />} />
//             <Route
//               path="/tasks"
//               element={<PrivateRoute element={<TaskPage />} />}
//             />
//             <Route path="/" element={<Navigate to="/login" replace />} />
//           </Routes>
//         </Router>
//       </TaskProvider>
//     </AuthProvider>
//   );
// };

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./components/Dashboard"; // サイドバー付きのレイアウト
import SettingsPage from "./pages/SettingPage"; // 設定ページ
import RoomPage from "./pages/RoomPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={<PrivateRoute element={<DashboardLayout />} />}
            >
              <Route path="tasks" element={<TaskPage />} />
              <Route path="rooms" element={<RoomPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;

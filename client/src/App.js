import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShareNavbar from "./components/ShareNavbar";
import ShareSidebarNav from "./components/ShareSidebarNav";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Timer from "./pages/Timer/Timer";
import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Tasks/Tasks";
import Staffs from "./pages/Staffs/Staffs";
import Memos from "./pages/Memos/Memos";
import Setting from "./pages/Setting/Setting";
import NotFound from "./pages/Not found/NotFound";
import SingleProject from "./pages/Projects/SingleProject/SingleProject";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShareNavbar />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <ShareSidebarNav />
            </ProtectedRoute>
          }
        >
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/projects" element={<Projects />} />
          <Route path="/user/projects/:id" element={<SingleProject />} />
          <Route path="/user/tasks" element={<Tasks />} />
          <Route path="/user/timer" element={<Timer />} />
          <Route path="/user/memos" element={<Memos />} />
          <Route path="/user/staffs" element={<Staffs />} />
          <Route path="/user/setting" element={<Setting />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

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
        <Route path="/home" element={<ShareNavbar />}>
          <Route index element={<Home />} />
          <Route path="/home/login" element={<Login />} />
          <Route path="/home/register" element={<Register />} />
        </Route>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ShareSidebarNav />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<SingleProject />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/memos" element={<Memos />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

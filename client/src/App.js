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
import Clients from "./pages/Clients/Clients";
import Reports from "./pages/Reports/Reports";
import Setting from "./pages/Setting/Setting";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<ShareNavbar />}>
          <Route index element={<Home />} />
          <Route path="/home/login" element={<Login />} />
          <Route path="/home/register" element={<Register />} />
        </Route>
        <Route path="/" element={<ShareSidebarNav />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Screens/Dashboard";
import CustomerScreen from "./Screens/CustomerScreen";
import OrderScreen from "./Screens/OrderScreen";
import ProductScreen from "./Screens/ProductScreen";

// Import other screens as needed

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customerscreen" element={<CustomerScreen />} />
            <Route path="/orderscreen" element={<OrderScreen />} />
            <Route path="/productscreen" element={<ProductScreen/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

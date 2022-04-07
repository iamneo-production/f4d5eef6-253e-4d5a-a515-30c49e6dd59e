import React from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Bookings from "./Bookings/Bookings";
import Dashboard from "./Dashboard/Dashboard";

import NavBar from "./Navbar/NavBar";
import "./SuperAdmin.css";

export default function SuperAdmin(){
    return (
        <Router>
            <NavBar/>
            <Routes>
                <Route exact path="/superAdmin/" element={<Dashboard/>}/>
                <Route exact path="/superAdmin/bookings" element={<Bookings/>}/>
            </Routes>
        </Router>
    )
}
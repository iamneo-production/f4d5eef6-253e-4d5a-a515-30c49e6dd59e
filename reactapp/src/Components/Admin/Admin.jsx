import React from "react";
import "./Admin.css"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"
import NavBar from "./Navbar/NavBar";
import Profile from "./Profile/Profile";
import Dashboard from "./Dashboard/Dashboard";
import AddBike from "./AddBike/AddBike";

export default function Admin(){
    return (
        <Router>
            <NavBar/>
            <Routes>
            <Route exact path="/admin/" element={<Dashboard/>}/>
            <Route exact path="/admin/profile" element={<Profile/>}/>
            <Route exact path="/admin/addBike" element={<AddBike/>}/>
            </Routes>
        </Router>
    )
}
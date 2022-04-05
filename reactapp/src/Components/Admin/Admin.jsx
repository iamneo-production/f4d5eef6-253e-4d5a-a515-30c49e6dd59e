import React from "react";
import "./Admin.css"
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"
import NavBar from "./Navbar/NavBar";
import Profile from "./Profile/Profile";

export default function Admin(){
    return (
        <Router>
            <NavBar/>
            <Routes>
            <Route exact path="/admin/profile" element={<Profile/>}/>
            </Routes>
        </Router>
    )
}
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
import EditBike from "./EditBike/EditBike";
import Bookings from "./Bookings/Bookings";
import EditProfile from "./EditProfile/EditProfile";

export default function Admin(){
    return (
        <Router>
            <NavBar/>
            <Routes>
            <Route exact path="/admin/" element={<Dashboard/>}/>
            <Route exact path="/admin/profile" element={<Profile/>}/>
            <Route exact path="/admin/addBike" element={<AddBike/>}/>
            <Route exact path="/admin/bookings" element={<Bookings/>}/>
            <Route exact path="/admin/editBike/:id" element={<EditBike/>}/>
            <Route exact path="/admin/editProfile" element={<EditProfile/>}/>
            
            </Routes>
        </Router>
    )
}
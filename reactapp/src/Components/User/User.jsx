import React,{useState} from "react";
import Dashboard from "./Dashboard/Dashboard";
import "./User.css";
import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
import CompanyDetails from "./CompanyDetails/CompanyDetails";
import BikeDetails from "./BikeDetails/BikeDetails";
import NavBar from "./Navbar/NavBar"
import Bookings from "./Bookings/Bookings";
export default function User(){
    const [apiData,setApiData] = useState([]);
    return (
        <Router>
        <NavBar/>
        <Routes>
        <Route exact path="/dashboard" element={<Dashboard apiData={apiData} setApiData={setApiData}/>} />
        <Route exact path="/companyDetails/:id" element={<CompanyDetails apiData={apiData}/>}/>
        <Route exact path="/bikeDetails/:id" element={<BikeDetails />}/>
        <Route exact path="/bookings" element={<Bookings />}/>
        </Routes>
      
    </Router>
    )
}
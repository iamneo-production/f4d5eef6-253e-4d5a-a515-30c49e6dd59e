import React from "react";
import { Link } from "react-router-dom";
import "./AddBike.css"

export default function AddBike(){
    return (
        <div className="admin_addBike">
            <div className="backBtn">
                <Link to="/admin/">&lt;&nbsp;back</Link>
            </div>
            <div className="addBike_bikeInfo">
                <label htmlFor="model">Bike Model</label>
                <input type="text" id="model"/>
            </div>
            <div className="addBike_bikeInfo">
                <label htmlFor="price">Bike Price</label>
                <input type="text" id="price"/>
            </div>
            <div className="addBike_bikeInfo">
                <label htmlFor="type">Bike Type</label>
                <input type="text" id="type"/>
            </div>
            <div className="addBike_button_container">
                <button className="btn addBike_button">Add Bike</button>
            </div>
        </div>
    )
}
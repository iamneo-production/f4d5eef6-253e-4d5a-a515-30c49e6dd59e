import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { adminAddBikeApiCall } from "../../../ApiCalls/AdminDashboard";
import "./AddBike.css"

export default function AddBike(){

    const [bikeName,setBikeName] = useState("");
    const [bikeNumber,setBikeNumber] = useState("");
    const [bikePrice,setBikePrice] = useState("");
    const [bikeType,setBikeType] = useState("");
    
    const [isSending, setIsSending] = useState(false);

    const [statusMssg,setStatusMssg]=useState({
        show:false,
        mssg:""
    })
  
  const addBikeHandler =async () => {
    if (isSending) return
    setIsSending(true)
    console.log(bikeName,bikeNumber)

    const message =await adminAddBikeApiCall(bikeName,bikeNumber,bikePrice,bikeType);
        
    setStatusMssg({
        show:true,
        mssg:await message
    })
    
    setIsSending(false)
  }



    return (
        <div className="admin_addBike">
             {statusMssg.show&& <div className="alert alert-success custom-alert" role="alert">
                    {statusMssg.mssg}
             </div>}
            <div className="backBtn">
                <Link to="/admin/">&lt;&nbsp;back</Link>
            </div>
            <div className="addBike_bikeInfo">
                <label htmlFor="bikeNumber">Bike Number</label>
                <input type="text" id="bikeNumber"
                 value={bikeNumber}
                 onChange={(e)=>setBikeNumber(e.target.value)}
                required/>
            </div>
            <div className="addBike_bikeInfo">
                <label htmlFor="model">Bike Model</label>
                <input type="text" id="model"
                value={bikeName}
                onChange={(e)=>setBikeName(e.target.value)}
                required/>
            </div>
            <div className="addBike_bikeInfo">
                <label htmlFor="price">Bike Price</label>
                <input type="text" id="price"
                value={bikePrice}
                onChange={(e)=>setBikePrice(e.target.value)}
                required/>
            </div>
            <div className="addBike_bikeInfo">
                <label htmlFor="type">Bike Type</label>
                <input type="text" id="type"
                value={bikeType}
                onChange={(e)=>setBikeType(e.target.value)}
                required/>
            </div>
            <div className="addBike_button_container">
                <button className="btn addBike_button"
                onClick={addBikeHandler}
                >Add Bike
                </button>
            </div>
        </div>
    )
}
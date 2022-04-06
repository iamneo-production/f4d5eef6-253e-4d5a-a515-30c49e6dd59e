import React, {  useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import { adminEditBikeApiCall, adminGetBikeApiCall } from "../../../ApiCalls/AdminDashboard";
import "./EditBike.css"

export default function EditBike(){
    const {id}=useParams();

    const [bikeApiData,setBikeApiData]=useState({})

    const [bikeName,setBikeName] = useState("");
    const [bikeNumber,setBikeNumber] = useState("");
    const [bikePrice,setBikePrice] = useState("");
    const [bikeType,setBikeType] = useState("");
    

    const [isSending, setIsSending] = useState(false);

    const [statusMssg,setStatusMssg]=useState({
        show:false,
        mssg:""
    })
  
  const editBikeHandler =async () => {
    if (isSending) return
    setIsSending(true)
    // console.log(bikeName,bikeNumber)

    const message =await adminEditBikeApiCall(id,bikeName,bikeNumber,bikePrice,bikeType);
        
    setStatusMssg({
        show:true,
        mssg:await message
    })
    
    setIsSending(false)
  }

  const apiCallHanlder=async()=>{
      
    const temp = await adminGetBikeApiCall(id)
    // setBikeApiData(await temp);
    setBikeName(await temp.bikeModelName);
    setBikeNumber(await temp.bikeNo)
    setBikePrice(await temp.price)
    setBikeType(await temp.type)
  }

  useEffect(()=>{
      apiCallHanlder()
  },[])
    return (
        <div className="admin_editBike">
             {statusMssg.show&& <div className="alert alert-success custom-alert" role="alert">
                    {statusMssg.mssg}
             </div>}
            <div className="backBtn">
                <Link to="/admin/">&lt;&nbsp;back</Link>
            </div>
            <div className="editBike_bikeInfo">
                <label htmlFor="bikeNumber">Bike Number</label>
                <input type="text" id="bikeNumber"
                 value={bikeNumber}
                 onChange={(e)=>setBikeNumber(e.target.value)}
                required/>
            </div>
            <div className="editBike_bikeInfo">
                <label htmlFor="model">Bike Model</label>
                <input type="text" id="model"
                value={bikeName}
                onChange={(e)=>setBikeName(e.target.value)}
                required/>
            </div>
           
            <div className="editBike_bikeInfo">
                <label htmlFor="price">Bike Price</label>
                <input type="text" id="price"
                value={bikePrice}
                onChange={(e)=>setBikePrice(e.target.value)}
                required/>
            </div>
            <div className="editBike_bikeInfo">
                <label htmlFor="type">Bike Type</label>
                <input type="text" id="type"
                value={bikeType}
                onChange={(e)=>setBikeType(e.target.value)}
                required/>
            </div>
            <div className="editBike_button_container">
                <button className="btn editBike_button"
                onClick={editBikeHandler}
                >Edit Bike
                </button>
            </div>
        </div>
    )
}
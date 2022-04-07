import React, {  useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminAddBikeApiCall, adminEditProfileApiCall, adminProfileApiCall } from "../../../ApiCalls/AdminDashboard";
import "./EditProfile.css"

export default function EditProfile(){

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [mobileNumber,setMobileNumber] = useState("");
    const [companyName,setCompanyName] = useState("");
    const [companyAddress,setCompanyAddress] = useState("");

    const [isSending, setIsSending] = useState(false);

    const [statusMssg,setStatusMssg]=useState({
        show:false,
        mssg:""
    })
    const editProfileHandler = async()=>{
        if(isSending)return;
        setIsSending(true);

        const message = await adminEditProfileApiCall(name,email,mobileNumber,companyName,companyAddress);
        setStatusMssg({
            show:true,
            mssg:await message
        })
        setIsSending(false);
    }
    const apiCallHandler =async()=>{
        const temp = await adminProfileApiCall();
        setName(await temp.sellerName);
        setEmail(await temp.email);
        setMobileNumber(await temp.mobileNumber);
        setCompanyName(await temp.companyName);
        setCompanyAddress(await temp.companyAddress);
    }
  
    useEffect(()=>{
        apiCallHandler();
    },[])

    return (
        <div className="admin_editProfile">
             {statusMssg.show&& <div className="alert alert-success custom-alert" role="alert">
                    {statusMssg.mssg}
             </div>}
            <div className="backBtn">
                <Link to="/admin/profile">&lt;&nbsp;back</Link>
            </div>
            <div className="editProfile">
                <label htmlFor="name">Name</label>
                <input type="text" id="name"
                 value={name}
                 onChange={(e)=>setName(e.target.value)}
                required/>
            </div>
            <div className="editProfile">
                <label htmlFor="email">Email</label>
                <input type="text" id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required/>
            </div>
            <div className="editProfile">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input type="tel" id="mobileNumber"
                value={mobileNumber}
                onChange={(e)=>setMobileNumber(e.target.value)}
                required/>
            </div>
            <div className="editProfile">
                <label htmlFor="companyName">Company Name</label>
                <input type="text" id="companyName"
                value={companyName}
                onChange={(e)=>setCompanyName(e.target.value)}
                required/>
            </div>
            <div className="editProfile">
                <label htmlFor="companyAddress">Company Address</label>
                <input type="text" id="companyAddress"
                value={companyAddress}
                onChange={(e)=>setCompanyAddress(e.target.value)}
                required/>
            </div>
            <div className="editProfile_button_container">
                <button className="btn editProfile_button"
                 onClick={editProfileHandler}
                >Save Changes
                </button>
            </div>
        </div>
    )
}
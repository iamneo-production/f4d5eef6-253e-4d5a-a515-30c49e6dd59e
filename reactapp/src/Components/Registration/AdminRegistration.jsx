import React, {  useState } from "react";
import { registerAdminApiCall } from "../../ApiCalls/AuthDashboard";

import "./Registration.css"

export default function AdminRegistration(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [mobileNumber,setMobileNumber] = useState("");
    const [sellerName,setSellerName] = useState("");
    const [companyName,setCompanyName] = useState("");
    const [companyAddress,setCompanyAddress] = useState("");
    const [companyImageURL,setCompanyImageURL] = useState("");

    const [statusMssg,setStatusMssg]=useState({
        show:false,
        mssg:""
    })
    const registerAdminHandler = async()=>{
      const temp = await registerAdminApiCall(email,password,mobileNumber,sellerName,companyName,companyAddress,companyImageURL);
        setStatusMssg({
            show:true,
            mssg:await temp
        })
    }

    return (
        <div className="registration_container">
             {statusMssg.show&& <div className="alert alert-success custom-alert" role="alert">
                    {statusMssg.mssg}
             </div>}
            <h2 style={{textAlign:'center'}}>Sign Up</h2>
            <div className="registration">
                <label htmlFor="email">Email</label>
                <input type="text" id="email"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                required/>
            </div>
            <div className="registration">
                <label htmlFor="password">Password</label>
                <input type="text" id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required/>
            </div>
            <div className="registration">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input type="tel" id="mobileNumber"
                value={mobileNumber}
                onChange={(e)=>setMobileNumber(e.target.value)}
                required/>
            </div>
            <div className="registration">
                <label htmlFor="sellerName">Seller Name</label>
                <input type="text" id="sellerName"
                value={sellerName}
                onChange={(e)=>setSellerName(e.target.value)}
                required/>
            </div>
            
            <div className="registration">
                <label htmlFor="companyName">Company Name</label>
                <input type="text" id="companyName"
                value={companyName}
                onChange={(e)=>setCompanyName(e.target.value)}
                required/>
            </div>
            
            <div className="registration">
                <label htmlFor="companyImageURl">Company Image URL</label>
                <input type="text" id="companyImageURL"
                value={companyImageURL}
                onChange={(e)=>setCompanyImageURL(e.target.value)}
                required/>
            </div>
            
            <div className="registration">
                <label htmlFor="companyAddress">Company Address</label>
                <input type="text" id="companyAddress"
                value={companyAddress}
                onChange={(e)=>setCompanyAddress(e.target.value)}
                required/>
            </div>
            <div className="registration_button_container">
                <button className="btn addBike_button"
                onClick={registerAdminHandler}
                >Register
                </button>
            </div>
        </div>
    )
}

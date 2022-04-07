import React, {  useState } from "react";
import {registerUserApiCall } from "../../ApiCalls/AuthDashboard";

import "./Registration.css"

export default function UserRegistration(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [mobileNumber,setMobileNumber] = useState("");
    const [userName,setUserName] = useState("");
    const [age,setAge] = useState("");
    
    const [statusMssg,setStatusMssg]=useState({
        show:false,
        mssg:""
    })
    const registerUserHandler = async()=>{
      const temp = await registerUserApiCall(email,password,userName,mobileNumber,age);
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
                <label htmlFor="userName">User Name</label>
                <input type="text" id="userName"
                value={userName}
                onChange={(e)=>setUserName(e.target.value)}
                required/>
            </div>
            <div className="registration">
                <label htmlFor="age">Age</label>
                <input type="number" id="age"
                value={age}
                onChange={(e)=>setAge(e.target.value)}
                required/>
            </div>
            <div className="registration_button_container">
                <button className="btn addBike_button"
                onClick={registerUserHandler}
                >Register
                </button>
            </div>
        </div>
    )
}

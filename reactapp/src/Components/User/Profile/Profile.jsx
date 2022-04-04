import React, { useEffect, useState } from "react"
import "./Profile.css"
import { userProfileApiCall } from "../../../ApiCalls/UserDashboard";
import { Link } from "react-router-dom";

export default function Profile(){
    const [profileDetails,setProfileDetails]=useState({
        email:"",
        username:"",
        mobileNumber:"",
        age:"",
        error:""
    });

    const apiCallHandler =async ()=>{
        const temp = await userProfileApiCall();
        if(temp.length!==0||temp!==undefined){
            setProfileDetails({
                email:await temp.email,
                username:await temp.username,
                mobileNumber:await temp.mobileNumber,
                age:await temp.age,
                error:""
            })
        }
        else{
            setProfileDetails({error:"No user found"})
        }
    }

    useEffect(()=>{
        apiCallHandler();

    },[])

    return (
        <div className="container user_profile">
            <div className="card">
                <div className="card-body">
                    <div className="custom-form">
                        <label htmlFor="username">Username</label>
                        <div id="username">:&nbsp;{profileDetails.username}</div>
                    </div>
                    <div className="custom-form">
                        <label htmlFor="email">Email</label>
                        <div id="email">:&nbsp;{profileDetails.email}</div>
                    </div>
                    <div className="custom-form">
                        <label htmlFor="age">Age</label>
                        <div id="age">:&nbsp;{profileDetails.age}</div>
                    </div>
                    <div className="custom-form">
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <div id="mobileNumber">:&nbsp;{profileDetails.mobileNumber}</div>
                    </div>
                    <Link to="/editProfile" className="btn btn-primary mx-4">Edit profile</Link>
                </div>
            </div>
        </div>
    )
}
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { adminProfileApiCall } from "../../../ApiCalls/AdminDashboard";
import "./Profile.css"

export default function Profile(){
    const [profileData,setProfileData]=useState({})
    const apiCallHandler=async()=>{
        const temp = adminProfileApiCall();
        setProfileData(await temp);
    }

    useEffect(()=>{
        apiCallHandler();
    },[])

    return (
        <div className="container">
            <div className="card">
                <form className="card-body">
                    <div className="card-container">
                       <label htmlFor="">Email</label>
                        <div className="adminDetails">
                        :&nbsp;{profileData.email}
                        </div>
                    </div>
                    <div className="card-container">
                        <label htmlFor="">Seller Name</label>
                        <div className="adminDetails">
                        :&nbsp;{profileData.sellerName}
                        </div>
                        
                    </div>
                    <div className="card-container">
                    <label htmlFor="">Mobile Number</label>
                        <div className="adminDetails">
                        :&nbsp;{profileData.mobileNumber}
                        </div>
                        
                    </div>
                    <div className="card-container">
                    <label htmlFor="">Earnings</label>
                        <div className="adminDetails">
                        :&nbsp;{profileData.earnings}
                        </div>
                        
                    </div>
                    <div className="card-container">
                        <label htmlFor="">Company Address</label>
                        <div className="adminDetails">
                        :&nbsp;{profileData.companyAddress}
                        </div>
                    </div>
                    <div className="card-container">
                        <label htmlFor="">Company Name</label>
                        <div className="adminDetails">
                        :&nbsp;{profileData.companyName}
                        </div>
                    </div>
                    <Link to="/admin/editProfile" className="btn btn-primary">Edit Profile</Link>
                </form>
            </div>
        </div>
    )
}
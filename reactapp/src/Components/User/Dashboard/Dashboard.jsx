import React,{useEffect} from "react";
import "./Dashboard.css"
import Axios from "axios";
import {Link } from "react-router-dom";
import { dashboardApiCall } from "../../../ApiCalls/UserDashboard";

const Dashboard = (props)=>{
   

    useEffect(async ()=>{
     props.setApiData(await dashboardApiCall())
       
    },[]);

    return (
        <div className="container user_dashboard">
            dashboard
            {props.apiData && props.apiData.map((element,index)=>{
                return <div key={index} className="container-fluid my-3 d-flex align-items-center 
            justify-content-evenly company">
                <div className="d-flex justify-content-around w-25 my-3 left">
                    <img src={element.companyImageURL} alt="Not Found" className="company_image" />
                    <div className="company_name">
                        <Link to={'/companyDetails/'+element.id}>{element.companyName}</Link>
                        </div>
                </div>
                <div className="my-3 w-25 text-center middle">
                    <div className="company_address">{element.companyAddress}</div>
                </div>
                <div className="my-3 w-25 right">
                    <div className="company_mobile_number">{element.mobileNumber}</div>
                </div>
            </div>
            })}
        </div>
    )
}

export default Dashboard;
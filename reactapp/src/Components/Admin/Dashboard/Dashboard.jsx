import React, { useEffect,useState } from "react";
import { adminDashboardApiCall } from "../../../ApiCalls/AdminDashboard";
import "./Dashboard.css"

export default function Dashboard(){

    const [dashboardData,setDashboardData]=useState({
        data:[],
        error:''
    })

    const apiCallHanlder=async ()=>{
        const temp = await adminDashboardApiCall();
        setDashboardData({
            data:await temp,
            error:""
        })
    }
    useEffect(()=>{
        apiCallHanlder()

    },[])
    return(
        <div className="admin_dashboard">
            
                {dashboardData.data&&dashboardData.data.map((element,index)=>{
                    return <div className="card" key={index}>
                        <div className="bikeStatus">
                            {element.status}
                        </div>
                        <div className="bikeInfo">
                            <div className="bikeModel">
                                {element.bikeModel}
                            </div>
                             <div className="bikePrice">
                                {element.price}
                            </div>
                        </div>
                        <div className="bikeType">
                            {element.type}
                        </div>
                        <div className="opeartions">
                            <div className="edit">Edit</div>
                            <div className="delete">Delete</div>
                        </div>
                    </div>        
                })}
                
            
        </div>
    )
}
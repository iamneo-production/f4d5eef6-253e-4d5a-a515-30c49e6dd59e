import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { adminDashboardApiCall } from "../../../ApiCalls/AdminDashboard";
import "./Dashboard.css"

export default function Dashboard(){

    const [dashboardData,setDashboardData]=useState({
        data:[],
        error:''
    })

    const [earnings,setEarnings]=useState(0);

    const apiCallHanlder=async ()=>{
        const temp = await adminDashboardApiCall();
        setDashboardData({
            data:await temp,
            earnings:0,
            error:""
        })
        console.log(await dashboardData.data)
        let s=0;
        await temp.forEach((ele)=>{
            if(ele.status==='Booked'){
                console.log(ele.price)
                s+=parseInt(ele.price);
            }
        })
        setEarnings(await s)
        
    }
    useEffect(()=>{
        apiCallHanlder()
        

    },[])
    return(
        <div className="admin_dashboard">
            <div className="leftContainer">
                {dashboardData.data.length!==0?<h1>{dashboardData.data[0].companyName}</h1>:""}
                {dashboardData.data&&dashboardData.data.map((element,index)=>{
                    return <div className="card custom-card" key={index}>
                        {element.status==="Available"?<div className="bikeStatus" style={{background: "#008000"}}>
                            {element.status}
                        </div>:<div className="bikeStatus" style={{background: "#F21B1B"}}>
                                {element.status}
                            </div>}
                        <div className="bikeInfo">
                            <div className="bikeModel my-2">
                               Bike Model&nbsp;:&nbsp; {element.bikeModelName}
                            </div>
                             <div className="bikePrice my-2">
                               Price&nbsp;:&nbsp;{element.price} | per day
                            </div>
                        </div>
                        <div className="bikeType">
                            Type&nbsp;:&nbsp;{element.type}
                        </div>
                        <div className="operations">
                            <div className="edit btn btn-primary mx-4">Edit</div>
                            <div className="delete btn btn-danger mx-4">Delete</div>
                        </div>
                    </div>        
                })}
                
                </div>
                <div className="rightContainer">
                    <div className="earnings">
                        <div className="earningsHeader">
                            Earnings
                        </div>
                        <div className="totalIncome">
                            {earnings}
                        </div>
                    </div>
                    <div className="addBike">
                        <div className="addBikeTitle">
                        Want to add a New Bike
                        </div>
                        <div className="btnContainer">
                        <Link to="/admin/addBike" className="btn custom-Button">
                            Add Bike
                        </Link>
                        </div>
                        
                    </div>

                </div>
        </div>
    )
}
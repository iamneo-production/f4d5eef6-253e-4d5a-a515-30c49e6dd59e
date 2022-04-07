import React,{useEffect,useState} from "react";
import { superAdminGetAllBookingsApiCall} from "../../../ApiCalls/SuperAdminDashboard";
import "./Bookings.css"

export default function Bookings(){
    const [bookingsData,setBookingsData]=useState([]);

    const apiAdminCallHandler=async ()=>{
        const temp=await superAdminGetAllBookingsApiCall();
        setBookingsData(await temp);
        
    }

    useEffect(()=>{
        apiAdminCallHandler()
    },[])
    return(
        <div className="superAdmin_dashboard">
           
           <table className="table table-borderless custom-table">
                <thead>
                    <tr>
                        <th>Admin ID</th>
                        <th>Company Name</th>
                        <th>Bike Model</th>
                        <th>Rent</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingsData&&bookingsData.map((element,index)=>{
                        return <tr key={index}>
                            <td>{element.adminID}</td>
                            <td>{element.companyName}</td>
                            <td>{element.bikeModelName}</td>
                            <td>{element.price}</td>
                            <td>{element.status}</td>
                        </tr>
                    })}
                    
                </tbody>
            </table>
            
            
        </div>
    )
}
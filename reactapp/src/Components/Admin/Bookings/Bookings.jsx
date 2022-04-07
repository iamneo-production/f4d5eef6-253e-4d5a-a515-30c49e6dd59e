import React, { useEffect,useState } from "react"
import { adminGetUserBookingsApiCall } from "../../../ApiCalls/AdminDashboard"
import "./Bookings.css"

export default function Bookings(){
    const [userBookings,setUserBookings]=useState([])

    const apiCallHandler = async()=>{
        const temp = await adminGetUserBookingsApiCall();
        setUserBookings(await temp);
        console.log(await temp)
    }

    useEffect(()=>{
        apiCallHandler()
    },[])

    return(
        <div className="admin_bookings">
            <table className="table table-borderless custom-table">
                <thead>
                    <tr>
                        <th>Bookings ID</th>
                        <th>User ID</th>
                        <th>Bike Model</th>
                        <th>Rent</th>
                    </tr>
                </thead>
                <tbody>
                    {userBookings&&userBookings.map((element,index)=>{
                        return <tr key={index}>
                            <td>{element.id}</td>
                            <td>{element.userID}</td>
                            <td>{element.bikeModelName}</td>
                            <td>{element.bikePrice}</td>
                        </tr>
                    })}
                    
                </tbody>
            </table>
        </div>
    )
}
import React,{useState,useEffect} from 'react';
import { userBookingsApiCall } from '../../../ApiCalls/UserDashboard.js';
import "./Bookings.jsx";

export default function Bookings(){
    const [bookings,setBookings]=useState({
        companyName:"",
        bikeType:"",
        Days:"",
        BikePrice:""
    })
    useEffect(async()=>{
        const temp = await userBookingsApiCall();
        console.log(await temp)
        setBookings({
            companyName:await temp[0].companyName,
            bikeType:await temp[0].bikeStatus,
            Days:"days",
            BikePrice:await temp[0].bikePrice
        })
    },[])

    return(
        <div className="user_bookings">
            bookings
            <div className="card-body">
                <div className="companyName">
                    {bookings.companyName}
                </div>
                <div className="companyName">
                    {bookings.bikeType}
                </div>
                
                <div className="companyName">
                    {bookings.Days}
                </div>
                
                <div className="companyName">
                    {bookings.BikePrice}
                </div>
                
            </div>
        </div>
    )
}
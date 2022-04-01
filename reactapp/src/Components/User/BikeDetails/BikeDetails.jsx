import React,{useState,useEffect} from "react";
import { bikeDetailsApiCall } from "../../../ApiCalls/UserDashboard";
import "./BikeDetails.css";
import {useParams} from "react-router-dom"

export default function BikeDetails(props){
    const {id} = useParams();
    const [bikeDetails,setBikeDetails]=useState({
        bikeNo:"",
        bikePrice:"",
        bikeStatus:"",
        bikeType:""
    });

    useEffect(async()=>{
        const temp = await bikeDetailsApiCall(id);
       setBikeDetails({
           bikeNo:await temp.bikeNo,
           bikePrice:await temp.price,
           bikeStatus:await temp.status,
           bikeType:await temp.type
       },[]);
    })
    return (
        <div className="bikeDetails_container">
            <div className="card">
                <div className="card-body">
                    <div className="bikeNumber">
                       Bike Number:- {bikeDetails.bikeNo}
                       </div>
                    <div className="price">
                        Bike price :- {bikeDetails.bikePrice}
                        </div>
                    <div className="status">
                        Bike Status :- {bikeDetails.bikeStatus}
                        </div>
                    <div className="type">
                        Bike Type :- {bikeDetails.bikeType}
                        </div>
                    <div className="description"></div>
                </div>
            </div>
        </div>
    )
}
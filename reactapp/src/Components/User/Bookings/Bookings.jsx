import React,{useState,useEffect, useCallback} from 'react';
import { unBookBikeApiCall, userBookingsApiCall } from '../../../ApiCalls/UserDashboard.js';
import "./Bookings.jsx";

export default function Bookings(){
    const [bookings,setBookings]=useState({
        bikeID:"",
        companyName:"",
        bikeType:"",
        Days:"",
        BikePrice:"",
        error:""
    })

    const [isSending, setIsSending] = useState(false);

    const [statusMssg,setStatusMssg]=useState({
        show:false,
        mssg:""
    })
  
  const unBookBikeHandler = useCallback(async (bikeID) => {
    // don't send again while we are sending
    if (isSending) return
    // update state
    setIsSending(true)
    // send the actual request
    const mssg =await unBookBikeApiCall(bikeID);
        
    setStatusMssg({
        show:true,
        mssg:await mssg
    })
    // once the request is sent, update state again
    setIsSending(false)
  }, [isSending])


    useEffect(async()=>{
        const temp = await userBookingsApiCall();
        // console.log(await temp)
        if(temp.length!==0){
            console.log(await temp);
            setBookings({
                bikeID:await temp[0].bikeID,
                companyName:await temp[0].companyName,
                bikeType:await temp[0].bikeStatus,
                Days:"days",
                BikePrice:await temp[0].bikePrice,
                error:""
            })
            console.log(await bookings)
        }
        
        else
        setBookings({
            bikeID:"",
            companyName:"",
            bikeType:"",
            Days:"",
            BikePrice:"",
            error:"No bookings found"
        })
        
    },[])

    return(
        <div className="user_bookings">
             {statusMssg.show&& <div class="alert alert-success" role="alert">
                    {statusMssg.mssg}
             </div>}
            {bookings!=="No bookings found"&&bookings.bikeID!=""?<div className="card-body">
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
                <button className="btn btn-primary" disabled={isSending} 
                onClick={()=>unBookBikeHandler(bookings.bikeID)}>UnBook Bike</button>
                
            </div>:<div>No bookings found</div>}
        </div>
    )
}
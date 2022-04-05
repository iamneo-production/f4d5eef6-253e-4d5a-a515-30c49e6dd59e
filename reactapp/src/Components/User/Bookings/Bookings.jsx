import React,{useState,useEffect, useCallback} from 'react';
import { unBookBikeApiCall, userBookingsApiCall } from '../../../ApiCalls/UserDashboard.js';
import "./Bookings.jsx";

export default function Bookings(){
    const [bookings,setBookings]=useState({
        bikesInfo:[],
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
                bikesInfo:await temp,
                error:""
            })
        }
        
        else
        setBookings({
            bikesInfo:[],
            error:"No bookings found"
        })
        
    },[isSending])

    return(
        <div className="user_bookings">
             {statusMssg.show&& <div class="alert alert-success" role="alert">
                    {statusMssg.mssg}
             </div>}
            {bookings.error!=="No bookings found"?
            bookings.bikesInfo&&bookings.bikesInfo.map((element,index)=>{
                return <div key={index} className="card-body">
                <div className="companyName">
                    {element.companyName}
                </div>
                <div className="companyName">
                    {element.bikeModelName}
                </div>
                
                <div className="companyName">
                    {"Days"}
                </div>
                
                <div className="companyName">
                    {element.bikePrice}
                </div>
                <button className="btn btn-primary" disabled={isSending} 
                onClick={()=>unBookBikeHandler(element.bikeID)}>UnBook Bike</button>
                
            </div>
            })
            :<div>No bookings found</div>}
        </div>
    )
}
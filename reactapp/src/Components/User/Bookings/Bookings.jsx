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
    if (isSending) return
    setIsSending(true)
    const mssg =await unBookBikeApiCall(bikeID);
        
    setStatusMssg({
        show:true,
        mssg:await mssg
    })
    
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
             {statusMssg.show&& <div className="alert alert-success" role="alert">
                    {statusMssg.mssg}
             </div>}
             <table className="table table-borderless custom-table">
                 <thead>
                     <tr>
                         <th>Company Name</th>
                         <th>Bike Number</th>
                         <th>Bike Model</th>
                         <th>Rent</th>
                         <th>Unbook Bike</th>
                     </tr>
                 </thead>
                 <tbody>
            {bookings.error!=="No bookings found"?
            bookings.bikesInfo&&bookings.bikesInfo.map((element,index)=>{
                return <tr key={index} >
                <td >
                    {element.companyName}
                </td>
                <td >
                    {element.bikeModelName}
                </td>
                
                <td >
                    {"Days"}
                </td>
                
                <td >
                    {element.bikePrice}
                </td>
                <td><button className="btn btn-primary" disabled={isSending} 
                onClick={()=>unBookBikeHandler(element.bikeID)}>UnBook Bike</button>
                </td>
                
            </tr>
            
            })
            :<div>No bookings found</div>}
            </tbody>
        </table>
        </div>
    )
}

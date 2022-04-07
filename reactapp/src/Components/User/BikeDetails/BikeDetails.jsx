import React,{useState,useEffect,useCallback} from "react";
import { bikeDetailsApiCall, bookBikeApiCall } from "../../../ApiCalls/UserDashboard";
import "./BikeDetails.css";
import {useParams} from "react-router-dom"

export default function BikeDetails(props){
    const {id} = useParams();
    const [bikeDetails,setBikeDetails]=useState({
        bikeID:"",
        bikeNo:"",
        bikePrice:"",
        bikeStatus:"",
        bikeType:""
    });

    const [statusMssg,setStatusMssg]=useState({
        show:false,
        mssg:""
    })

  const [isSending, setIsSending] = useState(false);
  
  const bookBikeHandler = useCallback(async (bikeID) => {
    // don't send again while we are sending
    if (isSending) return
    // update state
    setIsSending(true)
    // send the actual request
    const mssg =await bookBikeApiCall(bikeID);
        
    setStatusMssg({
        show:true,
        mssg:await mssg
    })
    // once the request is sent, update state again
    setIsSending(false)
  }, [isSending])

    useEffect(async()=>{
       
            const temp = await bikeDetailsApiCall(id);
            setBikeDetails({
                bikeID:await temp.bikeID,
                bikeNo:await temp.bikeNo,
                bikePrice:await temp.price,
                bikeStatus:await temp.status,
                bikeType:await temp.type
            });
           
    },[])
    return (
        <div className="bikeDetails_container">
           {statusMssg.show&& <div class="alert alert-success" role="alert">
                    {statusMssg.mssg}
             </div>}
            <div className="card">
                <div className="card-body">
                    <div className="bikeID">
                        Bike ID :- {bikeDetails.bikeID}
                    </div>
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
                <button className="btn btn-primary" disabled={isSending} 
                onClick={()=>bookBikeHandler(bikeDetails.bikeID)}>Book Bike</button>
                
                
            </div>
        </div>
    )
}
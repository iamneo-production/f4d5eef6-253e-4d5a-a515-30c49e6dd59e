import React, { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { userEditProfileApiCall, userProfileApiCall } from "../../../ApiCalls/UserDashboard";
import "./EditProfile.css"

export default function EditProfile(){

    const [profileDetails,setProfileDetails]=useState({
        id:"",
        email:"",
        username:"",
        mobileNumber:"",
        age:"",
        error:""
    });
 
    const [username,setUsername]=useState("")

    const [statusMssg,setStatusMssg]=useState({
        show:false,
        mssg:""
    })
    const [isSending, setIsSending] = useState(false);

    const editProfileHandler = useCallback(async (event,bikeID)=>{
        event.preventDefault();
        // don't send again while we are sending
        if (isSending) return
        // update state
        setIsSending(true)
        // send the actual request
        console.log(profileDetails)
       const mssg= await userEditProfileApiCall(bikeID,profileDetails);
       setStatusMssg({
        show:true,
        mssg:await mssg
    })
    setIsSending(false)
    },[isSending])


    const apiCallHandler =async ()=>{
        const temp = await userProfileApiCall();
        if(temp.length!==0||temp!==undefined){
            setProfileDetails({
                id:await temp.id,
                email:await temp.email,
                username:await temp.username,
                mobileNumber:await temp.mobileNumber,
                age:await temp.age,
                error:""
            })
        }
        else{
            setProfileDetails({error:"No user found"})
        }
    }
    const setUsernameHandler=(e)=>{
        setProfileDetails({
                id:profileDetails.id,
                email:profileDetails.email,
                username:e.target.value,
                mobileNumber:profileDetails.mobileNumber,
                age:profileDetails.age,
                error:"",
        })
        console.log(profileDetails.username)
    }
    const setEmailHandler=(e)=>{
        setProfileDetails({
            id:profileDetails.id,
            email:e.target.value,
            username:profileDetails.username,
            mobileNumber:profileDetails.mobileNumber,
            age:profileDetails.age,
            error:"",
    })
    }
    const setAgeHandler=(e)=>{
        setProfileDetails({
            id:profileDetails.id,
            email:profileDetails.email,
            username:profileDetails.username,
            mobileNumber:profileDetails.mobileNumber,
            age:e.target.value,
            error:"",
    })
    }
    const setMobileNumberHandler=(e)=>{
        setProfileDetails({
            id:profileDetails.id,
            email:profileDetails.email,
            username:profileDetails.username,
            mobileNumber:e.target.value,
            age:profileDetails.age,
            error:"",
    })
    }
    useEffect(()=>{
        apiCallHandler();

    },[])

    return (
        <form className="user_editProfile">
            {statusMssg.show&& <div class="alert alert-success" role="alert">
                    {statusMssg.mssg}
             </div>}
            <div className="backButton">
            <Link to="/profile"><span>&lt;</span>&nbsp;back</Link>
            </div>
            <div className="inputContainer">
                <label htmlFor="username">Name</label>
                <input type="text" placeholder="Enter your name" 
                value={profileDetails.username} 
                onChange={setUsernameHandler}/>
            </div>
            <div className="inputContainer">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" 
                value={profileDetails.email} 
                onChange={setEmailHandler}/>
            </div>
            
            <div className="inputContainer">
                <label htmlFor="age">Age</label>
                <input type="number" id="age" placeholder="Enter your age" 
                value={profileDetails.age}
                onChange={setAgeHandler}/>
            </div>
            <div className="inputContainer">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input type="tel" id="mobileNumber" placeholder="Enter your mobile number" 
                value={profileDetails.mobileNumber}
                onChange={setMobileNumberHandler}/>
            </div>
            <form className="inputButton">
            <button onClick={(e)=>editProfileHandler(e,profileDetails.id)}>Save Changes</button>
            </form>
        </form>
    )
}
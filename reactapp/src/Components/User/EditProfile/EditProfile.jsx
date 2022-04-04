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
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [age,setAge]=useState("");
    const [mobileNumber,setMobileNumber]=useState("");


    const [statusMssg,setStatusMssg]=useState({
        show:false,
        mssg:""
    })

    const editProfileHandler = useCallback(async (bikeID)=>{
       const mssg= await userEditProfileApiCall(bikeID,username,email,age,mobileNumber);
       setStatusMssg({
        show:true,
        mssg:await mssg
    })
    },[])


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
            setUsername(profileDetails.username);
            setEmail(profileDetails.email);
            setAge(profileDetails.age);
            setMobileNumber(profileDetails.mobileNumber);
        }
        else{
            setProfileDetails({error:"No user found"})
        }
    }
    const setUsernameHandler=(e)=>{
        setUsername(e.target.value);
        console.log(username)
    }
    const setEmailHandler=(e)=>{
        setEmail(e.target.value)
    }
    const setAgeHandler=(e)=>{
        setAge(e.target.value)
    }
    const setMobileNumberHandler=(e)=>{
        setMobileNumber(e.target.value)
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
                value={username} 
                onChange={setUsernameHandler}/>
            </div>
            <div className="inputContainer">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" 
                value={email} 
                onChange={setEmailHandler}/>
            </div>
            
            <div className="inputContainer">
                <label htmlFor="age">Age</label>
                <input type="number" id="age" placeholder="Enter your age" value={age} onChange={setAgeHandler}/>
            </div>
            <div className="inputContainer">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input type="tel" id="mobileNumber" placeholder="Enter your mobile number" 
                value={mobileNumber}
                onChange={setMobileNumberHandler}/>
            </div>
            <div className="inputButton">
            <button onClick={()=>editProfileHandler(profileDetails.id)}>Save Changes</button>
            </div>
        </form>
    )
}
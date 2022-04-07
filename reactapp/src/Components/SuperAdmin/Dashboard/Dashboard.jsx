import React,{useEffect,useState} from "react";
import { superAdminDeleteAdminsApiCall, superAdminDeleteUsersApiCall, superAdminGetAdminsApiCall,superAdminGetUsersApiCall } from "../../../ApiCalls/SuperAdminDashboard";
import "./Dashboard.css"

export default function Dashboard(){
    const [adminData,setAdminData]=useState([]);
    const [userData,setUserData]=useState([]);

    const [switchBtn,setSwitchBtn]=useState(false);
    const [styleAdminBtn,setStyleAdminBtn]=useState({});
    const [styleUserBtn,setStyleUserBtn]=useState({});

    const [statusMssg,setStatusMssg]=useState({
        show:false,
        mssg:""
    })
    const [isSendingAdminBtn,setIsSendingAdminBtn]=useState(false)
    const [isSendingUserBtn,setIsSendingUserBtn]=useState(false)

    const deleteAdminHandler = async(adminID)=>{
        if(isSendingAdminBtn)return;
        setIsSendingAdminBtn(true)
        const message=await superAdminDeleteAdminsApiCall(adminID)
        setStatusMssg({
            show:true,
            mssg:await message
        })
        setIsSendingAdminBtn(false)
    }

    const deleteUserHandler = async(userID)=>{
        if(isSendingUserBtn)return;
        setIsSendingUserBtn(true)
        const message=await superAdminDeleteUsersApiCall(userID)
        setStatusMssg({
            show:true,
            mssg:await message
        })
        setIsSendingUserBtn(false)
    }

    const apiAdminCallHandler=async ()=>{
        const temp=await superAdminGetAdminsApiCall();
        setAdminData(await temp);
        setSwitchBtn(false);
        setStyleAdminBtn({
            "backgroundColor":"#ff4444",
            "color":"white",
            "borderTopLeftRadius":"12px",
            "borderBottomLeftRadius":"12px"
        })
        setStyleUserBtn({
            "backgroundColor":"#F2F2F2",
            "color":"black",
            "borderTopRightRadius":"12px",
            "borderBottomRightRadius":"12px"
        })
    }

    const apiUserCallHandler = async()=>{
        const temp=await superAdminGetUsersApiCall();
        setUserData(await temp);
        setSwitchBtn(true)
        setStyleUserBtn({
            "backgroundColor":"#ff4444",
            "color":"white",
            "borderTopRightRadius":"12px",
            "borderBottomRightRadius":"12px"
        })
        setStyleAdminBtn({
            "backgroundColor":"#F2F2F2",
            "color":"black",
            "borderTopLeftRadius":"12px",
            "borderBottomLeftRadius":"12px"
        })
    }

    useEffect(()=>{
        apiAdminCallHandler()
    },[isSendingAdminBtn,isSendingUserBtn])
    return(
        <div className="superAdmin_dashboard">
            {statusMssg.show&& <div className="alert alert-success" role="alert">
                    {statusMssg.mssg}
             </div>}
             <div className="superAdmin_switch">
                 <div className="getAdmins" id="adminSwitch" style={styleAdminBtn} onClick={apiAdminCallHandler}>Admins</div>
                 <div className="getUsers" id="userSwitch" style={styleUserBtn} onClick={apiUserCallHandler}>Users</div>
             </div>
            {!switchBtn&&adminData&&adminData.map((element,index)=>{
                return <div className="card d-flex flex-row justify-content-evenly align-items-center custom-superAdminCard" key={index}>
                            <div className="adminName">{element.sellerName}</div>
                            <div className="companyName">{element.companyName}</div>
                            <div className="companyAddress">{element.companyAddress}</div>
                            <div className="mobileNumber">{element.mobileNumber}</div>
                            <button className="btn btn-danger" 
                            onClick={()=>deleteAdminHandler(element.id)}
                            >Delete</button>
                        </div>
            })}
            {switchBtn&&userData&&userData.map((element,index)=>{
                return <div className="card d-flex flex-row justify-content-evenly align-items-center custom-superAdminCard" key={index}>
                            <div className="userName">{element.username}</div>
                            <div className="userEmail">{element.email}</div>
                            <div className="mobileNumber">{element.mobileNumber}</div>
                            <div className="userAge">{element.age}</div>
                            <button className="btn btn-danger" 
                            onClick={()=>deleteUserHandler(element.id)}
                            >Delete</button>
                        </div>
            })}
            
        </div>
    )
}
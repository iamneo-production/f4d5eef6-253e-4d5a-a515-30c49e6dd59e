import React,{useEffect,useState} from 'react';
import "./CompanyDetails.css"
import {Link,useParams } from "react-router-dom";
import { companyDetailsApiCall, dashboardApiCall } from '../../../ApiCalls/UserDashboard';

export default function CompanyDetails(props){
    const {id}= useParams();
    const [bikes,setBikes]=useState([]);
    const [adminData,setAdminData] = useState({
        companyName:"",
        companyAddress:"",
        mobileNumber:""
    });

    useEffect(async()=>{
        setBikes(await companyDetailsApiCall(id));
        let adminDataFromApi = await dashboardApiCall()
        let temp =await adminDataFromApi.filter(admin=>{return admin.id===parseInt(id)})
        console.log(temp)
        setAdminData({
            companyName:await temp[0].companyName,
            companyAddress:await temp[0].companyAddress,
            mobileNumber:await temp[0].mobileNumber
        });
    },[]);

    return (
        <div className="companyDetails_container">
            <div className="container my-2 mx-auto adminData">
                <div>Company Name :- {adminData.companyName}</div>
                <div>Company Address :- {adminData.companyAddress}</div>
                <div>Company Mobile Number :- {adminData.mobileNumber}</div>
            </div>

            {bikes && bikes.map((element,index)=>{
                return<Link className="custom-container" key={index} to={"/bikeDetails/"+element.bikeID} style={{width:'fit-content'}}> 
                <div  className="container-fluid my-3 d-flex align-items-center justify-content-evenly company">
                    <div className="d-flex justify-content-around w-25 my-3 left">
                       <div>Bike Model&nbsp;:&nbsp;{element.bikeModelName}</div>
                        
                    </div>
                    <div className="my-3 w-25 text-center middle">
                        <div>{element.price}</div>
                    </div>
                    <div className="my-3 w-25 right">
                        <div>{element.type}</div>
                    </div>
                    <div className="my-3 w-25 right">
                         <div style={{color:element.status.includes('Booked')?'red':'green'}}>{element.status}</div>
                    </div>
                    
                </div>
                </Link>
            })}
            {!bikes&&<div>No Bikes are registered by this company</div>}
        </div>
    )
}

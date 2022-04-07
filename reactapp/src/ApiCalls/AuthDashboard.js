import axios from "axios";

const season_url='https://8080-eabfedcfdeaccdfbbdbecfcbbdeadbfdcfe.examlyiopb.examly.io';


export const registerAdminApiCall = async(email,password,mobileNumber,sellerName,companyName,companyAddress,companyImageURL)=>{
   const adminData={
       email:await email,
       password:await password,
       mobileNumber:await mobileNumber,
       sellerName:await sellerName,
       companyName:await companyName,
       companyImageURL:await companyImageURL,
       companyAddress:await companyAddress,
   }
   console.log(adminData)
    const data = await axios.post(season_url+"/authAdmin/signup",adminData,{
        headers:{
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    })

    return data.data;
}

export const registerUserApiCall = async(email,password,userName,mobileNumber,age)=>{
    const userData={
        email:await email,
        password:await password,
        username:await userName,
        mobileNumber:await mobileNumber,
        age:await age,
        
    }
    console.log(userData)
     const data = await axios.post(season_url+"/authUser/signup",userData,{
         headers:{
             "Accept-Language":"en",
             "Content-Type":"application/json",
             "Access-Control-Allow-Origins":"*",
         }
     })
 
     return data.data;
 }

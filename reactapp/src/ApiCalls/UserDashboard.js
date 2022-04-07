import axios from "axios";

const usernameCredentials = "subhodip12112000@gmail.com";
const passwordCredentials = "Subhodip@123"
const token = Buffer.from(`${usernameCredentials}:${passwordCredentials}`, 'utf8').toString('base64')
console.log(token)
const payload={
    season_url : 'https://8080-eabfedcfdeaccdfbbdbecfcbbdeadbfdcfe.examlyiopb.examly.io/user',
    
        headers:{
            "Authorization":`Basic ${token}`,
            "Cache-Control":"no-cache",
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    
}

export const dashboardApiCall =async ()=>{
    

    const data =await axios.get(payload.season_url+"/dashboard",{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    });
    
    return  data.data;
}    

export const companyDetailsApiCall =async (id)=>{

    const data =await axios.get(payload.season_url+"/bikes/"+parseInt(id),{
        headers:{
            "Authorization":`Basic ${token}`,
            "Cache-Control":"no-cache",
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    });
   return data.data;
}    

export const bikeDetailsApiCall =async (bikeId)=>{
    
    const data =await axios.get(payload.season_url+'/bikeDetails/'+parseInt(bikeId),{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    });
   return data.data;
}    

export const bookBikeApiCall =async (bikeId)=>{
    console.log(bikeId)

    const data =await axios.post(payload.season_url+'/bookBike/'+parseInt(bikeId),{},{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    });
    console.log(data.data+" "+bikeId)
   return data.data;
}   

export const userBookingsApiCall =async ()=>{

    const data =await axios.get(payload.season_url+"/bookings",{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    });
   return data.data;
}

export const unBookBikeApiCall =async (bikeId)=>{
    console.log(bikeId)
    const data =await axios.post(payload.season_url+'/unBookBike/'+parseInt(bikeId),{},{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    });
    console.log(data.data+" "+bikeId)
   return data.data;
}

export const userProfileApiCall =async ()=>{
    
    const data =await axios.get(payload.season_url+"/profile",{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    });
   return data.data;
}
export const userEditProfileApiCall =async (username,email,age,mobileNumber)=>{
    const userInfo={
        username:username,
        email:email,
        age:age,
        mobileNumber:mobileNumber
    }
    console.log(userInfo)
    const data =await axios.post(payload.season_url+'/editProfile',userInfo,{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    });
   return data.data;
}
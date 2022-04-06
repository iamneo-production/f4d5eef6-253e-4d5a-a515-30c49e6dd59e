import axios from "axios";

const usernameCredentials = "admin1@gmail.com";
const passwordCredentials = "Admin@123"
const token = Buffer.from(`${usernameCredentials}:${passwordCredentials}`, 'utf8').toString('base64')
console.log(token)
const season_url='https://8080-eabfedcfdeaccdfbbdbecfcbbdeadbfdcfe.examlyiopb.examly.io/admin';

export const adminProfileApiCall=async()=>{
    const data = await axios.get(season_url+"/profile",{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    })
    return data.data;
} 

export const adminDashboardApiCall=async()=>{
    const data = await axios.get(season_url+"/",{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    })
    return data.data;
} 

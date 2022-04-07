import axios from "axios";

const usernameCredentials = "super@gmail.com";
const passwordCredentials = "1234"
const token = Buffer.from(`${usernameCredentials}:${passwordCredentials}`, 'utf8').toString('base64')
console.log(token)
const season_url='https://8080-eabfedcfdeaccdfbbdbecfcbbdeadbfdcfe.examlyiopb.examly.io/superAdmin';

export const superAdminGetAdminsApiCall = async()=>{
    const data = await axios.get(season_url+"/getAdmins",{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    })

    return data.data;
}
export const superAdminDeleteAdminsApiCall = async(adminID)=>{
    const data = await axios.delete(season_url+"/deleteAdmin/"+parseInt(adminID),{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    })

    return data.data;
}

export const superAdminGetUsersApiCall = async()=>{
    const data = await axios.get(season_url+"/getUsers",{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    })

    return data.data;
}

export const superAdminDeleteUsersApiCall = async(userID)=>{
    const data = await axios.delete(season_url+"/deleteUser/"+parseInt(userID),{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    })

    return data.data;
}

export const superAdminGetAllBookingsApiCall = async()=>{
    const data = await axios.get(season_url+"/getBookings",{
        headers:{
            "Authorization":`Basic ${token}`,
            "Accept-Language":"en",
            "Content-Type":"application/json",
            "Access-Control-Allow-Origins":"*",
        }
    })

    return data.data;
}

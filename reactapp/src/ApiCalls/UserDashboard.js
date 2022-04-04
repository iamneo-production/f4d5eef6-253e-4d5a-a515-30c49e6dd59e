import axios from "axios";

export const dashboardApiCall =async ()=>{
    const payload={
        season_url : 'https://8080-eabfedcfdeaccdfbbdbecfcbbdeadbfdcfe.examlyiopb.examly.io/user/dashboard',
        authentication:{
            auth:{
                username:"subhodip@gmail.com",
                password:"Subhodip@123"
            }
        }
    }

    const data =await axios.get(payload.season_url,payload.authentication);
    
    return  data.data;
}    

export const companyDetailsApiCall =async (id)=>{
    const payload={
        season_url : 'https://8080-eabfedcfdeaccdfbbdbecfcbbdeadbfdcfe.examlyiopb.examly.io/user/bikes/'+parseInt(id),
        authentication:{
            auth:{
                username:"subhodip@gmail.com",
                password:"Subhodip@123"
            }
        }
    }

    const data =await axios.get(payload.season_url,payload.authentication);
   return data.data;
}    

export const bikeDetailsApiCall =async (bikeId)=>{
    const payload={
        season_url : 'https://8080-eabfedcfdeaccdfbbdbecfcbbdeadbfdcfe.examlyiopb.examly.io/user/bikeDetails/'+parseInt(bikeId),
        authentication:{
            auth:{
                username:"subhodip@gmail.com",
                password:"Subhodip@123"
            }
        }
    }

    const data =await axios.get(payload.season_url,payload.authentication);
   return data.data;
}    

export const bookBikeApiCall =async (bikeId)=>{
    console.log(bikeId)
    const payload={
        season_url : 'https://8080-eabfedcfdeaccdfbbdbecfcbbdeadbfdcfe.examlyiopb.examly.io/user/bookBike/'+parseInt(bikeId),
        authentication:{
            auth:{
                username:"subhodip@gmail.com",
                password:"Subhodip@123"
            }
        },
    }

    const data =await axios.post(payload.season_url,{},payload.authentication);
    console.log(data.data+" "+bikeId)
   return data.data;
}   

export const userBookingsApiCall =async ()=>{
    const payload={
        season_url : 'https://8080-eabfedcfdeaccdfbbdbecfcbbdeadbfdcfe.examlyiopb.examly.io/user/bookings/',
        authentication:{
            auth:{
                username:"subhodip@gmail.com",
                password:"Subhodip@123"
            }
        }
    }

    const data =await axios.get(payload.season_url,payload.authentication);
   return data.data;
}

export const unBookBikeApiCall =async (bikeId)=>{
    console.log(bikeId)
    const payload={
        season_url : 'https://8080-eabfedcfdeaccdfbbdbecfcbbdeadbfdcfe.examlyiopb.examly.io/user/unBookBike/'+parseInt(bikeId),
        authentication:{
            auth:{
                username:"subhodip@gmail.com",
                password:"Subhodip@123"
            }
        },
    }

    const data =await axios.post(payload.season_url,{},payload.authentication);
    console.log(data.data+" "+bikeId)
   return data.data;
}

export const userProfileApiCall =async ()=>{
    const payload={
        season_url : 'https://8080-eabfedcfdeaccdfbbdbecfcbbdeadbfdcfe.examlyiopb.examly.io/user/profile/',
        authentication:{
            auth:{
                username:"subhodip@gmail.com",
                password:"Subhodip@123"
            }
        }
    }

    const data =await axios.get(payload.season_url,payload.authentication);
   return data.data;
}
export const userEditProfileApiCall =async (bikeID,username,email,age,mobileNumber)=>{
    const payload={
        season_url : 'https://8080-eabfedcfdeaccdfbbdbecfcbbdeadbfdcfe.examlyiopb.examly.io/user/eidtProfile/'+parseInt(bikeID),
        authentication:{
            auth:{
                username:"subhodip@gmail.com",
                password:"Subhodip@123"
            }
        },
        body:{
            email:email,
            username:username,
            mobileNumber:mobileNumber,
            age:age
        }
    }

    const data =await axios.get(payload.season_url,payload.body,payload.authentication);
   return data.data;
}
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
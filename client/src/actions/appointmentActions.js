import axios from "axios";
import { GET_ERRORS } from "./types";
// eslint-disable-next-line no-unused-vars
import { GET_VACCINATION_RECORDS } from "./types";
// eslint-disable-next-line no-unused-vars
import setAuthToken from "../utils/setAuthToken";


// newApoointmet
export const newAppointment = (vaccinationData, history) => dispatch => {
  axios
    .post("/api/vaccinations/appointments", vaccinationData, { headers: { Authorization:localStorage.getItem('jwtToken') } })
    .then(res => history.push("/dashboard")).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// export const getAppointmentByamka = async data =>   {
//  //console.log(data)
//  let data1 ="2";
//  let a = await axios
//     .post("/api/vaccinations/dashboard", data)
//     .then(res => {
//       //console.log(res.data.records[0].firstName);
//       //dispatch(setAppointment(data)); 
//       //return { 
//         //type: GET_VACCINATION_RECORDS,
//        return res.data.records[0];
        
//       //};
//     })

    
//     return a
// };

// export const  getAppointmentByamka = async (data) =>  {

//   const response = await axios({
//     method: "post",
//     url: "/api/vaccinations/dashboard",
//     data
//   });


//   return response.data.records[0].firstName;
// };

// export const getAppointmentByamka = data =>   {
//   console.log(data)
//   axios
//     .get("/api/vaccinations/dashboard", {data: {data}})
//     .then(res => {
//       console.log(res.data);
//       const { data } = res.data
//       //dispatch(setAppointment(data)); 
//       //return { 
//         //type: GET_VACCINATION_RECORDS,
//         return data 
//       //};
//     })
// };


export const getAppointmentByamka = async (reqData) => {

   let res = await axios({
    method: 'get',
    url: '/api/vaccinations/dashboard',
    params: reqData,
    validateStatus: (status) => {
      return true; 
    },
  }).catch(error => {
      console.log(error);
  }).then(response => {
    return response.data.records
  })

  console.log(res);
  return res;

};




// export const setAppointment = data => {
//   return { 
//     type: GET_VACCINATION_RECORDS,
//     payload: data 
//   };
// };

// export const sendToken= ()=>{
// axios.post('/api/vaccinations/appointments',{ headers: { Authorization:localStorage.getItem('jwtToken') } })
//             .then(response=> console.log(response))
//             .catch(error => console.log(error));
// }
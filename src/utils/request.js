import axios from "axios";
const Service=axios.create({
    baseURL:"http://localhost:8080",
})
Service.interceptors.response.use((res)=>{
    res=res.data
    return res
})
// Service.interceptors.request.use((req)=>{
//         if(localStorage.getItem('user')){
//             const {token}=JSON.parse(localStorage.getItem('user'));
//             if(req.params){
//                 req.params.token=token
//             }
         

//         }
//         return req
// })
export default Service
import axios from "axios";
const Service=axios.create({
    // baseURL:"http://localhost:8080",//production
    baseURL:'http://127.0.0.1:4523/m1/1944697-0-default',//mock 的development

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
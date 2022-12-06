import router from "./index";
import store  from "../store/index";
import {Message} from "element-ui"
router.beforeEach((to,from,next)=>{
    console.log('from',from.path,'to',to.path,'to.meta',to.meta);
    const userInfo=localStorage.getItem('user');
    if(userInfo){
        console.log(1);
     const {role}=JSON.parse(userInfo);
     console.log(role,'role');
     if(to.path=='/login'){
        next();
     }
     if(to.meta.manage){
        if(role!=2){
            Message({
                message:'无管理员权限'
            })
            // next('/trainTickt')
            // next()
        }
        else{
            console.log(3);
            next()
        }
     }
     else{
        next()
     }
   
    }
    else{
        if(to.path=='/login'){
            console.log(2);
            next()
        }
        else{
            Message({
                message:'未登录'
            })
            next("/login")
        }
       
    }
})
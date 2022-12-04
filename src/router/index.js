import Vue from 'vue'
import VueRouter from "vue-router";
import {Message} from "element-ui"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component:()=>import('../views/layout/index.vue'),
    redirect:'/trainTickt',
    children:[
      {
        path: '/trainTickt',
        name: 'trainTickt',
        component:()=>import('../views/train-search/train-search.vue')
      },
      {
        path: '/highSearch',
        name: 'highSearch',
        component:()=>import('../views/high-search/high-search.vue')
      },
      {
        path: '/stationManage',
        name: 'stationManage',
        component:()=>import('../views/station/station.vue'),
        meta:true
      },
      {
        path: '/stationList',
        name: 'stationList',
        component:()=>import('../views/station/stationList.vue'),
        meta:true
      },
      {
        path: '/trainManage',
        name: 'trainMange',
        component:()=>import('../views/train/train.vue'),
        meta:true
      },
      {
        path: '/trainList',
        name: 'trainList',
        component:()=>import('../views/train/trainList.vue'),
        meta:true
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component:()=>import('../views/login/login.vue')
  },
 
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to,from,next)=>{
//   const userInfo=localStorage.getItem('user')
// if(userInfo){
//   // const {role}=JSON.parse(userInfo);
//   // if(to.path=='/login'){
//   //   next()
//   // }
//   // else{
//   //   if(to.meta){
//   //     if(role==2){
//   //       next()
//   //     }
//   //     else{
//   //       Message({
//   //         message:'无管理员权限'
//   //       })
//   //       next('/trainTickt')
//   //     }
//   //   }
//   //   else{
//   //     next()
//   //   }
//   // }
//   next()
// }
// else{
//   next('/login')
// }
  
  
 
  
    
  
// })
export default router

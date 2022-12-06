import Service from "../utils/request"
//登录
export function login(params){
    return Service({
        url:'/login',
        method:'post',
        data:params
    })
}
//退出登录
export function logout (params){
    return Service({
        url:'/logout',
        method:'get',
        params
    })
}
//城市查询
export  function getCity(){
    return  Service({
        url:'/trans/city',
        method:'get'
    })
}
//获取单个站点信息
export function getSoloStation(id){
    return Service({
        url:'/station/'+id,
        method:'get'
    })
}
//站点编辑或者新建
export function createOrEditStation(params){
    return Service({
        url:'/station/edit',
        method:'post',
        data:params
    })
}
//获取站点列表
export function getStationList(){
    return Service({
        url:'station/list',
        method:'get',
        
    })
}
//站点删除
export function deleteStation(id){
    return Service({
        url:'/station/del/'+id,
        method:'get'
    })
}
//获取始发站点和终点站的所有路线
export function getAllRoutes(startId,endId){
    return Service({
        url:`/station/getPath/${startId}-${endId}`,
        method:'get'
    })
}
//车次编辑或者新建
export function createRoute(params){
    return Service({
        url:'/trans/edit',
        method:'post',
        data:params

    })
}
//车次删除
export function deleteRoute(id){
    return Service({
        url:`/trans/del/${id}`,
        method:'get'
    })
}
//获取所有车次列表
export function getTrainList(){
    return Service({
        url:'/trans/list',
        method:'get'
    })
}
//获取单个车次的信息
export function getSoloRoute(id){
    return Service({
        url:`/trans/${id}`
    })
}
//车次查询
export function serachTrain(params){
    return Service({
        url:'/trans/query/direct',
        method:'post',
        data:params
    })
}
//非直达车次查询
export function indirect(params){
    return Service({
        url:'/trans/query/indirect',
        method:'post',
        data:params
    })
}
 export const getTime=(t1,t2)=>{
 let time1=new Date(t1);
 let time2=new Date(t2);
//  let seconds=parseInt(time2-time1)/1000

 let minute=parseInt((time2-time1)/1000/60)%60;
 if(minute<10){
    minute='0'+minute;
 }
 let hours=parseInt((time2-time1)/1000/60/60)
 return hours+':'+minute
}
export const formatTime=(t)=>{
    let time=new Date(t);
    let hours=time.getHours();
    let minute=time.getMinutes();
    if(hours<10){
        hours= '0'+hours;
    }
    if(minute<10){
        minute='0'+minute;
    }
    return ''+hours+':'+minute;
}
export const formatDate=(t)=>{
    let time=new Date(t);
    let hours=time.getHours();
    let minute=time.getMinutes();
    
    return ''+hours+'小时'+minute+'分钟';
}
export const formatAllTime=(t1,t2)=>{
    let time1=new Date(t1);
    let time2=new Date(t2);
    let hours=parseInt((time2-time1)/1000/60/60)
    let minute=parseInt((time2-time1)/1000/60)%60;
    return ''+hours+'小时'+minute+'分钟';
}
export const formatDetailTime=(t)=>{
        const str=t.replace('T',' ')+':00';
        return str;
}
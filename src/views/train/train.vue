<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" label-width="100px">
       <div class="all">
         <div class="msg">
          <div class="base">
           <div><span>新建车次信息</span></div>
             <!-- <el-form-item label="车次Id">
              <el-input v-model="form.transId"></el-input>
            </el-form-item> -->
            <el-form-item label="车次名">
              <el-input v-model="form.transName"></el-input>
            </el-form-item>
            
          </div>
          <div class="seat">
           <div><span>设置座位数量</span></div>
             <el-form-item label="商务座">
              <el-input v-model="form.seats.businessSeat"></el-input>
            </el-form-item>
             <el-form-item label="一等座">
              <el-input v-model="form.seats.firstClassSeat"></el-input>
            </el-form-item>
              <el-form-item label="二等座">
              <el-input v-model="form.seats.secondClassSeat"></el-input>
            </el-form-item>
              <el-form-item label="无座">
              <el-input v-model="form.seats.noSeat"></el-input>
            </el-form-item>
          
          </div>
          <div class="startStation">
            <div><span>起始站点</span></div>
            <el-form-item label="站点Id">
              <el-input v-model="form.stations.startStation.stationId"></el-input>
            </el-form-item>
            <el-form-item label="站点名">
              <el-input v-model="form.stations.startStation.stationName"></el-input>
            </el-form-item>
            <el-form-item label="站点城市">
              <el-input v-model="form.stations.startStation.city"></el-input>
            </el-form-item>
            <el-form-item label="出发时间">
              <el-input v-model="form.stations.startStation.startTime" type="datetime-local"></el-input>
            </el-form-item>
          </div>
          <div class="endStation">
            <div><span>目的站点</span></div>
            <el-form-item label="站点Id">
              <el-input v-model="form.stations.endStation.stationId"></el-input>
            </el-form-item>
            <el-form-item label="站点名">
              <el-input v-model="form.stations.endStation.stationName"></el-input>
            </el-form-item>
            <el-form-item label="站点城市">
              <el-input v-model="form.stations.endStation.city"></el-input>
            </el-form-item>
            <el-form-item label="到达时间">
              <el-input v-model="form.stations.endStation.arriveTime" type="datetime-local"></el-input>
            </el-form-item>
          </div>
         <div class="route">
            <div><span>途径站点</span></div>
          <div class="routeItem">
            <i class="el-icon-arrow-left" @click="sub"></i>
          <div class="cont">
            <el-form-item label="站点Id">
              <el-input v-model="form.stations.routes[currentIndex].stationId"></el-input>
            </el-form-item>
            <el-form-item label="站点名">
              <el-input v-model="form.stations.routes[currentIndex].stationName"></el-input>
            </el-form-item>
            <el-form-item label="站点城市">
              <el-input v-model="form.stations.routes[currentIndex].city"></el-input>
            </el-form-item>
            <el-form-item label="到达时间">
              <el-input v-model="form.stations.routes[currentIndex].arriveTime" type="datetime-local"></el-input>
            </el-form-item>
                      <el-form-item label="停留时间">
              <el-input v-model="form.stations.routes[currentIndex].remainTime"></el-input>
            </el-form-item>
          </div>
          <i class="el-icon-arrow-right" @click="add"></i>
          </div>
          <div class="page">当前页：{{currentIndex+1}}/{{form.stations.routes.length}}</div>
            <div class="addbtn"><el-button @click="addItem">添加途径站点</el-button ><el-button @click="delItem">删除站点</el-button></div>
         </div>
        </div>

        <div class="btn"><el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item></div>
       </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {formatDetailTime} from "@/utils/compuTime"
import {createRoute} from "@/api"
export default {
  data() {
    return {
        currentIndex:0,
      form: {
        transId: "",
        transName: "",
        seats:{
            businessSeat:0,
            firstClassSeat:0,
            secondClassSeat:0,
            noSeat:0
        },
        stations:{
            startStation:{
                stationId:'',
                stationName:'',
                city:'',
                startTime:''
            },
            endStation:{
                stationId:'',
                stationName:'',
                city:'',
                arriveTime:''
            },
             routes:[{
            stationId:'',
            stationName:'',
            city:'',
            arriveTime:'',
            remainTime:''
        }]
        },
       
      },
    };
  },
  methods: {
    add(){
        this.currentIndex++;
       
    },
    delItem(){
        console.log('del');
        console.log(this.currentIndex,this.form.stations.routes);
        if(this.form.stations.routes.length>1){
         this.form.stations.routes.splice(this.currentIndex,1);
        }else{
            console.log('else');
            this.form.stations.routes=[{
            stationId:'',
            stationName:'',
            city:'',
            arriveTime:'',
            remainTime:''
        }]
        }
      
    },
    addItem(){
        console.log('add');
         this.form.stations.routes.push({
            stationId:'',
            stationName:'',
            city:'',
            arriveTime:'',
            remainTime:''
        })
    },
    sub(){
        if(this.currentIndex<1){
            this.currentIndex=this.form.stations.routes.length
        }
        this.currentIndex--;
    },
    onSubmit() {
        console.log(this.form.stations);
        this.form.stations.startStation.startTime=formatDetailTime(this.form.stations.startStation.startTime);
        this.form.stations.endStation.arriveTime=formatDetailTime(this.form.stations.endStation.arriveTime);
        this.form.stations.routes.forEach((v)=>{
          v.arriveTime=formatDetailTime(v.arriveTime);
        })
             const params=this.form;
      createRoute(params).then((res)=>{
        console.log(res);
      })
    },
  },
};
</script>

<style scoped lang="scss">
.el-input{
    width: 100px;
}
.msg{
    display: flex;
    width: 100%;
    justify-content: space-between;
    
}
.route{
   .routeItem{
 display: flex;
 align-items: center;
 i{
    font-size: 30px;
 }
 .el-icon-arrow-right{
    margin-left: 20px;
 }
 i:hover{
    color: red;
 }
 
   }
}
.page{
    width: 100%;
    line-height: 20px;
    // background: red;
}
.addbtn{
 line-height: 50px;
//   background: green;
}

</style>
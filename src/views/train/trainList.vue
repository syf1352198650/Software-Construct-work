<template>
  <div class="list">
    <el-table :data="tableData" style="width: 100%">
    <el-table-column label="车次" width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.transName }}</span>
      </template>
    </el-table-column>
     <el-table-column label="起始站点" width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.stations.startStation.stationName }}</span>
      </template>
    </el-table-column>
     <el-table-column label="出发时间" width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.stations.startStation.startTime }}</span>
      </template>
    </el-table-column>
     <el-table-column label="到达站点" width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.stations.endStation.stationName }}</span>
      </template>
    </el-table-column>
     <el-table-column label="到达时间" width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.stations.endStation.arriveTime }}</span>
      </template>
    </el-table-column>
     <el-table-column label="中转站点数量" width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.stations.routes.length }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="dialog">
    <el-dialog
  title="编辑 车次"
  :visible.sync="dialogVisible"
  width="70%"
  >
   <div class="form">
     <el-form ref="form" :model="form" label-width="100px">
       <div class="all">
         <div class="msg">
          <div class="base">
           <div><span>新建车次信息</span></div>
             <el-form-item label="车次Id">
              <el-input v-model="form.transId"></el-input>
            </el-form-item>
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
            <div><span>到达站点</span></div>
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
         <div class="route" v-if="form.stations.routes.length">
            <div><span>设置途径站点</span></div>
          <div class="routeItem">
            <i class="el-icon-arrow-left" @click="sub"></i>
          <div class="cont">
            <el-form-item label="中转站点Id">
              <el-input v-model="form.stations.routes[currentIndex].stationId"></el-input>
            </el-form-item>
            <el-form-item label="站点名">
              <el-input v-model="form.stations.routes[currentIndex].stationName"></el-input>
            </el-form-item>
            <el-form-item label="城市">
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
          <div class="page">当前页：{{currentIndex+1}}/{{form.stations.routes.length ? form.stations.routes.length : '无'}}</div>
            <div class="addbtn"><el-button @click="addItem">添加中转站点</el-button ><el-button @click="delItem">删除站点</el-button></div>
         </div>
        </div>

        <div class="btn"><el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item></div>
       </div>
      </el-form>
  </div> -->
 
</el-dialog>
  </div>
  </div>
</template>

<script>
import {getTrainList,deleteRoute,createOrEditStation} from "@/api"
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
        dialogVisible:false,
        tableData: []
      }
    },
    created(){
         getTrainList().then((res)=>{
        console.log('list',res);
        this.tableData=res.data
      })
        
    },
    methods: {
      cancel(){
          this.dialogVisible=false
      },
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
        const params=this.form
      createOrEditStation(params).then((res)=>{
        console.log(res);
      })
    },
    
      handleEdit(index, row) {
        this.form={...row}
        this.dialogVisible=true;
        // console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(row.transId);
        deleteRoute(row.transId).then((res)=>{
            console.log('删除成功');
        })
      
      }
    }
  }
  
</script>

<style scoped lang='scss'>
.form{
    overflow: scroll;
}
.relation_item{
    display: flex;
    align-items: center;
}
.msg{
    display: flex;
    /* justify-content:space-between; */
}
.relation{
    margin-left: 200px;
    display: flex;
    flex-direction: column;
}
.el-form-item {
  width: 300px;
}
.el-input {
  width: 200px;
  margin-left: 30px;
}
.el-icon-arrow-left{
    font-size: 30px;
}
.el-icon-arrow-right{
    font-size: 30px;
    margin-left: 30px;
}
.el-icon-arrow-right:hover,.el-icon-arrow-left:hover{
  color: red;
}
.btn{
    position: relative;
    margin: 0 atuo;
}
.all{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
}
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
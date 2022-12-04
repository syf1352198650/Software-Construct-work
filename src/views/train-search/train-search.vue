<template>
  <div class="search-container">
   <el-card>
    <div class="search-box">
    <div class="search-bar">
  

        <span class="span_text">出发地</span>  
      <el-input v-model="queryInfo.startCity"  suffix-icon="el-icon-location-outline" @change="search_train()" style="width:100px"></el-input>
      <i class="el-icon-sort" @click="exchangePosition"></i>
      <span class="span_text">目的地</span>  
      <el-input v-model="queryInfo.arriveCity"  suffix-icon="el-icon-location-outline" @change="search_train()" style="width:100px"></el-input>
      <span class="span_text">出发日期</span>  
      <el-input v-model="queryInfo.startTime" placeholder="请输入内容"  suffix-icon="el-icon-date" type="date" @change="search_train()" style="width:250px"></el-input>
       <span class="span_text">到达日期</span> 
      <el-input v-model="queryInfo.endTime" placeholder="请输入内容"  suffix-icon="el-icon-date" type="date" @change="search_train()" style="width:250px"></el-input>
      <!-- <el-button class="searchBtn" @click="dialogVisible = true">高级查询</el-button> -->
   
    </div>
   </div>
   </el-card>
    <el-card>
        <div class="search-table">
    <div class="table-box">
        <el-table
    ref="filterTable"
    :data="dataList"
    style="width: 100%"
    @sort-change="changeSort">
    
    <el-table-column
      prop="transName"
      label="车次"
      width="120">
    </el-table-column>
    <el-table-column
     
      label="出发站"
      width="120"
      column-key="date"

    >
    <template slot-scope="scope">
     <img :src="`image/img${scope.row.transStations[0].stationState}.png`" alt="">
      <span>{{scope.row.transStations[0].stationName}}</span>
      
    </template>
    </el-table-column>
    <el-table-column
      label="到达站"
      width="120"
      column-key="date"

    >
     <template slot-scope="scope">
     <img :src="`image/img${scope.row.transStations[1].stationState}.png`" alt="">
      <span>{{scope.row.transStations[1].stationName}}</span>
      
    </template>
    </el-table-column>
    <el-table-column
       prop='startTime'
      label="出发时间"
      sortable="custom"
      width="160">
      <template slot-scope="{row}">
        {{formatTime(row.transStations[0].time)}}
      </template >
    </el-table-column>
    <el-table-column
      prop='endTime'
      label="到达时间"
      sortable="custom"
      width="160">
      <template slot-scope="{row}">
        {{formatTime(row.transStations[1].time)}}
      </template>
    </el-table-column>
    <el-table-column
      prop='timeDifference'
      label="历时"
      sortable="custom"
      width="150">
      <!-- <template slot-scope="{row}">
        {{getTime(row.transStations[0].time,row.transStations[1].time)}}
        
      </template> -->
    </el-table-column>
    <el-table-column
      prop="seats.businessSeat"
      :label="'商务座 \n 特等座'"
      width="95">
    </el-table-column>
    <el-table-column
      prop="seats.firstClassSeat"
      label="一等座"
      width="95">
    </el-table-column>
    <el-table-column
      prop="seats.secondClassSeat"
      label="二等座"
      width="95">
    </el-table-column>
  
    <el-table-column
      prop="seats.noSeat"
      label="无座"
      width="100">
    </el-table-column>
   
   
        </el-table>
    </div>
   <div class="diaog">
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="50%"
 >
<el-form>
    <el-form-item label="出发地">
    <el-input v-model="highQueryInfo.startCity"></el-input>
  </el-form-item>
  <el-form-item label="目的地">
    <el-input v-model="highQueryInfo.arriveCity"></el-input>
  </el-form-item>
  <el-form-item label="出发日">
    <el-input v-model="highQueryInfo.startTime" type="date"></el-input>
  </el-form-item>
  <el-form-item label="优惠选择">
    <el-radio-group v-model="highQueryInfo.shortPath">
      <el-radio label="最短路径"></el-radio>
      <el-radio label="最便宜路径"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="路径选择">
    <el-select v-model="highQueryInfo.routes" placeholder="请选择活动区域">
      <el-option label="上海" value="shanghai"></el-option>
      <el-option label="北京" value="beijing"></el-option>
    </el-select>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
   </div>
    </div>
    </el-card>
  </div>
</template>

<script>
import {getTime,formatTime} from "../../utils/compuTime"
// import {changeIsdayover} from "../../utils/changeIsdayover"
import {serachTrain,getCity} from "../../api/index"
export default {
  data(){
    return{
      cities:[],
        dialogVisible:false,
        queryInfo:{
         startCity:'',
        arriveCity:'',
        startTime:'',
        endTime:''
       
        },
        highQueryInfo:{
            startCity:'',
             arriveCity:'',
            startTime:'',
            cheapPath:'',
            shortPath:'',
            routes:''
        },
        tableData: []
    }
  },
  computed:{
      dataList(){
        return this.tableData.map((v)=>{
          // console.log('dddd',v);
          // return
          v.timeDifference=getTime(v.transStations[0].time,v.transStations[1].time);
          return v;
        })
      }
  },
  methods:{
    changeSort(val){
     console.log(val.prop,val.order);
     if(val.prop='startTime'){
      if(val.order=='ascending'){
        return  this.tableData.sort((a,b)=>{
            return new Date(a.transStations[0].time)-new Date(b.transStations[0].time)
          })
      }
      else{
          return  this.tableData.sort((a,b)=>{
            return new Date(b.transStations[0].time)-new Date(a.transStations[0].time)
          })
      }
     }
     if(val.prop='endTime'){
       if(val.order=='ascending'){
           return   this.tableData.sort((a,b)=>{
            return new Date(a.transStations[1].time)-new Date(b.transStations[1].time)
          })
      }
      else{
      return  this.tableData.sort((a,b)=>{
            return new Date(b.transStations[1].time)-new Date(a.transStations[1].time)
          })
      }
     }
     if(val.prop='timeDifference'){
       if(val.order=='ascending'){
                 return   this.tableData.sort((a,b)=>{
            return (a.timeDifference).localeCompare(b.timeDifference)
          })
      }
      else{
      
           return   this.tableData.sort((a,b)=>{
            return (b.timeDifference).localeCompare(a.timeDifference)
          })
         
      }
     }
    },
    getTime,
    formatTime,
    getCityFn(){
        getCity().then((res)=>{
    // console.log(res);
    this.cities=res.response.city;
    // console.log(this.cities);
   })
    },
  exchangePosition(){
    [this.queryInfo.startCity,this.queryInfo.arriveCity]=[this.queryInfo.arriveCity,this.queryInfo.startCity]
    console.log(this.queryInfo.startCity,this.queryInfo.arriveCity);
  },

    formatter(row, column) {
        return row.address;
      },
     search_train(){
       if(this.queryInfo.startCity&&this.queryInfo.arriveCity&&this.queryInfo.startTime&&this.queryInfo.endTime){
        console.log(this.queryInfo.startTime);
        serachTrain(this.queryInfo).then((res)=>{
            // console.log('train',res);
            this.tableData=res.data
           
        })
       }
      },
       debounce(fn,wait){
    let timer = null;
    return function(){
        if(timer !== null){
            clearTimeout(timer);
        }
        timer = setTimeout(fn,wait);
    }
},
 changeIsdayover(params){
 if(params){
    return '当日不能到达'
 }
 else{
 return '当日到达'
 }
}
    
  },
  created(){
    this.getCityFn()
   this.search_train()
 
  }
}
</script>

<style lang="scss" scoped>
.searchBtn{
    margin-left: 50px;
}
.el-input{
    width: 120px;
}
.search-container{
    width: 100%;
    height: 100%;
    // background: red;
   .search-box{
    margin-top:10px ;
    height: 10%;
    .search-bar{
   
        border-top: 1px solid rgb(92, 143, 205);
        width: 100%;
        height: 100%;
        line-height: 100%;
        background:rgb(238,241,247);
        .span_text{
            margin: auto 15px;
        }
        .el-input{
            margin: 0px 10px;
            width: 25%;
        }
        .el-input__icon{
            font-size: 20px;
          
        }
        .el-icon-sort:before{
            font-size: 40px;
           
        }
        .el-icon-sort{
            // padding-top:20px ;
            line-height: 40px;
            margin-top: 5px;
            transform: rotate(90deg);
        }
        .el-icon-sort:hover{
            // padding-top:20px ;
            color: red;
        }
    }
   }
   
    .search-table{
        width: 100%;
        height: 75%;
        margin: 0px auto;
        // background: yellow;
        // background:red;
        .table-box{
            width: 95%;
            height: 100%;
            // background:red;
            margin: 20px auto;
        }
    }
}
.el-table .cell{
    white-space:pre-line;
    align-items: center;
    // .caret-wrapper{
    //    height:100%;
    //    line-height: 100%;
    // top: -10px;
   
    // }
}
img{
  width: 20px;
  height: 17px;
  
}

// .has-gutter tr th:nth-child(3) .cell{
//     white-space:pre-line;
//     align-items: center;
//     .caret-wrapper{
//     //    height:100%;
//     //    line-height: 100%;
//     top: -10px;
   
//     }
// }
</style>
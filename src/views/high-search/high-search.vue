<template>
  <div class="all">
      <div class="search-bar">
  

        <span class="span_text">出发地</span>  
      <el-input v-model="queryInfo.startCity"  suffix-icon="el-icon-location-outline" @change="indirectFn" style="width:100px"></el-input>
      <i class="el-icon-sort" @click="exchangePosition"></i>
      <span class="span_text">目的地</span>  
      <el-input v-model="queryInfo.arriveCity"  suffix-icon="el-icon-location-outline" @change="indirectFn" style="width:100px"></el-input>
      <span class="span_text">出发日期</span>  
      <el-input v-model="queryInfo.startTime" placeholder="请输入内容"  suffix-icon="el-icon-date" type="date" @change="indirectFn" style="width:250px"></el-input>
       <span class="span_text">到达日期</span> 
      <el-input v-model="queryInfo.endTime" placeholder="请输入内容"  suffix-icon="el-icon-date" type="date" @change="indirectFn" style="width:250px"></el-input>
      <!-- <el-button class="searchBtn" @click="dialogVisible = true">高级查询</el-button> -->
   
    </div>
    <div class="header">
      <span>车次信息</span>
      <span>发/到时间</span>
      <span>发/到站</span>
      <div  class="distance">
        <span>运行时长/距离</span>
           <span>
         <i class="el-icon-caret-top" @click="asc"></i>
      <i class="el-icon-caret-bottom" @click="desc"></i>
      </span>
      </div>
   
     
      <div  class="distance">
        <span>价格</span>
           <span>
         <i class="el-icon-caret-top" @click="asc1"></i>
      <i class="el-icon-caret-bottom" @click="desc1"></i>
      </span>
      </div>
      <span>退改签说明</span>
    </div>
    
    <el-card>
        <template v-if="list.length!=0"> <div class="item" v-for="(item, index) in list" :key="index" >
        <div class="content">
          <div class="start">
            <div class="train">{{ item[0].transId }}</div>
            <div class="time startItem">
              <div>{{ formatTime(item[0].transStations[0].time) }}</div>
              <div>{{ formatTime(item[0].transStations[1].time) }}</div>
            </div>
            <div class="station startItem">
              <div>
                <img
                  :src="`image/img${item[0].transStations[0].stationState}.png`"
                  alt=""
                />
                {{ item[0].transStations[0].stationName }}
              </div>
              <div>
                <img
                  :src="`image/img${item[0].transStations[1].stationState}.png`"
                  alt=""
                />
                {{ item[0].transStations[1].stationName }}
              </div>
            </div>
            <div class="startItem date">
             <div> {{ formatAllTime(item[0].transStations[0].time,item[0].transStations[1].time) }}</div>
             <div>
                 {{ item[0].distance }}KM
             </div>
            </div>
            <div class="startItem">
               <el-radio-group v-model="radio">
                <el-radio :label="3"
                  >商务座
                  <span class="price"
                    >￥{{ item[0].price * 3 }}
                  </span></el-radio
                >
                <el-radio :label="6"
                  >一等座
                  <span class="price"
                    >￥ {{ item[0].price * 2 }}</span
                  ></el-radio
                >
                <el-radio :label="9"
                  >二等座
                  <span class="price"
                    >￥ {{ item[0].price * 1.5 }}</span
                  ></el-radio
                >
                <el-radio :label="12"
                  >三等座
                  <span class="price"
                    >￥ {{ item[0].price * 1 }}</span
                  ></el-radio
                >
              </el-radio-group>
            </div>
          </div>
          <div class="msg">
            <span>{{item[0].transStations[0].stationName}}换乘  全程{{formatAllTime(item[0].transStations[0].time,item[1].transStations[1].time)}}</span>
          </div>
          <el-button class="btn" @click="buyTicket">合并预定</el-button>
          <div class="end">
            <div class="train">{{ item[1].transId }}</div>
            <div class="time startItem">
              <div>{{ formatTime(item[1].transStations[0].time) }}</div>
              <div>{{ formatTime(item[1].transStations[1].time) }}</div>
            </div>
            <div class="station startItem">
              <div>
                <img
                  :src="`image/img${item[0].transStations[0].stationState}.png`"
                  alt=""
                />
                {{ item[1].transStations[0].stationName }}
              </div>
              <div>
                <img
                  :src="`image/img${item[0].transStations[1].stationState}.png`"
                  alt=""
                />
                {{ item[1].transStations[1].stationName }}
              </div>
            </div>
            <div class="startItem date">
              <div> {{ formatAllTime(item[1].transStations[0].time,item[1].transStations[1].time) }}</div>
             <div>
                 {{ item[1].distance }}KM
             </div>
            </div>
            <div class="startItem">
              <el-radio-group v-model="radio">
                <el-radio :label="3"
                  >商务座
                  <span class="price"
                    >￥{{ item[1].price * 3 }}
                  </span></el-radio
                >
                <el-radio :label="6"
                  >一等座
                  <span class="price"
                    >￥ {{ item[1].price * 2 }}</span
                  ></el-radio
                >
                <el-radio :label="9"
                  >二等座
                  <span class="price"
                    >￥ {{ item[1].price * 1.5 }}</span
                  ></el-radio
                >
                <el-radio :label="12"
                  >三等座
                  <span class="price"
                    >￥ {{ item[1].price * 1 }}</span
                  ></el-radio
                >
              </el-radio-group>
            </div>
          </div>
        </div>
      </div></template>
     
      <div v-else>暂无数据，请输入搜索字段</div>
      </el-card
    >
  </div>
</template>

<script>
import { indirect } from "@/api";
import { formatDate,formatTime,formatAllTime } from "@/utils/compuTime";
export default {
  data() {
    return {
         queryInfo:{
         startCity:'',
        arriveCity:'',
        startTime:'',
        endTime:''
       
        },
      radio: "",
      list: [],
    };
  },
  created() {
    // this.indirectFn();
  },
  methods: {
    exchangePosition(){
    [this.queryInfo.startCity,this.queryInfo.arriveCity]=[this.queryInfo.arriveCity,this.queryInfo.startCity]
    console.log(this.queryInfo.startCity,this.queryInfo.arriveCity);
  },
    desc(){
            console.log('desc');
            this.list.sort((a,b)=>{
                return (b[0].distance+b[1].distance)-(a[0].distance+a[1].distance)
            })
    },
    asc(){
            console.log('asc');
            this.list.sort((a,b)=>{
                return (a[0].distance+a[1].distance)-(b[0].distance+b[1].distance)
            })
    },
    desc1(){
            console.log('desc1');
             this.list.sort((a,b)=>{
                return (b[0].price+b[1].price)-(a[0].price+a[1].price)
            })
    },
    asc1(){
        console.log('asc1');
         this.list.sort((a,b)=>{
                return (a[0].price+a[1].price)-(b[0].price+b[1].price)
            })
    },
    buyTicket(){
        if(this.radio){
                    this.$message({
                        type:'success',
                        message:'购票成功'
                    })
        }
        else{
             this.$message({
                        type:'warning',
                        message:'请选择座位'
                    })
        }
    },
    formatAllTime,
    formatTime,
    formatDate,
    indirectFn() {
      
      if(this.queryInfo.startCity&&this.queryInfo.arriveCity&&this.queryInfo.startTime&&this.queryInfo.endTime){
                    indirect(this.queryInfo).then((res) => {
        console.log(res.data);
        this.list = res.data;
      });
      }
      
    },
  },
};
</script>

<style scoped lang='scss'>
img {
  width: 20px;
  height: 17px;
}
.all .header {
  display: flex;
  justify-content: space-around;
  height: 50px;
  line-height: 50px;
  background: rgb(240, 240, 240);
  .distance{
    display: flex;
    align-items: center;
  }
  span{
    i{
        display: block;
    }
    i:hover{
        // display: block;
        color: red;
    }
  }
}
.item {
    border: 1px solid rgb(193,193,193);
  margin-top: 30px;
  position: relative;
  border-radius: 20px;
  // background: yellow;
  width: 100%;
  height: 300px;
  .content {
    .time {
      display: flex;
      flex-direction: column;
      // align-content: space-between
      justify-content: space-around;
      // div{
      //     margin-top: 30px;
      // }
      // align-items:
    }
    position: absolute;
    width: 80%;
    height: 100%;
    //  background: red;
    left: 5px;
    .btn {
      position: absolute;
      background: rgb(231, 153, 36);
      width: 70px;
      height: 30px;
      transform: translate((0, -50%));
      right:-100px;
      ::v-deep span {
        // font-size: 70px;
        // padding-left: -10px;
        margin-left: -10px;
      }
    }
    .msg {
        font-size: 20px;
        color: rgb(34,166,242);
      position: absolute;
      top: 50%;
      width: 400px;
      height: 30px;
      right: 20%;
    //   background: blue;
      transform: translate(0, -50%);
      border-radius: 20px;
      border: 1px solid rgb(213,216,222);
    }
    .start,
    .end {
      div {
        width: 150px;
      }
      .startItem {
        div {
          width: 100%;
        }
      }
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 50%;
      //   background: yellow;
    }

    .end {
      //   background: red;
      width: 100%;
      height: 50%;
    }
  }
}
.el-radio-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  // position: relative;
  .el-radio {
    text-align: left;
    // position: absolute;
    width: 100%;
    margin-left: 0px;
    padding-left: 0px;
    
  }
}
.price {
  color: rgb(226, 144, 125);
  font-size: 20px;
}
.train{
    font-weight: 20px;
    font-size: 20px;
}
.time{
    font-size: 20px;
}
.date{
    font-size: 18px;
}
.station{
    text-align: left;
}
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
</style>
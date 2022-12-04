<template>
  <div>
    <el-card>
      <el-form ref="form" :model="form" label-width="80px">
       <div class="all">
         <div class="msg">
          <div class="base">
           <div><span>新建站点信息</span></div>
             <!-- <el-form-item label="站点ID">
              <el-input v-model="form.id"></el-input>
            </el-form-item> -->
            <el-form-item label="站点名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="站点城市">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
          </div>
          <div class="relation">
            <div ><span>建立站关系</span></div>
           <div  class="relation_item"> <i class="el-icon-arrow-left" @click="sub"></i>
            <div class="item">
                   <el-form-item label="站点ID">
    <el-input v-model="form.relationship[currentIndex].id"></el-input>
  </el-form-item>
  <el-form-item label="站点距离">
    <el-input v-model="form.relationship[currentIndex].distance"></el-input>
  </el-form-item>
  <el-form-item label="站间价格">
    <el-input v-model="form.relationship[currentIndex].price"></el-input>
  </el-form-item>
            </div>
            <i class="el-icon-arrow-right" @click="add"></i></div>
            <div class="page"><span>当前页：{{currentIndex+1}}/{{form.relationship.length}}</span></div>
             <div class="changebtn"><el-button @click="delItem">删除</el-button><el-button @click="addItem">添加一条关系</el-button></div>
             
         
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
import {createOrEditStation} from "@/api"
export default {
  data() {
    return {
        currentIndex:0,
      form: {
        id: "",
        name: "",
        city: "",
        relationship: [{
            id:'',
            distance:'',
            price:''
        }],
      },
    };
  },
  methods: {
    add(){
        this.currentIndex++;
       
    },
    delItem(){
        if(this.form.relationship.length>1){
            this.form.relationship.splice(this.currentIndex,1);
        }
        else{
            this.form.relationship=[{
            id:'',
            distance:'',
            price:''
        }]
        }
    },
    addItem(){
         this.form.relationship.push({
            id:'',
            distance:'',
            price:''
        })
    },
    sub(){
        if(this.currentIndex<1){
            this.currentIndex=this.form.relationship.length
        }
        this.currentIndex--;
    },
    onSubmit() {
        const params=this.form
      createOrEditStation(params).then((res)=>{
        console.log(res);
      })
    },
  },
};
</script>

<style scoped>
.changebtn{
    line-height: 50px;

}
.page{
    line-height: 20px;
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

</style>
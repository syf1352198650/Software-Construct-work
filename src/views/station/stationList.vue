<template>
  <div class="list">
    <el-table :data="tableData" style="width: 100%">
    <el-table-column label="站点Id" width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column label="站点名" width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
     <el-table-column label="站点城市" width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.city }}</span>
      </template>
    </el-table-column>
     <el-table-column label="相邻站点数量" width="180">
      <template slot-scope="scope">
       
        <span style="margin-left: 10px">{{ scope.row.relationship.length }}</span>
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
  title="编辑 站点"
  :visible.sync="dialogVisible"
  width="70%"
  >
  <div class="form">
     <el-form ref="form" :model="form" label-width="80px">
       <div class="all">
         <div class="msg">
          <div class="base">
           <div><span>新建站点信息</span></div>
             <el-form-item label="站点ID">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
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
             <div><el-button @click="delItem">删除</el-button><el-button @click="addItem">添加一条关系</el-button></div>
             <div><span>当前页：{{currentIndex+1}}/{{form.relationship.length}}</span></div>
         
          </div>
         
        </div>

        <div class="btn"><el-form-item>
          <el-button type="primary" @click="onSubmit(),dialogVisible=false">立即创建</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item></div>
       </div>
      </el-form>
  </div>
 
</el-dialog>
  </div>
  </div>
</template>

<script>
import { getStationList,createOrEditStation,deleteStation} from "@/api"
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
        dialogVisible:false,
        tableData: []
      }
    },
    created(){
     
        this.getStationListFn()
    },
    methods: {
          add(){
        this.currentIndex++;
       
    },
    delItem(){
        this.form.relationship.splice(this.currentIndex,1);
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
        console.log(1);
        const params=this.form
      createOrEditStation(params).then((res)=>{
        console.log(res);
      })
    },
        getStationListFn(){
            getStationList().then((res)=>{
                // console.log(res);
                this.tableData=res.data
            })
        },
      handleEdit(index, row) {
        this.form={...row}
        this.dialogVisible=true;
        // console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(row.id);
        deleteStation(row.id).then((res)=>{
            console.log(res);
        })
      }
    }
  }
  
</script>

<style scoped>
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
</style>
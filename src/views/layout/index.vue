<template>
 
     <el-container>
  <el-header>火车票管理系统 <span class="role">身份 : {{roleInfo}}</span></el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu
      default-active="2"
      background-color="rgb(211,220,230)"
      class="el-menu-vertical-demo"
      
      router>
      
     <el-submenu index='stationMange'>
      <template slot="title">
         <i class="el-icon-menu"></i>站点管理</template>
       <el-menu-item index="/stationManage">
        <i class="el-icon-menu"></i>
        <span slot="title">站点管理</span>
      </el-menu-item>
      <el-menu-item index="/stationList">
        <i class="el-icon-menu"></i>
        <span slot="title">站点总览</span>
      </el-menu-item>
     </el-submenu>
     <el-submenu index='trainManage'>
        <template slot="title">
             <i class="el-icon-menu"></i>车次管理
        </template>
         <el-menu-item index="/trainManage" >
        <i class="el-icon-document"></i>
        <span slot="title">车次管理</span>
      </el-menu-item>
      <el-menu-item index="/trainList" >
        <i class="el-icon-document"></i>
        <span slot="title">车次总览</span>
      </el-menu-item>
     </el-submenu>
     
       <el-submenu index='trainManage'>
        <template slot="title">
             <i class="el-icon-menu"></i>车票管理
        </template>
         <el-menu-item index="/trainTickt" >
        <i class="el-icon-document"></i>
        <span slot="title">车票查询</span>
      </el-menu-item>
      <el-menu-item index="/highSearch" >
        <i class="el-icon-document"></i>
        <span slot="title">高级查询</span>
      </el-menu-item>
     </el-submenu>
    </el-menu>
    </el-aside>
    <el-main><router-view/></el-main>
  </el-container>
</el-container>
 
</template>

<script>
export default {
data(){
  return{
    roleInfo:''
  }
 
},
 created(){
  if(localStorage.getItem('user')){
    const {role}=JSON.parse(localStorage.getItem('user'));
  console.log(role);
  if(role==1){
    this.roleInfo='用户'
  }
  else{
    this.roleInfo="管理员"
  }
  }
 }
}
</script>

<style lang="scss" scoped>
.role{
  position: absolute;
  right: 20px;
}
.el-container {
	width: 100%;
	height: 100%;
}
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 100%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>>


<template>
  <div class="login-container">
    <div class="login">
        <h2>火车票查询系统</h2>
        <el-form :model="loginForm" ref="Form" :rules="rules">
            <el-form-item label="" prop="userName">
          <el-input prefix-icon="el-icon-user-solid" class="login-input-text" v-model="loginForm.userName" placeholder="admin" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input prefix-icon="el-icon-s-cooperation"  class="login-input-text" type="password" v-model="loginForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('Form')">login</el-button>
        </el-form-item>
    </el-form>
    </div>
   
  </div>
</template>

<script>
import {login,logout} from "@/api"
import {mapMutations} from 'vuex'
export default {
name:'Login',
data(){
    return{
        loginForm:{
        userName:'admin',
        password:'approve123456.'
      },
      rules:{ userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          {}
        ],}
    }
},
methods:{
  ...mapMutations(['initUser']),
    submitForm(Form){
        this.$refs[Form].validate((valid)=>{
            if(valid){
                //发起请求
              console.log('请求成功');
              login(this.loginForm).then((res)=>{
                
                this.initUser(res.response);
                console.log(this.$store.state.token,'111',this.$store.state.token);
                localStorage.setItem('user',JSON.stringify(res.response))
                this.$router.push('/').catch(()=>{});
              })
            }
            else{
                console.log('请求失败');
                return false
            }
        })
    }
}
}
</script>

<style lang="scss" scoped>
.login-container{
    width: 100%;
    height: 100%;
    background: url('../../assets/img/loginbg.jpg');
    .login{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        margin: 0 auto;
        background: #fff;
        width: 30%;
        padding: 60px 40px;
        h2{
            text-align: center;
            margin-bottom: 40px;
        }
    }
}
.el-button{
    width: 100%;
}

</style>
<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="user">
        <el-form-item
          class="input-prepend restyle"
          prop="name"
          :rules="[
            { required: true, message: '请输入用户名称', trigger: 'blur' },
          ]"
        >
          <div>
            <el-input type="text" placeholder="用户昵称" v-model="user.name" />
            <i class="iconfont icon-phone" />
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <div>
            <el-input
              type="password"
              placeholder="密码"
              v-model="user.password"
            />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>

        <div class="btn">
          <input
            type="button"
            class="sign-in-button"
            value="登录"
            @click="submitLogin()"
          />
        </div>
      </el-form>
      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li>
            <a
              id="weixin"
              class="weixin"
              target="_blank"
              href="http://qy.free.idcfengye.com/api/ucenter/weixinLogin/login"
              ><i class="iconfont icon-weixin"
            /></a>
          </li>
          <li>
            <a id="qq" class="qq" target="_blank" href="#"
              ><i class="iconfont icon-qq"
            /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "~/assets/css/sign.css";
import "~/assets/css/iconfont.css";
import cookie from "js-cookie";
import user from "@/api/user";
export default {
  layout: "sign",
  data() {
    return {
      user: {},
      loginSuccess:{}//登录成功后存储用户信息
    };
  },
  methods: {
    submitLogin(){
      user.login(this.user).then(resp=>{
        if(resp.data.success){
          console.log("登录成功")
          //登录成功token存入cookie中
          cookie.set("blog_token",resp.data.data.token,{
            domain:"120.25.153.83"
          })
          //登录成功，根据token获取用户信息
          user.getUserByToken().then(resp=>{
            this.loginSuccess=resp.data.data.user
            console.log(this.loginSuccess)
             //将用户信息记录cookie,存入数据必须是json字符串，不然解析不了
            cookie.set("blog_user", JSON.stringify(this.loginSuccess), { domain: "120.25.153.83" });
            //跳转页面
            window.location.href = "/";
          })
        }else{
          this.$message.error(resp.data.message)
        }
    })
    }
  },
};
</script>

<template>
  <div>
    <!-- 公共头 -->
    <header>
      <el-row>
        <el-col :span="6">
           <h1 id="logo">
            <a href="#" title="SWTN博客">
              <img src="~/assets/photo/index/logos.webp" width="30%" alt="SWTN博客" />
            </a>
          </h1>
          <div style="float:left;margin-left: -40%;font-size: 2pc;margin-top: 5%;font-family: KaiTi;">SWTN博客</div>
        </el-col>
        <el-col :span="10">
           <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>博客</a>
            </router-link>
            <router-link to="/course/main_course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/question/main_quest" tag="li" active-class="current">
              <a>问答</a>
            </router-link>
          </ul>
        </el-col>
        <el-col :span="8">
           <ul class="h-r-login">
             <!-- 未登录 -->
            <li id="no-login" v-if="!userInfo.id">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <!-- 已经登录 -->
             <li v-if="userInfo.id" id="is-login-one" class="mr10">
              <a id="headerMsgCountId" href="#" title="消息">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </li>
            <li v-if="userInfo.id" id="is-login-two" class="h-r-user">
              <a :href="'/user/manager?id='+userInfo.id" title>
               
                <span id="userName" class="vam disIb">{{userInfo.name}}</span>
              </a>
              <a
                href="javascript:void(0);"
                title="退出"
                @click="exit()"
                class="ml5"
                >退出</a
              >
            </li>
          </ul>
        </el-col>
      </el-row>
    </header>


    <nuxt/>

     <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
       
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：010-56253825(北京) 0755-85293825(深圳)</span>
                <span>Email：info@atguigu.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2018课程版权均归swt所有 粤ICP备17055252号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt />
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt />
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>

<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"
import cookie from "js-cookie";
import user from '@/api/user'

export default {
  data() {
    return {
      token:'',//请求中的用户token
      userInfo:{
        id:'',
        name:'',
        avatar:'',
        isVip:0
      },//用户信息
    }
  },
  created() {
    this.token=this.$route.query.token
    console.log("用户token信息="+this.token)
    this.showUserInfo()
  },
  methods: {
    //展示用户信息
    showUserInfo(){
        let user=cookie.get('blog_user')
        if(user){
          this.userInfo=JSON.parse(user)
          console.log("用户信息="+this.userInfo.name)
        }
    },
    //退出登录
    exit(){
       cookie.set("blog_token", "", {
        domain: "localhost"
      });
      cookie.set("blog_user", "", { domain: "localhost" });
      //刷新页面
      window.location.href = "/";
    }
  },
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>


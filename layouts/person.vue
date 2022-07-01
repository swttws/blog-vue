<template>
  <div>
    <!-- 公共头 -->
    <header>
      <el-row>
        <el-col :span="3">
          <h1 id="logo">
            <div :title="userInfo.name">
              <img
                src="~/assets/photo/index/132.jpg"
                width="30%"
                :alt="userInfo.name"
              />
            </div>
          </h1>
          <div
            style="
              float: left;
              margin-left: -40%;
              font-size: 2pc;
              margin-top: 5%;
              font-family: KaiTi;
            "
          >
            {{ userInfo.name }}
          </div>
        </el-col>
        <el-col :span="15">
          <ul class="nav">
            <router-link
              :to="{ path: '/user/manager', query: { id: this.userId } }"
              tag="li"
              active-class="current"
              exact
            >
              <a>个人中心</a>
            </router-link>
            <router-link
              :to="{ path: '/user/article', query: { id: this.userId } }"
              tag="li"
              active-class="current"
            >
              <a>博客发布</a>
            </router-link>
            <router-link
              :to="{ path: '/question/send_quest', query: { id: this.userId } }"
              tag="li"
              active-class="current"
            >
              <a>问题发布</a>
            </router-link>
            <router-link
              :to="{ path: '/course/send_course', query: { id: this.userId } }"
              tag="li"
              active-class="current"
            >
              <a>课程发布</a>
            </router-link>
            <router-link
              :to="{
                path: '/course/manager_course',
                query: { id: this.userId },
              }"
              tag="li"
              active-class="current"
            >
              <a>课程管理</a>
            </router-link>
            <router-link
              :to="{ path: '/data/statistical', query: { id: this.userId } }"
              tag="li"
              active-class="current"
            >
              <a>数据统计</a>
            </router-link>
          </ul>
        </el-col>
        <el-col :span="5">
          <ul class="h-r-login">
            <li id="is-login-two" class="h-r-user">
              <a v-if="userInfo.isVip == 0" href="#" title>
                <span id="userName" class="vam disIb">开通VIP</span>
              </a>
              <span v-if="userInfo.isVip == 1" id="userName" class="vam disIb">
                <img
                  style="margin-top: -20%"
                  src="~/assets/photo/index/vip.png"
                  width="60%"
                  :alt="userInfo.isVip"
                />
              </span>
              <a
                href="javascript:void(0);"
                style="color: blue"
                title="退出"
                @click="exit()"
                class="ml5"
                >退出登录</a
              >
              <a
                href="javascript:void(0);"
                style="color: blue"
                title="退出"
                @click="main()"
                class="ml5"
                >返回首页</a
              >
            </li>
          </ul>
        </el-col>
      </el-row>
    </header>
    <nuxt />
  </div>
</template>

<script>
import user from "@/api/user";
import cookie from "js-cookie";
export default {
  data() {
    return {
      userId: "",
      userInfo: {}, //用户数据
    };
  },
  created() {
    if (this.$route.query) {
      this.userId = this.$route.query.id;
      user.getUserById(this.userId).then((resp) => {
        this.userInfo = resp.data.data.userInfo;
      });
    } else {
      this.$router.push("/user/manager");
    }
  },
  methods: {
    exit() {
      cookie.set("blog_token", "", {
        domain: "localhost",
      });
      cookie.set("blog_user", "", { domain: "localhost" });
      this.$router.push({ path: "/" });
    },
    main() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<template>
  <div>
    <el-container>
      <el-container>
        <el-aside width="150px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1">
              <i class="el-icon-document"></i>
              <a style="color: white;" slot="title" href="/user_manager/manager_blog" target="right" >文章管理</a>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-chat-dot-round"></i>
              <a style="color: white;" href="/user_manager/mymessage" target="right" >文章消息</a>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-view"></i>
              <a style="color: white;" href="/user_manager/manager_history" target="right" >浏览历史</a>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-folder-opened"></i>
              <a style="color: white;" href="/user_manager/manager_collect" target="right" >我的收藏</a>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-chat-dot-round"></i>
              <a style="color: white;" href="/user_manager/quest_message" target="right" >问题消息</a>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-question"></i>
              <a style="color: white;" href="/user_manager/my_quest" target="right" >我的问题</a>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container> 
            <iframe id="right" name="right" src="/user_manager/manager_blog" height="580px" width="100%" frameborder="1"></iframe>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  layout: "person",
  data() {
    return {
      userId: "", //用户id
    };
  },
  created() {
    this.userId = this.$route.query.id;
  },
  methods: {},
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #cbddf0;
  color: #333;
  text-align: center;
  line-height: 160px;
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
</style>
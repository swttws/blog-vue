<template>
  <div>
    <div style="border: 2px gray solid"></div>
    <div class="box-card" v-for="quest in questList" :key="quest.id">
      <div
        align="center"
        style="font-size: 1.3pc; font-weight: 800; font-style: italic"
      >
        {{ quest.title }}
      </div>
      <div style="font-size: 1.1pc; margin-left: 22%">
        回答数量：&nbsp;{{ quest.answerNum }}人
      </div>
      <div style="font-size: 1.1pc; margin-left: 22%">
        浏览数量：&nbsp;{{ quest.readNum }}人
      </div>
      <div style="font-size: 1.1pc; margin-left: 22%">
        问题类型：&nbsp;{{ quest.type }}
      </div>
      <el-row>
        <el-col :span="13" align="center">
          <el-button type="info" @click="editor(quest.id)" round
            >编辑问题</el-button
          >
        </el-col>
        <el-col :span="11">
          <el-button type="info" round @click="answer(quest.id)">回答管理</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 分页换页开始 -->
    <el-pagination
      class="pagiantion"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total"
      style="margin-top: 34%"
      align="center"
    >
    </el-pagination>
    <!-- 分页换页结束 -->
  </div>
</template>

<script>
import cookie from "js-cookie";
import question from "../../api/question";
export default {
  layout: "none",
  data() {
    return {
      pagination: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 6, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
      questList: [], //问题数组
      titleList: [], //二级标题数组
      userId: "", //用户id
    };
  },
  created() {
    this.getUserId();
    this.getQuest();
  },
  methods: {
    //获取用户id
    getUserId() {
      let user = cookie.get("blog_user");
      if (user) {
        var users = JSON.parse(user);
        this.userId = users.id;
      }
    },
    //查询我发布的所有问题
    getQuest() {
      question.getQuestByUserId(this.userId, this.pagination).then((resp) => {
        this.pagination.total = resp.data.data.total;
        this.questList = resp.data.data.questList;
        this.titleList = resp.data.data.titleList;
        for (var i = 0; i < this.questList.length; i++) {
          this.questList[i].type = this.titleList[i];
        }
      });
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getQuest();
    },
    //编辑问题
    editor(id) {
      this.$router.push({
        path:
          "/user_manager/my_editor_quest?id=" + this.userId + "&questId=" + id,
      });
    },
    //问题管理
    answer(id){
      this.$router.push({path:'/user_manager/'+id})
    }
  },
};
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 28%;
  height: 30vh;
  margin-left: 2%;
  margin-top: 2%;
  float: left;
  flex-wrap: wrap;
  background-color: gray;
  box-shadow: 5px 5px 10px gray;
  border-radius: 20px;
}
</style>
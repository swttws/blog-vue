<template>
  <div>
    <el-container>
      <!-- 问题内容区域 -->
      <el-aside width="40%">
        <div
          style="font-size: 1.3pc; margin-top: ; font-weight: 700"
          align="center"
        >
          {{ question.title }}
        </div>
        <el-divider content-position="right"
          >问题发布者：&nbsp;{{ question.username }}</el-divider
        >
        <div style="margin-top: 2%" v-html="question.quest"></div>
      </el-aside>
      <!-- 问题回答区域 -->
      <el-main>
        <el-divider content-position="center"
          ><span style="font-weight: 800; font-size: 1.2pc"
            >共{{ question.answerNum }}人回答</span
          ></el-divider
        >
        <div v-if="answerList.length <= 0">
          <el-empty description="回答区空空如也"></el-empty>
        </div>
        <div v-else>
          <el-card
            v-for="answer in answerList"
            :key="answer.id"
            class="box-card"
            align="left"
          >
            <img
              src="~/assets/photo/index/132.jpg"
              width="4%"
              style="border-radius: 50%"
              alt="userInfo"
            />
            <div style="margin-top: -5%; margin-left: 5%">
              {{ answer.userName }} &nbsp;&nbsp;&nbsp;&nbsp;
              <span v-if="answer.answerAdopt == 1" style="color: green"
                >最佳回答</span
              >
            </div>
            <div v-html="answer.answerText"></div>
            <div style="margin-top: 2%">
              <el-button
                size="mini"
                :style="{ color: answer.color }"
                icon="el-icon-success"
                @click="praiseAnswers(answer.id)"
              ></el-button>
            </div>
            <div align="right" style="margin-top: -4%; color: gray">
              &nbsp;&nbsp; {{ answer.createTime }}&nbsp;&nbsp;
              <span>{{ answer.praiseNum }}人点赞</span>
            </div>
          </el-card>
          <!-- 分页换页开始 -->
          <el-pagination
            class="pagiantion"
            @current-change="handleCurrentChange"
            :current-page="pagination.currentPage"
            :page-size="pagination.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pagination.total"
            align="center"
          >
          </el-pagination>
          <!-- 分页换页结束 -->
        </div>
        <!-- 发布回答 -->
        <div>
          <!-- 富文本编译器 -->
          <client-only>
            <VueEditor v-model="quest" />
          </client-only>
          <div style="margin-top: 2%">
            <el-button plain @click="sendAnswer()">提交回答</el-button>
          </div>
        </div>
        <!-- 发布回答结束 -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import question from "../../api/question";
import cookie from "js-cookie";
import answer from "@/api/answer";
export default {
  layout: "default",
  asyncData({ params, error }) {
    return { questId: params.questId };
  },
  data() {
    return {
      pagination: {
        currentPage: 1,
        pageSize: 3,
        total: 100,
        queryString: null,
      },
      answerList: [], //回答问题数组
      question: {}, //问题对象
      userId: "", //登录用户id
      quest: "", //回答问题
    };
  },
  created() {
    this.getUserId();
    this.getQuestAndAnswer();
    this.addReadNum(); //浏览量加1
  },
  methods: {
    //问题相关信息以及对应回答查询
    getQuestAndAnswer() {
      if(this.userId==''){
        this.userId=0
      }
      question.getQuestById(this.questId,this.pagination,this.userId).then((resp) => {
        this.answerList = resp.data.data.answerList;
        this.question = resp.data.data.question;
        this.pagination.total = resp.data.data.total;
        var countList=resp.data.data.countList
        if(countList.length>0){
          for(var i=0;i<this.answerList.length;i++){
            if(countList[i]==1){
              this.answerList[i].color="red"
            }else{
              this.answerList[i].color="gray"
            }
          }
        }else{
          for(var i=0;i<this.answerList.length;i++){
            this.answerList[i].color="gray"
          }
        }
        
      });
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getQuestAndAnswer();
    },
    //获取用户id
    getUserId() {
      let user = cookie.get("blog_user");
      if (user) {
        var users = JSON.parse(user);
        this.userId = users.id;
      }
    },
    //问题浏览量加1
    addReadNum() {
      question.updateReadNumById(this.questId).then((resp) => {});
    },
    //回答发布
    sendAnswer() {
      if(this.userId==0||this.userId==''){
        this.$message.error("请登录后再发布回答")
        this.quest=''
        return
      }
      var param = {
        auserId: this.question.userId,
        auserName: this.question.username,
        questId: this.questId,
        questTitle: this.question.title,
        answerText: this.quest,
      };
      answer.sendAnswer(param, this.userId).then((resp) => {
        if (resp.data.success) {
          this.$message.success("问题发布成功");
          this.getQuestAndAnswer();
        } else {
          this.$message.error(resp.data.message);
        }
        this.quest = "";
      });
    },
    //点赞回答
    praiseAnswers(id) {
      if(this.userId==0||this.userId==''){
        this.$message.error("请登录后再点赞回答")
        return
      }
      answer.praiseAnswer(this.userId, id).then((resp) => {
        if (resp.data.success) {
          if (resp.data.data.flag == 0) {
            this.$message.success("取消点赞");
            for (var i = 0; i < this.answerList.length; i++) {
              if (id == this.answerList[i].id) {
                this.answerList[i].color = "gray";
              }
            }
          } else {
            this.$message.success("点赞成功");
            for (var i = 0; i < this.answerList.length; i++) {
              if (id == this.answerList[i].id) {
                this.answerList[i].color = "red";
              }
            }
          }
          this.getQuestAndAnswer()
        } else {
          this.$message.error(resp.data.message);
        }
      });
    },
  },
};
</script>

<style scoped>
.box-card {
  width: 100%;
}
.el-aside {
  color: #333;
  text-align: center;
  border: 2px solid black;
}

.el-main {
  color: #333;
  text-align: center;
  border: 2px solid black;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
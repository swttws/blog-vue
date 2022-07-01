<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="12"
                ><span style="font-size: 1.4pc; font-weight: 800" class="title"
                  >问题消息</span
                ></el-col
              >
              <el-col :span="12" align="right">
                <el-badge
                  style="margin-left: 3%"
                  :value="questCount"
                  class="item"
                >
                  <el-button @click=" deleteAllQuest()" size="small"
                    >清空未读消息</el-button
                  >
                </el-badge>
              </el-col>
            </el-row>
          </div>
          <el-card
            class="box-card1"
            v-for="quest in questMsgList"
            :key="quest.id"
          >
            <div>{{ quest.userName }}回答了你的{{ quest.questTitle }}问题</div>
            <div align="right">——{{ quest.createTime }}</div>
            <el-badge
              v-if="quest.msg == 2"
              style="margin-top: -20%; margin-left: 88%"
              :value="1"
              class="item"
            >
            <el-button size="mini" @click="deleteOneQuest(quest.id)">清除</el-button>
            </el-badge>
          </el-card>
          <!-- 分页换页开始 -->
          <el-pagination
            class="pagiantion"
            @current-change="handleCurrentChange1"
            :current-page="pagination1.currentPage"
            :page-size="pagination1.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pagination1.total"
            align="center"
          >
          </el-pagination>
          <!-- 分页换页结束 -->
        </el-card>
      </el-col>
      <!-- 回答消息 -->
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-row>
              <el-col :span="12"
                ><span style="font-size: 1.4pc; font-weight: 800" class="title"
                  >回答消息</span
                ></el-col
              >
              <el-col :span="12" align="right">
                <el-badge
                  style="margin-left: 3%"
                  :value="answerCount"
                  class="item"
                >
                  <el-button @click="deleteAllAnswer()" size="small"
                    >清空未读消息</el-button
                  >
                </el-badge>
              </el-col>
            </el-row>
          </div>
          <el-card
            class="box-card1"
            v-for="quest in answerMsgList"
            :key="quest.id"
          >
            <div>{{ quest.userName }}点赞了你的回答</div>
            <div align="right">——{{ quest.createTime }}</div>
            <el-badge
              v-if="quest.msg == 2"
              style="margin-top: -20%; margin-left: 88%"
              :value="1"
              class="item"
            >
            <el-button size="mini" @click="deleteOneAnswer(quest.id)">清除</el-button>
            </el-badge>
          </el-card>
          <!-- 分页换页开始 -->
          <el-pagination
            class="pagiantion"
            @current-change="handleCurrentChange2"
            :current-page="pagination2.currentPage"
            :page-size="pagination2.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pagination2.total"
            align="center"
          >
          </el-pagination>
          <!-- 分页换页结束 -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import answer from "@/api/answer";
import cookie from "js-cookie";
export default {
  layout: "none",
  data() {
    return {
      questCount: 0, //问题被回答消息
      questMsgList: [], //问题消息
      answerCount: 0, //回答被点赞消息
      answerMsgList:[],
      userId: "", //用户id
      pagination1: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 4, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
      pagination2: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 4, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
    };
  },
  created() {
    this.getUserId();
    this.getQuestMsg();
    this.getAnswerMsg()
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
    //获取问题消息
    getQuestMsg() {
      answer.getAnswerByAuserId(this.pagination1, this.userId).then((resp) => {
        this.questCount = resp.data.data.questCount;
        this.questMsgList = resp.data.data.questMsgList;
        this.pagination1.total = resp.data.data.total;
      });
    },
    handleCurrentChange1(currentPage) {
      this.pagination1.currentPage = currentPage;
      this.getQuestMsg();
    },
    //清除一条未读消息
    deleteOneQuest(id) {
      answer.updateMsg(id).then((resp) => {
        this.getQuestMsg()
      });
    },
    //清空所有未读消息
    deleteAllQuest(){
        answer.updateAllMsg(this.userId).then(resp=>{
            this.getQuestMsg()
        })
    },
    //查询所有回答点赞消息
    getAnswerMsg(){
        answer.getAnswerPraise(this.pagination2,this.userId).then(resp=>{
            this.answerMsgList=resp.data.data.answerMsgList
            this.answerCount=resp.data.data.answerCount
            this.pagination2.total=resp.data.data.total
        })
    },
    handleCurrentChange2(currentPage){
      this.pagination2.currentPage=currentPage
      this.getAnswerMsg()
    },
    //清除一条点赞未读消息
    deleteOneAnswer(id){
      answer.updateAnswerMsg(id).then(resp=>{
        this.getAnswerMsg()
      })
    },
    //清除所有点赞未读消息
    deleteAllAnswer(){
      answer.updateAllAnswerMsg(this.userId).then(resp=>{
        this.getAnswerMsg()
      })
    }
  },
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 490px;
  height: 86vh;
}
.box-card1 {
  width: 100%;
  height: 15vh;
}
</style>
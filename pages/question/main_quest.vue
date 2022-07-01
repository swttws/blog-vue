<template>
  <div width="100%" style="height: auto">
    <!-- 筛选条件 -->
    <div class="content">
      <section class="c-s-dl">
        <dl>
          <dt>
            <span class="c-999 fsize14">博客类别</span>
          </dt>
          <dd class="c-s-dl-li">
            <ul class="clearfix">
              <li>
                <a @click="getAll()" title="全部" href="#">全部</a>
              </li>
              <li v-for="one in oneIdList" :key="one.oneId">
                <a
                  :title="one.title"
                  @click="getTwoTitle(one.oneId)"
                  href="#"
                  >{{ one.title }}</a
                >
              </li>
            </ul>
          </dd>
        </dl>
        <dl>
          <dt>
            <span class="c-999 fsize14"></span>
          </dt>
          <dd class="c-s-dl-li">
            <ul class="clearfix">
              <li v-for="two in twoIdList" :key="two.twoId">
                <a
                  :title="two.title"
                  @click="getQuestByTwoId(two.twoId)"
                  href="#"
                  >{{ two.title }}</a
                >
              </li>
            </ul>
          </dd>
        </dl>
        <div class="clear"></div>
      </section>
    </div>
    <!-- 筛选条件 -->
    <!-- 问题区域 -->
    <div>
      <el-card class="box-card" v-for="quest in questionList" :key="quest.id">
        <a :href="'/question/' + quest.id">
          <div class="aa">{{quest.title}}</div>
          <div style="margin-top: 1%" align="right">发布人:&nbsp;{{quest.username}}</div>
          <div style="color: gray" align="right">{{quest.createTime}}</div>
          <div style="margin-top: 10%">
            <el-row>
              <el-col :span="8">
                <div style="color: gray">{{quest.readNum}}人浏览</div>
              </el-col>
              <el-col :span="8">
                <div style="color: gray">{{quest.answerNum}}人回答</div>
              </el-col>
              <el-col :span="8" align="right">
                <div style="color: red" v-if="quest.isAccept==2">未采纳回答</div>
                <div style="color: green" v-else>已采纳回答</div>
              </el-col>
            </el-row>
          </div>
        </a>
      </el-card>
    </div>
    <!-- 问题区域 -->
    <!-- 分页换页开始 -->
    <el-pagination
      class="pagiantion"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total"
      style="margin-top: 33%"
      align="center"
    >
    </el-pagination>
    <!-- 分页换页结束 -->
  </div>
</template>

<script>
import cookie from "js-cookie";
import subject from "../../api/subject";
import question from "../../api/question";
export default {
  data() {
    return {
      pagination: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 6, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
      userId: "", //用户id
      oneIdList: [], //一级标题集合
      twoIdList: [], //二级标题集合
      questionList:[],//问题集合
    };
  },
  created() {
    this.getUserId();
    this.initOneTitle();
    this.getQuestionPage()
  },
  methods: {
    //分页查询问题信息
    getQuestionPage(){
      question.getQuestPage(this.pagination).then(resp=>{
        this.pagination.total=resp.data.data.total
        this.questionList=resp.data.data.questionList
      })
    },
    handleCurrentChange(currentPage){
      this.pagination.currentPage=currentPage
      this.getQuestionPage()
    },
    //获取用户id
    getUserId() {
      let user = cookie.get("blog_user");
      if (user) {
        var users = JSON.parse(user);
        this.userId = users.id;
      }
    },
    //初始化一级标题
    initOneTitle() {
      subject.getOneAndTwo().then((resp) => {
        this.oneIdList = resp.data.data.oneSubject;
      });
    },
    //获取对应二级标题
    getTwoTitle(oneId) {
      for (var i = 0; i < this.oneIdList.length; i++) {
        var one = this.oneIdList[i];
        if (one.oneId == oneId) {
          this.twoIdList = one.child;
          console.log(this.twoIdList);
        }
      }
    },
    getQuestByTwoId(twoId){
      this.pagination.queryString=twoId
      this.getQuestionPage()
    },
    getAll(){
      this.pagination.queryString=null
      this.getQuestionPage()
    }
    
  },
};
</script>


<style>
.aa {
  font-size: 1.3pc;
  font-weight: 800;
  font-style: italic;
}
.d {
  width: 100%;
  height: 20vh;
  border: 1px solid rgb(156, 153, 153);
  background-color: floralwhite;
}

.content {
  width: 100%;
  height: 20vh;
  box-shadow: 5px 5px 10px gray;
  background-color: rgb(228, 227, 210);
  float: none;
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
  width: 30%;
  height: 30vh;
  margin-left: 2%;
  margin-top: 2%;
  float: left;
  flex-wrap: wrap;
}
.container {
  min-height: 100vh;
  width: 100%;
  display: flex;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
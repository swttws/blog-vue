<template>
  <div>
    <el-card class="box-card" width="30%">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="12"><span class="title">点赞消息</span></el-col>
          <el-col :span="12" align="right">
            <el-badge style="margin-left: 3%" :value="praiseCount" class="item">
              <el-button @click="deletePraise()" size="small">清空未读消息</el-button>
            </el-badge>
          </el-col>
        </el-row>
      </div>
      <div class="d" v-for="praise in praiseMessage" :key="praise.id">
        <div style="color: gray">
          {{ praise.name }}点赞了你的【{{ praise.articleName }}】文章
        </div>
        <div style="color: gray" align="right">——{{ praise.createTime }}</div>
      </div>
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
    <el-card class="box-card" width="30%">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="12"><span class="title">收藏消息</span></el-col>
          <el-col :span="12" align="right">
            <el-badge
              style="margin-left: 3%"
              :value="collectCount"
              class="item"
            >
              <el-button @click="deleteCollect()" size="small">清空未读消息</el-button>
            </el-badge>
          </el-col>
        </el-row>
      </div>
      <div class="d" v-for="collect in collectMessage" :key="collect.id">
        <div style="color: gray">
          {{ collect.name }}收藏了你的【{{ collect.articleName }}】文章
        </div>
        <div style="color: gray" align="right">——{{ collect.createTime }}</div>
      </div>
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
    <el-card class="box-card" width="30%">
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="12"><span class="title">评论消息</span></el-col>
          <el-col :span="12" align="right">
            <el-badge
              style="margin-left: 3%"
              :value="commentCount"
              class="item"
            >
              <el-button @click="deleteComment()" size="small">清空未读消息</el-button>
            </el-badge>
          </el-col>
        </el-row>
      </div>
      <div class="d" v-for="comment in commentMessage" :key="comment.id">
        <div style="color: gray">{{comment.name}}评论了你的{{comment.articleName}}文章</div>
        <div style="color: gray" align="right">——{{comment.createTime}}</div>
      </div>
      <!-- 分页换页开始 -->
      <el-pagination
        class="pagiantion"
        @current-change="handleCurrentChange3"
        :current-page="pagination3.currentPage"
        :page-size="pagination3.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pagination3.total"
        align="center"
      >
      </el-pagination>
      <!-- 分页换页结束 -->
    </el-card>
  </div>
</template>

<script>
import cookie from "js-cookie";
import praisecollect from "../../api/praisecollect";
import comment from "../../api/comment";
export default {
  layout: "none",
  data() {
    return {
      pagination1: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 6, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
      pagination2: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 6, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
      pagination3: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 6, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
      praiseCount: "", //点赞数量
      praiseMessage: [], //点赞消息
      collectCount: "", //收藏数量
      collectMessage: [], //收藏消息
      commentCount: "", //评论数量
      commentMessage: [], //评论消息
      userId: "",
      type:'',//删除类型
    };
  },
  created() {
    this.getUserId();
    this.getPraiseMessage();
    this.getCollectMessage();
    this.getCommentMessage()
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
    //获取点赞消息
    getPraiseMessage() {
      praisecollect
        .getPraiseByUserId(this.pagination1, this.userId)
        .then((resp) => {
          this.praiseMessage = resp.data.data.msg;
          this.praiseCount = resp.data.data.count;
          this.pagination1.total = resp.data.data.total;
        });
    },
    //获取收藏消息
    getCollectMessage() {
      praisecollect
        .getCollectByUserId(this.pagination2, this.userId)
        .then((resp) => {
          this.collectMessage = resp.data.data.msg;
          this.collectCount = resp.data.data.count;
          this.pagination2.total = resp.data.data.total;
        });
    },
    //获取评论消息
    getCommentMessage() {
      comment.getCommentByUserId(this.userId,this.pagination3).then(resp=>{
        this.commentMessage=resp.data.data.msg
        this.commentCount=resp.data.data.count
        this.pagination3.total=resp.data.data.total
      })
    },
    //清楚点赞未读消息
    deletePraise(){
      this.type='1'
      comment.deleteLogByUserId(this.userId,this.type).then(resp=>{
        if(resp.data.success){
          this.praiseCount='0'
        }
      })
    },
    //清除收藏未读消息
    deleteCollect(){
      this.type='2'
      comment.deleteLogByUserId(this.userId,this.type).then(resp=>{
        if(resp.data.success){
          this.collectCount='0'
        }
      })
    },
    //清除评论未读消息
    deleteComment(){
      this.type='3'
      comment.deleteLogByUserId(this.userId,this.type).then(resp=>{
        if(resp.data.success){
          this.commentCount='0'
        }
      })
    },
    handleCurrentChange1(currentPage) {
      this.pagination1.currentPage=currentPage
      this.getPraiseMessage()
    },
    handleCurrentChange2(currentPage) {
      this.pagination2.currentPage=currentPage
      this.getCollectMessage()
    },
    handleCurrentChange3(currentPage) {
      this.pagination3.currentPage=currentPage
      this.getCommentMessage()
    },
  },
};
</script>

<style>
.d {
  width: 100%;
  height: 14vh;
  border: 1px solid gray;
}
.title {
  font-size: 1.1pc;
}
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
  width: 27%;
  float: left;
  margin-left: 3%;
  height: 470px;
}
</style>
<template>
  <div>
    <div style="text-align: center; font-size: 2pc; font-weight: 600">
      {{ article.title }}
    </div>
    <el-divider content-position="right">作者：{{ article.author }}</el-divider>
    <el-card class="box-card" style="width: 70%; margin-left: 15%">
      <span v-html="article.blog"></span>
    </el-card>
    <!-- 评论区 -->
    <el-card class="box-card" style="width: 70%; margin-left: 15%">
      <el-divider content-position="center"
        ><div style="font-weight: 1000; font-size: 1.3pc">
          评论总数{{ pagination.total }}
        </div></el-divider
      >
      <!-- 无评论提示 -->
      <div v-if="commentList.length <= 0">
        <el-empty description="评论区空空如也"></el-empty>
      </div>
      <!-- 评论 -->
      <div v-else>
        <div
          style="margin-top: 2%"
          v-for="comment in commentList"
          :key="comment.id"
        >
          <img
            src="~/assets/photo/index/132.jpg"
            width="4%"
            style="border-radius: 50%"
            alt="userInfo"
          />
          <div style="margin-top: -5%; margin-left: 5%; color: gray">
            {{ comment.name }} &nbsp; <span>{{ comment.createTime }}</span>
          </div>
          <div style="margin-top: 0%; margin-left: 5%">
            {{ comment.substance }}
          </div>
        </div>

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
      <el-row>
        <el-col :span="16"
          ><el-input v-model="comment" placeholder="请输入评论内容"></el-input
        ></el-col>
        <el-col :span="4" align="center">
          <el-button round @click="handleComment">立即评论</el-button></el-col
        >
        <el-col :span="4" align="center">
          <el-button
            icon="el-icon-star-on"
            circle
            :style="{ color: color1 }"
            @click="collectArticle"
          ></el-button>
          <el-button
            icon="el-icon-success"
            circle
            :style="{ color: color2 }"
            @click="praiseArticle"
          ></el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import cookie from "js-cookie";
import article from "../../api/article";
import comment from "../../api/comment";
import praisecollect from "../../api/praisecollect";
import articleLog from "../../api/articleLog";
export default {
  layout: "none",
  asyncData({ params, error }) {
    return { articleId: params.articleId };
  },
  data() {
    return {
      pagination: {
        currentPage: 1,
        pageSize: 6,
        total: 100,
        queryString: null,
      },
      comment: "", //评论输入框内容
      color1: "gray", //收藏后颜色为红色，未收藏为灰色
      color2: "gray",
      userId: "", //用户id
      article: {}, //文章内容
      commentList: [], //评论区评论
    };
  },
  created() {
    this.showUserInfo();
    this.initInformation();
    this.saveArticleLog()
  },
  methods: {
    //获取用户id
    showUserInfo() {
      let user = cookie.get("blog_user");
      if (user) {
        var users = JSON.parse(user);
        this.userId = users.id;
      }
    },
    //保存用户浏览足迹
    saveArticleLog(){
      articleLog.saveLog(this.userId,this.articleId).then(resp=>{
        console.log("保存成功")
      })
    },
    //获取文章信息，点赞，评论，收藏
    initInformation() {
      article
        .getArticlePraiseCollectbyId(
          this.articleId,
          this.userId,
          this.pagination
        )
        .then((resp) => {
          this.article = resp.data.data.article;
          this.commentList = resp.data.data.commentList;
          this.pagination.total = resp.data.data.total;
          //点赞过，收藏过的样式变红
          if (resp.data.data.praiseCount == 1) {
            this.color2 = "red";
          }
          if (resp.data.data.collectCount == 1) {
            this.color1 = "red";
          }
        });
    },
    //换页
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.initInformation();
    },
    //发布评论
    handleComment() {
      var param = {
        articleId: this.articleId,
        substance: this.comment,
      };
      comment.sendComment(param, this.userId).then((resp) => {
        if (resp.data.success) {
          this.$message.success("评论发布成功");
          this.initInformation();
          this.comment = "";
        } else {
          this.$message.error(resp.data.message);
        }
      });
    },
    //文章收藏
    collectArticle() {
      praisecollect.collect(this.articleId, this.userId).then((resp) => {
        if (resp.data.success) {
          if (resp.data.data.flag == 1) {
            this.color1 = "red";
            this.$message.success("成功收藏文章");
          } else {
            this.color1 = "gray";
            this.$message("取消收藏文章");
          }
        }else{
          this.$message.error(resp.data.message)
        }
      });
    },
    //文章点赞
    praiseArticle(){
       praisecollect.praise(this.articleId, this.userId).then((resp) => {
        if (resp.data.success) {
          if (resp.data.data.flag == 1) {
            this.color2 = "red";
            this.$message.success("成功点赞文章");
          } else {
            this.color2 = "gray";
            this.$message("取消点赞文章");
          }
        }else{
          this.$message.error(resp.data.message)
        }
      });
    }
  },
};
</script>


<style scoped>
.d {
  margin-left: 15%;
  width: 70%;
  background-color: rebeccapurple;
}
</style>
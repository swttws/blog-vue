<template>
  <div>
    <div> 
      <el-card class="card2" v-for="article in articleInfoList" :key="article.id">
        <a :href="'/blog/' + article.id"> 
          <div style="font-size: 1.2pc;font-weight: 800;font-style: italic;">{{article.title}}</div>
          <div style="color: gray;margin-top: 1%;margin-left: 2%;">{{article.readNum}}人阅读</div>
          <div style="color: gray;margin-top: 1%;margin-left: 2%;">{{article.commentNum}}人评论</div>
          <div style="color: gray;margin-top: 1%;margin-left: 2%;">{{article.collectNum}}人收藏</div>
          <div style="color: gray;margin-top: 1%;margin-left: 2%;">{{article.praiseNum}}人点赞</div>
          <div style="color: gray;text-align: right;margin-top: -18%;">作者：{{article.author}}</div>
          <div style="color: gray;text-align: right;margin-top: 2%;">{{article.createTime}}</div>
        </a>
      </el-card>
    </div>
    <!-- 文章内容结束 -->

    <!-- 分页换页开始 -->
    <el-pagination
      class="pagiantion"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total"
      align="center"
      style="position: absolute;top: 330pt;left: 30%;"
    >
    </el-pagination>
    <!-- 分页换页结束 -->
  </div>
  
</template>

<script>
import cookie from "js-cookie";
import articleLog from '@/api/articleLog'
export default {
  layout: "none",
  data() {
    return {
      articleInfoList: [{}], //文章集合
      pagination: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 4, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
        userId:'',
      },
    };
  },
  created() {
    this.getUserId()
    this.initArticle()
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
    //初始化数据
    initArticle(){
      articleLog.getArticleLogByUserId(this.pagination,this.userId).then(resp=>{
        this.articleInfoList=resp.data.data.articleInfoList
        this.pagination.total=resp.data.data.total
      })
    },
    //换页
    handleCurrentChange(currentPage){
      this.currentPage=currentPage
      this.initArticle()
    }
  },
};
</script>

<style>
.d {
  width: 90%;
  height: 15vh;
  border: 1px solid rgb(156, 153, 153);
  background-color: floralwhite;
  float: none;
}
.card2{
    width: 40%;
  height: 30vh;
  margin-left: 2%;
  margin-top: 1%;
  float: left;
  flex-wrap: wrap;
  box-shadow: 5px 5px 10px gray;
  border-radius: 20px;
}
</style>
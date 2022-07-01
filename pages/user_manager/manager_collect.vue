<template>
  <div>
    <el-container>
      <el-header>
        <el-row>
          <!-- 一级标题选择 -->
          <el-col :span="8">
            <el-select
              v-model="oneId"
              @change="getTwoByOneId(oneId)"
              placeholder="请选择一级标题"
            >
              <el-option
                v-for="(item, index) in oneIdList"
                :key="index"
                :label="item.title"
                :value="item.oneId"
              >
              </el-option>
            </el-select>
          </el-col>
          <!-- 二级标题选择 -->
          <el-col :span="8">
            <el-select v-model="twoId" placeholder="请选择二级标题">
              <el-option
                v-for="(item, index) in twoIdList"
                :key="index"
                :label="item.title"
                :value="item.twoId"
              >
              </el-option> </el-select
          ></el-col>
          <el-col :span="8">
            <el-button plain @click="getArticleByTwoId()"
              >分类查询文章</el-button
            >
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-card class="box-card" v-for="collect in collectArticle" :key="collect.id">
          <el-container>
            <el-header>
              <a :href="'/collect/'+collect.articleId" style="font-size: 1.2pc; font-weight: 500"
                >{{collect.articleName}}</a
              >
            </el-header>
            <el-main>
             
              <div align="left" style="margin-top: -20%">
                收藏时间：&nbsp;{{collect.updateTime}}
              </div>
              <div style="margin-top: -40%">
                <el-button @click="deleteCollect(collect.id)">取消收藏</el-button>
              </div>
            </el-main>
          </el-container>
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
          style="margin-top: 30%"
        >
        </el-pagination>
        <!-- 分页换页结束 -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import cookie from "js-cookie";
import subject from "../../api/subject";
import praisecollect from "@/api/praisecollect";
export default {
  layout: "none",
  data() {
    return {
      userId: "",
      pagination: {
        currentPage: 1,
        pageSize: 3,
        total: 100,
        queryString: null,
      },
      oneIdList: [], //一级标题
      oneId: "", //选择的一级标题
      twoIdList: [], //二级标题
      twoId: "", //选择的二级标题
      collectArticle: [], //收藏文章信息
    };
  },
  created() {
    this.getUserId();
    this.getOneTitle();
    this.getCollectArtInfo()
  },
  methods: {
    //分页查询收藏文章信息
    getCollectArtInfo() {
        praisecollect.getcollectArticleLog(this.pagination,this.userId).then(resp=>{
            this.collectArticle=resp.data.data.collectArticle
            this.pagination.total=resp.data.data.total
        })
    },
    handleCurrentChange(currentPage){
        this.pagination.currentPage=currentPage
        this.getCollectArtInfo()
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
    getOneTitle() {
      subject.getOneAndTwo().then((resp) => {
        this.oneIdList = resp.data.data.oneSubject;
      });
    },
    //初始化二级标题
    getTwoByOneId(oneId) {
      this.twoId = "";
      for (var i = 0; i < this.oneIdList.length; i++) {
        var oneSubject = this.oneIdList[i];
        if (oneSubject.oneId === oneId) {
          this.twoIdList = oneSubject.child;
        }
      }
    },
    //根据二级标题筛选文章
    getArticleByTwoId() {
      this.pagination.queryString = this.twoId;
      this.getCollectArtInfo()
    },
  },
};
</script>

<style>
.box-card {
  width: 27%;
  float: left;
  margin-left: 2%;
  height: 55vh;
}
.d {
  width: 20%;
  height: 40vh;
  background-color: gray;
  float: left;
  margin-left: 2%;
  box-shadow: 5px 5px 10px gray;
  border-radius: 20px;
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
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #c2d3e4;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: white;
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
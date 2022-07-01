<template>
  <div align="center">
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
        <!-- 文章内容 -->
        <el-table :data="articleData" style="width: 100%" height="380" border>
          <el-table-column prop="title" label="标题" width="300" align="center">
          </el-table-column>
          <el-table-column
            prop="readNum"
            label="阅读数"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="praiseNum"
            label="点赞数"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="collectNum"
            label="收藏数"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="commentNum"
            label="评论数"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column prop="vip" label="类型" align="center" width="160">
          </el-table-column>
          <el-table-column label="操作" align="center" width="170">
            <template slot-scope="scope">
              <el-button
                icon="el-icon-edit"
                @click="updateBlog(scope.$index, scope.row)"
              ></el-button>
              <el-popconfirm
                title="确定删除文章吗？"
                @confirm="deleteBlog(scope.$index, scope.row)"
              >
                <el-button icon="el-icon-delete" slot="reference"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
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
      </el-main>
    </el-container>
  </div>
</template>

<script >
import subject from "../../api/subject";
import cookie from "js-cookie";
import article from "../../api/article";
export default {
  layout: "none",
  data() {
    return {
      oneIdList: [], //一级标题
      oneId: "", //选择的一级标题
      twoIdList: [], //二级标题
      twoId: "", //选择的二级标题
      articleData: [], //内容
      userId: "", //用户id
      pagination: {
        currentPage: 1,
        pageSize: 4,
        total: 100,
        queryString: null,
      },
      types: [],
    };
  },
  created() {
    this.getOneTitle();
    this.getUserId();
    this.getArticleByUserId();
  },
  methods: {
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
    //获取用户id
    getUserId() {
      let user = cookie.get("blog_user");
      if (user) {
        var users = JSON.parse(user);
        this.userId = users.id;
      }
    },
    //获取用户文章
    getArticleByUserId() {
      article.getArticleByUserId(this.pagination, this.userId).then((resp) => {
        this.articleData = resp.data.data.articleData;
        this.pagination.total = resp.data.data.total;
        for (var i = 0; i < this.articleData.length; i++) {
          var article = this.articleData[i];
          if (article.isFree == 1) {
            this.articleData[i].vip = "所有用户可看";
          } else {
            this.articleData[i].vip = "vip用户可看";
          }
        }
      });
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getArticleByUserId();
    },
    //根据二级标题筛选文章
    getArticleByTwoId() {
      this.pagination.queryString = this.twoId;
      this.getArticleByUserId();
    },
    //编辑文章
    updateBlog(index, row) {
      this.$router.push({
        path:
          "/user_manager/article2?id=" + this.userId + "&articleId=" + row.id,
      });
    },
    //删除博文
    deleteBlog(index, row) {
      article.deleteBlog(row.id).then(resp=>{
        this.$message.success("删除文章成功")
        this.getArticleByUserId()
      })
    },
  },
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 70px;
}

.el-main {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 20px;
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

<template>
  <div>
    <!-- 进度条 -->
    <div style="margin-top: 3%; margin-left: 27%">
      <el-steps :space="700" :active="2" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="文章信息"></el-step>
        <el-step title="内容编辑"></el-step>
      </el-steps>
    </div>

    <Editor :blog="blog" @func="getContent" />
    <div style="margin-left: 42%">
      <el-button type="success" size="medium" @click="before()" plain
        >上一步</el-button
      >
      <el-button type="success" size="medium" @click="next()" plain
        >发布博文</el-button
      >
    </div>
  </div>
</template>

<script>
import article from "@/api/article";
import Editor from "@/components/editor"; //导入组件
export default {
  layout: "none",
  components: {
    Editor,
  },
  data() {
    return {
      blog: "", //文章内容
      articleId: "", //文章Id
      userId: "",
    };
  },
  created() {
    this.articleId = this.$route.query.articleId;
    this.userId = this.$route.query.id;
    this.getBlog();
  },
  methods: {
    //初始化文章内容
    getBlog() {
      article.getBlogById(this.articleId).then((resp) => {
        this.blog = resp.data.data.blog;
        console.log("blog3=" + this.blog);
      });
    },
    //获取子组件值
    getContent(data) {
      this.blog = data;
    },
    //上一步
    before() {
      this.$router.push({
        path:
          "/user_manager/article2?id=" + this.userId + "&articleId=" + this.articleId,
      });
    },
    //发布博文
    next() {
      console.log("blog=" + this.blog);
      var param = {
        blog: this.blog,
        articleId: this.articleId,
      };
      article.updateBlogById(param).then((resp) => {
        if (resp.data.success) {
          this.$message.success("博文发布成功");
          this.$router.push({
            path:'/user_manager/manager_blog'
          });
        } else {
          this.$message.error(resp.data.message);
        }
      });
    },
  },
};
</script>
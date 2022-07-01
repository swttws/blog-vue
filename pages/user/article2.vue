<template>
  <div>
    <!-- 进度条 -->
    <div style="margin-top: 3%; margin-left: 27%">
      <el-steps :space="700" :active="1" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="文章信息"></el-step>
        <el-step title="内容编辑"></el-step>
      </el-steps>
    </div>

    <!-- 文章信息 -->
    <div style="width: 60%; margin-left: 20%; margin-top: 4%">
      <el-form
        :model="articleInfo"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章标题">
          <el-input
            type="text"
            v-model="articleInfo.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="文章类别">
          <el-select
            v-model="articleInfo.oneId"
            @change="getTwoByOneId(articleInfo.oneId)"
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

          <el-select
            v-model="articleInfo.twoId"
            collapse-tags
            style="margin-left: 215px"
            placeholder="请选择二级标题"
          >
            <el-option
              v-for="(item, index) in twoIdList"
              :key="index"
              :label="item.title"
              :value="item.twoId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章属性">
          <el-switch
            width:100px
            v-model="articleInfo.isFree"
            active-text="所有用户可看"
            inactive-text="vip用户可看"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label-width="300px">
          <el-button type="success" size="medium" @click="before()" plain
            >上一步</el-button
          >
          <el-button type="success" size="medium" @click="next()" plain
            >下一步</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import subject from "@/api/subject";
import article from "@/api/article";
export default {
  layout: "person",
  data() {
    return {
      userId: "",
      articleId: "", //文章id
      articleInfo: {
        isFree: true,
        twoId: "", //二级标题
        oneId: "", //一级标题
      }, //文章信息
      oneIdList: [], //一级标题
      twoIdList: [], //二级标题
    };
  },
  created() {
    this.getOneTitle();
    if (this.$route.query.articleId) {
      this.articleId = this.$route.query.articleId;
      this.getArticleInfo();
    }
    this.userId = this.$route.query.id;
  },
  methods: {
    //修改回显数据信息
    getArticleInfo() {
      article.getArticleById(this.articleId).then((resp) => {
        this.articleInfo = resp.data.data.article;
        console.log(this.articleInfo)
        if (resp.data.data.article.isFree == 1) {
          //免费用户可看
          this.articleInfo.isFree = true;
        } else {
          //vip用户
          this.articleInfo.isFree = false;
        }
        console.log(this.oneIdList);
        this.showTwoByOneId(this.articleInfo.oneId);
      });
    },
    //回显二级标题
    showTwoByOneId(oneId) {
      subject.getOneAndTwo().then((resp) => {
        this.oneIdList = resp.data.data.oneSubject;
        for (var i = 0; i < this.oneIdList.length; i++) {
          var oneSubject = this.oneIdList[i];
          if (oneSubject.oneId === oneId) {
            this.twoIdList = oneSubject.child;
          }
        }
      });
    },
    //初始化一级标题
    getOneTitle() {
      subject.getOneAndTwo().then((resp) => {
        this.oneIdList = resp.data.data.oneSubject;
      });
    },
    //初始化二级标题
    getTwoByOneId(oneId) {
      this.articleInfo.twoId = "";
      for (var i = 0; i < this.oneIdList.length; i++) {
        var oneSubject = this.oneIdList[i];
        if (oneSubject.oneId === oneId) {
          this.twoIdList = oneSubject.child;
        }
      }
    },
    //上一步
    before() {
      if(this.articleId){
        this.$router.push({ path: "/user/article?id=" + this.userId +'&articleId='+this.articleId });
      }else{
        this.$router.push({ path: "/user/article?id=" + this.userId });
      }
      
    },
    //下一步
    next() {
      if(this.articleId){
        this.update()
      }else{
        this.save()
      }
    },
    //保存文章信息
    save() {
      article.saveblog(this.userId, this.articleInfo).then((resp) => {
        if (resp.data.success) {
          this.articleInfo.articleId = resp.data.data.articleId;
          //跳转到下一个页面
          this.$router.push({
            path:
              "/user/article3?id=" +
              this.userId +
              "&articleId=" +
              this.articleInfo.articleId,
          });
        } else {
          this.$message.error(resp.data.message);
        }
      });
    },
    //修改文章信息
    update(){
      if(this.articleInfo.isFree==true){
        this.articleInfo.isFree=1 // 转换为int
      }else{
        this.articleInfo.isFree=2
      }
      article.updateArticleById(this.articleInfo).then(resp=>{
        //跳转到下一个页面
          this.$router.push({
            path:
              "/user/article3?id=" +
              this.userId +
              "&articleId=" +
              this.articleId,
          });
      })
    }
  },
};
</script>
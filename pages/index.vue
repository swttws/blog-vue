<template>
  <div>
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
                <a @click="getAll()" title="全部" href="#" >全部</a>
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
                <a :title="two.title" @click="getArticleByTwoId(two.twoId)" href="#">{{ two.title }}</a>
              </li>
            </ul>
          </dd>
        </dl>
        <div class="clear"></div>
      </section>
      <div class="js-wrap" >
        <section class="fr">
          <span class="c-ccc">
            <i class="c-master f-fM">1</i>/
            <i class="c-666 f-fM">1</i>
          </span>
        </section>
        <section class="fl">
          <ol class="js-tap clearfix">
            <li v-if="sort==1" class="current bg-orange">
              <a @click="sortReadNum()" title="热度排序" href="#">热度排序</a>
            </li>
            <li v-else>
              <a @click="sortReadNum()" title="热度排序" href="#">热度排序</a>
            </li>
            <li v-if="sort==2" class="current bg-orange">
              <a @click="sortUpdateTime()" title="最新" href="#">最新文章</a>
            </li>
            <li v-else>
              <a @click="sortUpdateTime()" title="最新" href="#">最新文章</a>
            </li>
            <li v-if="sort==3" class="current bg-orange">
              <a @click="sortPraiseNum()" title="点赞数" href="#"
                >点赞数&nbsp;
                <span>↓</span>
              </a>
            </li>
            <li v-else>
              <a @click="sortPraiseNum()" title="点赞数" href="#"
                >点赞数&nbsp;
                <span>↓</span>
              </a>
            </li>
            <li>
              <el-switch
                style="margin-left: 40%; width: 100%"
                v-model="isNotVip"
                active-text="免费"
                inactive-text="VIP"
                @change="getVipOrNot()"
              >
              </el-switch>
            </li>
            <li>
              <el-button
                style="margin-left: 1200%"
                icon="el-icon-search"
                circle
                @click="handleCurrentChange(1)"
              ></el-button>
            </li>
            <li>
              <el-input
                style="margin-left: 240%"
                placeholder="请输入文章标题"
                v-model="pagination.queryString"
              ></el-input>
            </li>
          </ol>
        </section>
      </div>
    </div>
    <!-- 筛选条件结束 -->

    <div> 
      <el-card class="card1" v-for="article in articleInfoList" :key="article.id">
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
    <!-- 文章内容开始 -->
    

    <!-- 分页换页开始 -->
    <el-pagination
      class="pagiantion"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total"
      align="center"
      style="margin-top: 33%;"
    >
    </el-pagination>
    <!-- 分页换页结束 -->
  </div>
</template>

<script>
import article from "@/api/article";
import subject from "@/api/subject";
export default {
  data() {
    return {
      isNotVip: true, //是否为vip
      articleInfoList: [], //文章集合
      oneIdList: [], //一级标题集合
      twoIdList: [], //二级标题集合
      pagination: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 6, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
      sort:0,//1.按照热度排序，2.按照时间排序，3.按照点赞数排序，4筛选文章为免费，5，筛选文章为vip
    };
  },
  created() {
    this.initOneTitle();
    this.goPage();
  },
  methods: {
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
    //分页获取文章
    goPage() {
      article.getPageBlog(this.pagination,this.sort).then((resp) => {
        this.articleInfoList = resp.data.data.articleInfo;
        this.pagination.total = resp.data.data.total;
        console.log(this.articleInfoList);
      });
    },
    //换页
    handleCurrentChange(currentPage){
      this.pagination.currentPage=currentPage
      this.goPage()
    },
    //根据二级标题获取文章
    getArticleByTwoId(twoId){
      this.pagination.queryString=twoId
      this.goPage()
    },
    //获取全部文章
    getAll(){
      this.pagination.queryString=null
      this.twoIdList=[]
      this.goPage()
    },
    //按照热度排序
    sortReadNum(){
      this.sort=1
      this.goPage()
    },
    //按照时间排序
    sortUpdateTime(){
      this.sort=2
      this.goPage()
    },
    //按照点赞数排序
    sortPraiseNum(){
      this.sort=3
      this.goPage()
    },
    //按照vip筛选文章
    getVipOrNot(){
      if(this.isNotVip==true){
        this.sort=4
      }else{
        this.sort=5
      }
      this.goPage()
    }
  },
};
</script>

<style>
.d {
  width: 100%;
  height: 20vh;
  border: 1px solid rgb(156, 153, 153);
  background-color: floralwhite;
}

.content {
  width: 100%;
  height: 26vh;
  box-shadow: 5px 5px 10px gray;
  background-color: rgb(228, 227, 210);
  float: none;
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
.card1{
    width: 30%;
  height: 30vh;
  margin-left: 2%;
  margin-top: 2%;
  float: left;
  flex-wrap: wrap;
  box-shadow: 5px 5px 10px gray;
  border-radius: 20px;
}
</style>


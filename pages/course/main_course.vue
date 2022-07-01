<template>
  <div style="width: 100%; height: 105vh">
    <!-- 筛选条件 -->
    <div class="content">
      <section class="c-s-dl">
        <dl>
          <dt>
            <span class="c-999 fsize14">课程类别</span>
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
                  @click="getCourseByTwoId(two.twoId)"
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
    <!-- 筛选条件结束 -->
    <div class="course" v-for="course in courseList" :key="course.id">
      <el-row>
        <el-col :span="10">
          <img
            :src="course.cover"
            width="100%"
            style="height: 30vh; border-radius: 20px"
          />
        </el-col>
        <el-col :span="14">
          <a :href="'/course/'+course.id"> 
            <div style="margin-left: 6%; font-size: 1.1pc; margin-top: 1%;font-style: italic;">
              课程名称：{{course.courseName}}
            </div>
            <div style="margin-left: 6%; font-size: 1.1pc; margin-top: 1%;font-style: italic">
              课程作者：{{course.userName}}
            </div>
             <div style="margin-left: 6%; font-size: 1.1pc; margin-top: 1%;font-style: italic">
              购买数量：{{course.buyNum}}人
            </div>
            <div style="margin-left: 6%; font-size: 1.1pc; margin-top: 1%;font-style: italic">
              点赞数量：{{course.praiseNum}}人
            </div>
            <div style="margin-left: 6%; font-size: 1.1pc; margin-top: 1%;font-style: italic">
              浏览数量：{{course.viewNum}}人
            </div>
          </a>
        </el-col>
      </el-row>
    </div>
    <!-- 分页换页开始 -->
    <el-pagination
      class="pagiantion"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pagination.total"
      style="margin-top: 33%;"
      align="center"
    >
    </el-pagination>
    <!-- 分页换页结束 -->
  </div>
</template>

<script>
import course from '../../api/course';
import subject from "../../api/subject";
export default {
  layout: "default",
  data() {
    return {
      oneIdList: [], //一级标题集合
      twoIdList: [], //二级标题集合
       pagination: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 4, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
      courseList:[],//课程数组
    };
  },
  created() {
    this.initOneTitle();
    this.getCoureseInfo()
  },
  methods: {
    //分页查询
    getCoureseInfo(){
      course.getCoursePage(this.pagination).then(resp=>{
        this.pagination.total=resp.data.data.total
        this.courseList=resp.data.data.courseList
      })
    },
    handleCurrentChange(currentPage){
      this.pagination.currentPage=currentPage
      this.getCoureseInfo()
    },
    //二级标题筛选条件
    getCourseByTwoId(twoId){
      this.pagination.queryString=twoId
      this.getCoureseInfo()
    },
    //全部
    getAll(){
      this.pagination.queryString=null
      this.getCoureseInfo()
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
  },
};
</script>

<style>
.content {
  width: 100%;
  height: 21vh;
  box-shadow: 5px 5px 10px gray;
  background-color: rgb(228, 227, 210);
  float: none;
}
.course {
  width: 46%;
  height: 32vh;
  box-shadow: 5px 5px 10px gray;
  margin-top: 1%;
  margin-left: 2%;
  float: left;
  flex-wrap: wrap;
  border-radius: 20px;
}
</style>

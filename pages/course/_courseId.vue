<template>
  <div class="content4">
    <el-divider></el-divider>

    <div style="width: 100%">
      <el-row>
        <!-- 课程基本信息 -->
        <el-col :span="15">
          <el-row>
            <el-col :span="12">
              <img
                :src="course.cover"
                width="100%"
                style="height: 33vh; border-radius: 20px"
              />
            </el-col>
            <el-col :span="12">
              <div style="font-size: 1.2pc; margin-left: 6%">
                课程：{{ course.courseName }}
              </div>
              <div style="font-size: 1.2pc; margin-left: 6%">
                类型：{{ course.twoId }}
              </div>
              <div style="font-size: 1.2pc; margin-left: 6%">
                价格：{{ course.price }}元
              </div>
              <el-button
                style="margin-top: 13%; margin-left: 12%"
                round
                type="primary"
                v-if="course.price != 0&&flag==1"
                @click="buy(course.id)"
                >立即购买</el-button
              >
            </el-col>
          </el-row>
        </el-col>
        <!-- 作者基本信息 -->
        <el-col :span="9" align="left">
          <div class="box-card6">
            <img
              src="~/assets/photo/index/132.jpg"
              width="10%"
              style="border-radius: 50%"
              alt="userInfo"
            />
            <div style="margin-top: -10%; margin-left: 13%; font-size: 1.2pc">
              {{ user.name }}
            </div>
            <div style="border: 2px solid black; margin-top: 3%"></div>
            <div style="font-size: 1.1pc">作者码龄：{{ age }}天</div>
            <div style="font-size: 1.1pc" v-if="user.isVip == 1">
              作者等级：普通用户
            </div>
            <div style="font-size: 1.1pc" v-else>作者等级：vip用户</div>
            <div style="font-size: 1.1pc">
              课程发布时间：{{ course.createTime }}
            </div>
            <el-button
              round
              type="primary"
              @click="praiseCourse()"
              v-if="count == 0"
              >课程点赞</el-button
            >
            <el-button
              round
              type="primary"
              style="color: red"
              @click="praiseCourse()"
              v-else
              >课程点赞</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 课程描述-->
    <div class="box-card7" style="margin-top: 2%">
      <div
        style="font-size: 1.1pc; font-style: italic; font-weight: 800"
        align="center"
      >
        课程描述
      </div>
      <div style="border: 2px solid gray"></div>
      <div style="margin-left: 2%" v-html="course.courseDescription"></div>
    </div>
    <!-- 课时信息 -->
    <div>
      <div
        style="
          font-size: 1.1pc;
          font-weight: 901;
          margin-top: 3%;
        "
        align="center"
      >
        课时信息
      </div>
      <div style="border: 2px solid gray"></div>
      <el-card
        class="box-card8"
        v-for="chapter in chapterList"
        :key="chapter.id"
      >
        <el-row>
          <el-col :span="12">
            <div style="margin-top: 2%">{{ chapter.name }}</div>
          </el-col>
          <el-col :span="12" align="right">
            <el-button-group v-if="flag!=1">
              <el-button @click="watchVideo(chapter.url)">观看视频</el-button>
            </el-button-group>
          </el-col>
        </el-row>
      </el-card>
      <!-- 分页换页开始 -->
      <el-pagination
        class="pagiantion"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total"
        style="margin-top: 20%"
        align="center"
      >
      </el-pagination>
      <!-- 分页换页结束 -->
    </div>
  </div>
</template>

<script>
import course from "../../api/course";
import cookie from "js-cookie";
import coursepraise from "../../api/coursepraise";
import order from "../../api/order";
export default {
  asyncData({ params, error }) {
    return { courseId: params.courseId };
  },
  data() {
    return {
      pagination: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 6, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
      course: {}, //课程信息
      chapterList: [], //课时信息
      user: {}, //作者相关信息
      count: 0,
      userId: "",
      age: "", //码龄
      flag:1,//购买视频或免费后为2，1不可观看视频
    };
  },
  created() {
    this.getUserId();
    this.getCourseAndChapterAndUser();
    this.isPraise()
    this.isBuy()
  },
  methods: {
    watchVideo(id){
      this.$router.push({path:'/video/'+id})
    },
    //查询课程是否有购买记录,判断课程是否能观看
    isBuy(){
      order.getOrderByUserIdAndCourseId(this.userId,this.courseId).then(resp=>{
        this.flag=resp.data.data.flag
        console.log(this.flag)
      })
    },
    //立即购买
    buy(id){
      if(this.userId==''){
        this.$message.error("请等登录后再购买该课程")
        return
      }
      this.$router.push({path:'/order/'+id})
    },
    //获取用户id
    getUserId() {
      let user = cookie.get("blog_user");
      if (user) {
        var users = JSON.parse(user);
        this.userId = users.id;
      }
    },
    //查询信息
    getCourseAndChapterAndUser() {
      course
        .getCourseChapterUser(this.courseId, this.pagination)
        .then((resp) => {
          this.pagination.total = resp.data.data.total;
          this.user = resp.data.data.user;
          this.course = resp.data.data.course;
          this.chapterList = resp.data.data.chapterList;
          this.age = resp.data.data.age;
        });
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getCourseAndChapterAndUser();
    },
    //判断是否点赞过
    isPraise() {
      coursepraise
        .getCountByUserIdAndCourseId(this.courseId, this.userId)
        .then((resp) => {
          this.count = resp.data.data.count;
        });
    },
    //课程点赞
    praiseCourse() {
      if(this.userId==''){
        this.$message.error("请登录")
        return
      }
      coursepraise.praise(this.userId, this.courseId).then((resp) => {
        if (resp.data.success) {
          if(resp.data.data.count==1){
            this.$message.success("点赞成功")
          }else{
            this.$message.success("取消点赞成功")
          }
          this.count = resp.data.data.count;
        } else {
          this.$message.error(resp.data.message);
        }
      });
    },
  },
};
</script>
<style scoped>
.content4 {
  width: 100%;
}
.box-card6 {
  width: 100%;
  height: 33vh;
}
.box-card7 {
  width: 100%;
}
.box-card8 {
  width: 43%;
  height: 12vh;
  margin-left: 4%;
  border-radius: 20px;
  float: left;
  flex-wrap: wrap;
  margin-top: 1%;
}
</style>
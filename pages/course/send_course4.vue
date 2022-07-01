<template>
  <div>
    <el-steps
      style="margin-left: 15%; margin-top: 3%"
      :space="500"
      :active="3"
      finish-status="success"
    >
      <el-step title="课程信息填写"></el-step>
      <el-step title="课程描述信息"></el-step>
      <el-step title="课程章节信息"></el-step>
      <el-step title="确认信息发布"></el-step>
    </el-steps>

    <el-card class="box-card4">
      <el-row>
        <el-col :span="12">
          <img
            :src="course.cover"
            width="100%"
            style="height: 37vh; border-radius: 20px"
          />
          <div align="center">
            <el-button style="margin-top: 4%" type="primary" @click="on()">上一步</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="d1">课程名称：&nbsp;{{course.courseName}}</div>
          <div class="d1">课程作者：&nbsp;{{course.userName}}</div>
          <div class="d1">一级类别：&nbsp;{{course.oneId}}</div>
          <div class="d1">二级类别：&nbsp;{{course.twoId}}</div>
          <div class="d1">课程价格：&nbsp;{{course.price}}元</div>
          <div class="d1">总计课时：&nbsp;{{chapterCount}}课时</div>
          <div>
            <el-button type="primary" style="margin-top: 3%;margin-left: 8%;" @click="publish()">发布课程</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import course from '../../api/course';
export default {
  layout: "person",
  data() {
    return {
      userId: "",
      courseId: "",
      course:'',//课程信息
      chapterCount:'',//课时数量
    };
  },
  created() {
    this.userId = this.$route.query.id;
    this.courseId = this.$route.query.courseId;
    this.getCourseAnChapter()
  },
  methods: {
    //查询课程信息与课时数
    getCourseAnChapter(){
      course.getCourseAndChapter(this.courseId).then(resp=>{
        this.course=resp.data.data.course
        this.chapterCount=resp.data.data.chapterCount
      })
    },
    //上一步
    on(){
      this.$router.push({path:'/course/send_course3?id='+this.userId+'&courseId4='+this.courseId})
    },
    //发布课程
    publish(){
      course.publishCourse(this.courseId).then(resp=>{
        this.$message.success("发布成功")
        this.$router.push({path:'/course/main_course'})
      })
    },
  },
};
</script>



<style>
.box-card4 {
  width: 60%;
  height: 55vh;
  margin-left: 20%;
  margin-top: 3%;
  border-radius: 20px;
}
.d1 {
  font-size: 1.2pc;
  font-style: italic;
  margin-left: 8%;
  margin-top: 1%;
}
</style>
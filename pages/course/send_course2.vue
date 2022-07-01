<template>
  <div>
    <el-steps
      style="margin-left: 15%; margin-top: 3%"
      :space="500"
      :active="1"
      finish-status="success"
    >
      <el-step title="课程信息填写"></el-step>
      <el-step title="课程描述信息"></el-step>
      <el-step title="课程章节信息"></el-step>
      <el-step title="确认信息发布"></el-step>
    </el-steps>
    <div>
      <!-- 富文本编译器 -->
      <client-only>
        <VueEditor style="margin-top: 3%" v-model="courseDescription" />
      </client-only>
      <div style="margin-top: 2%">
        <el-row>
          <el-col :span="12" align="center">
            <el-button type="primary" @click="on()">上一步</el-button>
          </el-col>
          <el-col :span="12" align="center">
            <el-button type="primary" @click="next()">下一步</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
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
      courseDescription: "", //课程描述
      courseId3:'',//从第三步传回来的id
    };
  },
  created() {
    this.userId = this.$route.query.id;
    this.courseId = this.$route.query.courseId;
    if(this.$route.query.courseId3){
      this.courseId3=this.$route.query.courseId3
      this.getDescription()
    }
  },
  methods: {
    //回显课程描述信息
    getDescription(){
      course.getDescription(this.courseId3).then(resp=>{
          this.courseDescription=resp.data.data.courseDescription
      })
    },
    //上一步
    on(){
      if(this.courseId){
         this.$router.push({path:'/course/send_course?id='+this.userId+'&courseId='+this.courseId})
      }else{
        this.$router.push({path:'/course/send_course?id='+this.userId+'&courseId='+this.courseId3})
      }
       
    },
    //下一步
    next(){
      if(this.courseId3){
        this.update()
      }else{
        this.add()
      }
    },
    //添加课程修改信息
    add(){
      var param={
        courseDescription:this.courseDescription
      }
      course.updateCourseDescription(this.courseId,param).then(resp=>{
        if(resp.data.success){
            this.$message.success("添加成功")
            this.$router.push({path:'send_course3?id='+this.userId+'&courseId='+this.courseId})
        }else{
          this.$message.error(resp.data.message)
        }
      })
    },
    //修改课程信息
    update(){
      var param={
        courseDescription:this.courseDescription
      }
      course.updateDescriptionById(this.courseId3,param).then(resp=>{
        if(resp.data.success){
          this.$message.success("修改成功")
          this.$router.push({path:'send_course3?id='+this.userId+'&courseId='+this.courseId3})
        }else{
          this.$message.error(resp.data.message)
        }
      })
    }
  },
};
</script>
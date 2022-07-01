<template>
  <div>
    <el-steps
      style="margin-left: 15%; margin-top: 3%"
      :space="500"
      :active="0"
      finish-status="success"
    >
      <el-step title="课程信息填写"></el-step>
      <el-step title="课程描述信息"></el-step>
      <el-step title="课程章节信息"></el-step>
      <el-step title="确认信息发布"></el-step>
    </el-steps>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="课程标题">
          <el-input v-model="form.courseName"></el-input>
        </el-form-item>
        <el-form-item label="课程价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="课程类别">
          <el-select
            v-model="form.oneId"
            @change="getTwoByOneId(form.oneId)"
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
            v-model="form.twoId"
            collapse-tags
            style="margin-left: 190px"
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
        <el-form-item label="封面上传">
          <el-upload
            class="upload-demo"
            :action="BASE_API + '/ossservice/oss/upload'"
            :on-success="handleAvatarSuccess"
            :before-remove="beforeRemove"
            :limit="1"
            :file-list="fileLlist"
          >
            <el-button round>点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item style="margin-left: 30%">
          <el-button type="primary" @click="next()">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import subject from "../../api/subject";
import course from "../../api/course";
export default {
  layout: "person",
  data() {
    return {
      userId: "", //用户id
      form: {
        twoId: "",
        oneId: "",
      }, //表单信息
      oneIdList: [],
      twoIdList: [],
      fileList: [],
      BASE_API: "http://localhost:9001", // 接口API地址
      courseId: "", //有值为编辑，无值为添加
    };
  },
  created() {
    if (this.$route.query.courseId) {
      this.courseId = this.$route.query.courseId;
      this.getCourseInfo();
    }
    this.userId = this.$route.query.id;
    this.getOneTitle();
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
      this.form.twoId = "";
      for (var i = 0; i < this.oneIdList.length; i++) {
        var oneSubject = this.oneIdList[i];
        if (oneSubject.oneId === oneId) {
          this.twoIdList = oneSubject.child;
        }
      }
    },
    //图片上传成功
    handleAvatarSuccess(res, file) {
      console.log(res); // 上传响应
      this.form.cover = res.data.coverUrl;
      console.log("cover=" + this.form.cover);
    },
    //下一步
    next() {
      if(this.courseId){
        this.update()
      }else{
        this.add()
      }
    },
    //修改用户信息
    update(){
      course.updateCourseById(this.courseId,this.form).then(resp=>{
        if(resp.data.success){
          this.$message.success("修改成功")
           this.$router.push({
            path:
              "/course/send_course2?courseId3=" +
              this.courseId +
              "&id=" +
              this.userId,
          });
        }else{
          this.$message.error(resp.data.message)
        }
      })
    },
    //添加用户信息
    add(){
      course.saveCourse(this.userId, this.form).then((resp) => {
        if (resp.data.success) {
          this.$message.success("添加成功")
          this.$router.push({
            path:
              "/course/send_course2?courseId=" +
              resp.data.data.courseId +
              "&id=" +
              this.userId,
          });
        } else {
          this.$message.error(resp.data.message);
        }
      });
    },
    //回显数据基本信息
    getCourseInfo() {
      course.getCourseById(this.courseId).then((resp) => {
        this.form = resp.data.data.course;
        this.showTwoByOneId(this.form.oneId);
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
  },
};
</script>

<style>
.box-card {
  width: 60%;
  height: 60vh;
  margin-left: 18%;
  margin-top: 3%;
  border-radius: 20px;
  box-shadow: 5px 5px 10px gray;
}
</style>
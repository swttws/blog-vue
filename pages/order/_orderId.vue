<template>
  <div style="height: 87vh">
    <el-card class="box-card">
      <el-row>
        <el-col :span="12">
          <img
            :src="course.cover"
            width="100%"
            style="height: 45vh; border-radius: 20px; margin-top: 3%"
          />
        </el-col>
        <el-col :span="12">
          <div
            style="
              font-size: 1.2pc;
              margin-left: 6%;
              margin-top: 3%;
              font-weight: 700;
            "
          >
            课程名称：{{ course.courseName }}
          </div>
          <div
            style="
              font-size: 1.2pc;
              margin-left: 6%;
              font-weight: 700;
              margin-top: 2%;
            "
          >
            课程类型：{{ course.twoId }}
          </div>
           <div
            style="
              font-size: 1.2pc;
              margin-left: 6%;
              font-weight: 700;
              margin-top: 2%;
            "
          >
            课程作者：{{ course.userName }}
          </div>
          <div
            style="
              font-size: 1.2pc;
              margin-left: 6%;
              font-weight: 700;
              margin-top: 2%;
            "
          >
            课程价格：{{ course.price }}元
          </div>
          <el-button type="danger" style="margin-top: 11%; margin-left: 12%"
           @click="save()"
            >立即支付</el-button
          >
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import course from "../../api/course";
import subject from "../../api/subject";
import order from "@/api/order"
import cookie from "js-cookie";
export default {
  layout: "default",
  asyncData({ params, error }) {
    return { courseId: params.orderId };
  },
  data() {
    return {
      course: {}, //课程信息
      userId:'',
    };
  },
  created() {
    this.getUserId()
    this.getCourse();
  },
  methods: {
     //获取用户id
    getUserId() {
      let user = cookie.get("blog_user");
      if (user) {
        var users = JSON.parse(user);
        this.userId = users.id;
      }
    },
    //查询信息
    getCourse() {
      course.getCourseById(this.courseId).then((resp) => {
        this.course = resp.data.data.course;
        this.getTwoTitle();
      });
    },
    //根据二级id擦好查询二级标题
    getTwoTitle() {
      subject.getTitleByTwoId(this.course.twoId).then((resp) => {
        this.course.twoId = resp.data.data.type;
      });
    },
    //生成订单
    save(){
      order.saveOrder(this.course,this.userId).then(resp=>{
        if(resp.data.success){
          this.$message.success("购买课程成功")
          this.$router.push({path:'/course/'+this.course.id})
        }else{
          this.$message.error(resp.data.message)
        }
      })
    }
  },
};
</script>

<style>
.box-card {
  width: 80%;
  height: 60vh;
  margin-left: 10%;
  margin-top: 3%;
  border-radius: 20px;
}
</style>
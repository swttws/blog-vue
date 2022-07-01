<template>
  <div>
    <!-- 进度条 -->
    <div style="margin-top: 3%; margin-left: 27%">
      <el-steps :space="700" :active="0" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="文章信息"></el-step>
        <el-step title="内容编辑"></el-step>
      </el-steps>
    </div>
    <!-- 基本信息 -->
    <div style="width: 60%;margin-left: 20%;margin-top: 2%;">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户昵称">
          <el-input
            type="text"
            v-model="ruleForm.name"
            :disabled="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户创建时间">
          <el-input
            type="text"
            v-model="ruleForm.createTime"
            :disabled="true"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="信息修改时间" >
          <el-input v-model.number="ruleForm.updateTime" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户会员等级" >
          <el-input v-if="ruleForm.isVip==1" value="普通用户" :disabled="true"></el-input>
          <el-input v-else value="VIP用户" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label-width="350px">
           <el-button type="success" size="medium" @click="next()" plain>下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import user from '@/api/user';
export default {
  layout: "person",
  data() {
    return {
      userId: "", //用户id
      ruleForm:{},//用户信息表单确认
      articleId:'',//文章id
    };
  },
  created() {
    if(this.$route.query.articleId){
      this.articleId=this.$route.query.articleId
    }
    this.userId = this.$route.query.id;
    this.showUser()
  },
  methods: {
      //根据用户id获取用户信息
      showUser(){
          user.getUserById(this.userId).then(resp=>{
              this.ruleForm=resp.data.data.userInfo
          })
      },
      //下一步
      next(){
        if(this.articleId){
          this.$router.push({path:'/user/article2?id='+this.userId+'&articleId='+this.articleId})
        }else{
          this.$router.push({path:'/user/article2?id='+this.userId})
        }
          
      }
  },
};
</script>
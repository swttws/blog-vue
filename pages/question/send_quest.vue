<template>
  <div>
    <el-container>
      <el-divider></el-divider>
      <el-header style="height: 10vh; background-color: white">
        <el-row>
          <el-col :span="8">
            <el-select
              @change="getTwoByOneId(oneId)"
              v-model="oneId"
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
          </el-col>
          <el-col :span="8">
            <el-select
              v-model="twoId"
              collapse-tags
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
          </el-col>
          <el-col :span="8" align="right">
            <el-button type="primary" @click="sendQuest()" plain
              >发布问题</el-button
            >
          </el-col>
        </el-row>
      </el-header>

      <div style="margin-top: 3%">
        <el-row>
          <el-col :span="2" align="right">
            <div style="font-size: 1.4pc">标题：</div>
          </el-col>
          <el-col :span="21">
            <el-input v-model="title" placeholder="请输入问题标题"></el-input>
          </el-col>
        </el-row>
      </div>
      <div>
        <!-- 富文本编译器 -->
        <client-only>
          <VueEditor v-model="quest" />
        </client-only>
      </div>
    </el-container>
  </div>
</template>

<script>
import question from "@/api/question";
import subject from "../../api/subject";
export default {
  layout: "person",
  data() {
    return {
      oneId: "", ///选择一级id
      oneIdList: [], //一级id集合
      twoId: "", //选择的二级id
      twoIdList: [], //二级id集合
      quest: "", //问题
      userId: "", //用户id
      title: "", //问题标题
    };
  },
  created() {
    this.getOneTitle();
    if (this.$route.query) {
      this.userId = this.$route.query.id;
    }
  },
  methods: {
    //问题发布
    sendQuest() {
      var param = {
        userId: this.userId,
        title: this.title,
        quest: this.quest,
        oneId: this.oneId,
        twoId: this.twoId,
      };
      question.savequestion(param).then((resp) => {
        this.$message.success("发布成功")
        this.$router.push({path:'/question/main_quest'})
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
      this.twoId = "";
      for (var i = 0; i < this.oneIdList.length; i++) {
        var oneSubject = this.oneIdList[i];
        if (oneSubject.oneId === oneId) {
          this.twoIdList = oneSubject.child;
        }
      }
    },
  },
};
</script>
<template>
  <div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="12">
        <div align="center" style="font-size: 1.2pc; font-weight: 900">
          我发布的课程
        </div>
        <div style="border-right: solid 2px black; height: 70vh">
          <el-empty
            v-if="sendCourseList.length == 0"
            description="暂无发布课程"
          ></el-empty>
          <div v-else>
            <el-table
              :data="sendCourseList"
              border
              style="width: 100%; margin-top: 2%"
            >
              <el-table-column
                prop="courseName"
                align="center"
                label="课程名称"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="viewNum"
                align="center"
                label="浏览数量"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="buyNum"
                align="center"
                label="购买数量"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="praiseNum"
                align="center"
                label="点赞数量"
                width="80"
              ></el-table-column>
              <el-table-column
                prop="commentNum"
                align="center"
                label="评论数量"
                width="80"
              ></el-table-column>
              <el-table-column align="center" label="操作" width="132">
                <template slot-scope="scope">
                  <el-button
                    icon="el-icon-edit"
                    @click="updateCourse(scope.$index, scope.row)"
                    circle
                  ></el-button>
                  <el-popconfirm
                    title="确定删除该课程吗？"
                    @confirm="deleteCourse(scope.row)"
                  >
                    <el-button
                      slot="reference"
                      icon="el-icon-delete"
                      circle
                    ></el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页换页开始 -->
            <el-pagination
              class="pagiantion"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-size="pagination.pageSize"
              layout="total, prev, pager, next, jumper"
              :total="pagination.total"
              align="center"
            >
            </el-pagination>
            <!-- 分页换页结束 -->
          </div>
        </div>
      </el-col>
      <!-- 购买课程 -->
      <el-col :span="12">
        <div align="center" style="font-size: 1.2pc; font-weight: 900">
          我购买的课程
        </div>
        <el-empty
          v-if="buyCourseList.length == 0"
          description="暂无购买课程"
        ></el-empty>
        <div v-else>
          <el-table
            :data="buyCourseList"
            border
            style="width: 100%; margin-top: 2%"
          >
            <el-table-column
              prop="courseName"
              align="center"
              label="课程名称"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="coursePrice"
              align="center"
              label="课程价格"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="createTime"
              align="center"
              label="发布时间"
              width="170"
            ></el-table-column>
            <el-table-column align="center" label="操作" width="145">
              <template slot-scope="scope">
                <el-button round @click="goCourse(scope.row)">
                  进入课程</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页换页开始 -->
          <el-pagination
            class="pagiantion"
            @current-change="handleCurrentChange2"
            :current-page="pagination2.currentPage"
            :page-size="pagination2.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pagination2.total"
            align="center"
          >
          </el-pagination>
          <!-- 分页换页结束 -->
        </div>
      </el-col>
      <!-- 发布课程消息 -->
      <div style="position: absolute; left: 92%">
        <el-badge :value="msg" class="item">
          <el-button
            @click="drawer = true"
            icon="el-icon-chat-dot-round"
          ></el-button>
        </el-badge>
      </div>
      <!-- 课程消息弹框 -->
      <el-drawer
        size="44%"
        title="我是标题"
        :visible.sync="drawer"
        :with-header="false"
      >
        <div align="center" style="font-size: 1.2pc; font-weight: 800">
          我的消息
        </div>
        <el-card
          class="box-card10"
          v-for="praise in coursepraiseList"
          :key="praise.id"
        >
          <div>
            {{ praise.userName }}点赞了你发布的《{{ praise.courseName }}》课程
          </div>
          <div align="right">——{{ praise.createTime }}</div>
          <div
            style="margin-top: -12%; margin-left: 90%"
            v-if="praise.status == 1"
          >
            <el-badge :value="1" class="item">
              <el-button size="mini" @click="deleteMsg(praise.id)"
                >清除</el-button
              >
            </el-badge>
          </div>
        </el-card>
      </el-drawer>
      <!-- 发布课程消息结束 -->
      <!-- 购买课程消息 -->
      <div style="position: absolute; left: 2%">
        <el-badge :value="buyCountMsg" class="item">
          <el-button
            @click="drawer2 = true"
            icon="el-icon-shopping-cart-2"
          ></el-button>
        </el-badge>
      </div>
      <el-drawer
        size="44%"
        title="我是标题"
        :visible.sync="drawer2"
        :with-header="false"
        direction="ltr"
      >
        <div align="center" style="font-size: 1.2pc; font-weight: 800">
          课程购买的消息
        </div>
        <el-card
          class="box-card10"
          v-for="order in buyCourseMsg"
          :key="order.id"
        >
          <div>
            {{ order.userId }}购买了你发布的《{{ order.courseName }}》课程
          </div>
          <div align="right">——{{ order.createTime }}</div>
          <div
            style="margin-top: -12%; margin-left: 90%"
            v-if="order.status == 2"
          >
            <el-badge :value="1" class="item">
              <el-button size="mini" @click="deleteBuyMsg(order.id)"
                >清除</el-button
              >
            </el-badge>
          </div>
        </el-card>
      </el-drawer>
      <!-- 购买课程消息结束 -->
    </el-row>
  </div>
</template>

<script>
import course from "../../api/course";
import coursepraise from "../../api/coursepraise";
import order from "../../api/order";
export default {
  layout: "person",
  data() {
    return {
      drawer: false, //消息是否弹出
      sendCourseList: [], //我发布的课程
      buyCourseList: [], //我购买的课程
      courseList: [],
      chapterCount: [],
      pagination: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 4, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
      pagination2: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 4, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
      userId: "",
      msg: 0, //未读消息数
      coursepraiseList: [], //消息数组
      drawer2: false,
      buyCourseMsg:[],//被购买课程消息
      buyCountMsg:0,//未读消息数量
    };
  },
  created() {
    this.userId = this.$route.query.id;
    this.getSendCourse();
    this.getPraiseMsg(); //初始化课程消息
    this.getBuyCourse(); //查询购买课程
    this.getBuyCourseMsg()//初始化被购买课程消息
  },
  methods: {
    //被购买课程消息查询
    getBuyCourseMsg(){
      order.getOrderMsg(this.userId).then(resp=>{
        this.buyCourseMsg=resp.data.data.buyCourseMsg
        this.buyCountMsg=resp.data.data.buyCountMsg
      })
    },
    //清除未读消息
    deleteBuyMsg(id){
      order.updateOrderMsg(id).then(resp=>{
        this.getBuyCourseMsg()
      })
    },
    //进入课程详情页面
    goCourse(row) {
      this.$router.push({ path: "/course/" + row.courseId });
    },
    //查询购买课程
    getBuyCourse() {
      order.getPageOrderById(this.pagination2, this.userId).then((resp) => {
        this.buyCourseList = resp.data.data.buyCourseList;
        this.pagination2.total = resp.data.data.total;
      });
    },
    handleCurrentChange2(currentPage) {
      this.pagination2.currentPage = currentPage;
      this.getBuyCourse();
    },
    //清除未点赞消息
    deleteMsg(id) {
      coursepraise.updatePraiseMsgById(id).then((resp) => {
        this.$message.success("消息清除成功");
        this.getPraiseMsg();
        this.getSendCourse();
      });
    },
    //查询点赞消息
    getPraiseMsg() {
      coursepraise.getPraiseByUserId(this.userId).then((resp) => {
        this.coursepraiseList = resp.data.data.coursepraiseList;
        this.msg = resp.data.data.msg;
      });
    },
    //查询发布课程
    getSendCourse() {
      course
        .getPageCourseByUserId(this.pagination, this.userId)
        .then((resp) => {
          this.pagination.total = resp.data.data.total;
          this.sendCourseList = resp.data.data.sendCourseList;
        });
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getSendCourse();
    },
    //编辑课程
    updateCourse(index, row) {
      this.$router.push({
        path: "/course/send_course?id=" + this.userId + "&courseId=" + row.id,
      });
    },
    //删除课程
    deleteCourse(row) {
      course.deleteCourseAndChapter(row.id).then((resp) => {
        this.$message.success("删除成功");
        this.getSendCourse();
      });
    },
  },
};
</script>

<style>
.box-card10 {
  width: 90%;
  margin-left: 5%;
  margin-top: 2%;
  height: 14vh;
}
</style>
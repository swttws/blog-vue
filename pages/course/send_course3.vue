<template>
  <div>
    <el-steps
      style="margin-left: 15%; margin-top: 3%"
      :space="500"
      :active="2"
      finish-status="success"
    >
      <el-step title="课程信息填写"></el-step>
      <el-step title="课程描述信息"></el-step>
      <el-step title="课程章节信息"></el-step>
      <el-step title="确认信息发布"></el-step>
    </el-steps>

    <el-card class="box-card">
      <div align="center">
        <el-button round @click="edit()">添加小节</el-button>
      </div>
      <el-card
        class="box-card1"
        v-for="chapter in chapterList"
        :key="chapter.id"
      >
        <el-row>
          <el-col :span="12">
            <div style="margin-top: 2%">{{ chapter.name }}</div>
          </el-col>
          <el-col :span="12" align="right">
            <el-button-group>
              <el-button
                icon="el-icon-edit"
                @click="editChapter(chapter.id)"
              ></el-button>
              <el-popconfirm
                title="确定删除该小节吗？"
                @confirm="deleteChapter(chapter.id)"
              >
                <el-button icon="el-icon-delete" slot="reference"></el-button>
              </el-popconfirm>
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
        align="center"
      >
      </el-pagination>
      <!-- 分页换页结束 -->
      <!-- 下一步，上一步按钮 -->
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
    </el-card>

    <!-- 添加章节对话框 -->
    <el-dialog title="添加课时" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="课时名称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="课时序号" :label-width="formLabelWidth">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <!-- 视频 -->
        <el-form-item label="上传视频" :label-width="formLabelWidth">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API + '/vodservice/uploadVideo'"
            :limit="1"
            class="upload-demo"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，<br />
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br />
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br />
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br />
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加章节对话框 -->
  </div>
</template>

<script>
import chapter from "@/api/chapter";
export default {
  layout: "person",
  data() {
    return {
      dialogFormVisible: false, //添加章节对话框
      form: {
        courseId: "",
        url:''
      },
      courseId: "",//页面2传入
      userId: "",
      formLabelWidth: "100px",
      pagination: {
        //分页相关模型数据
        currentPage: 1, //当前页码
        pageSize: 2, //每页显示的记录数
        total: 0, //总记录数
        queryString: null, //查询条件
      },
      chapterList: [], //小节数据
      BASE_API:'http://localhost:9001',
      fileList:[],
    };
  },
  created() {
    this.userId = this.$route.query.id;
    this.courseId = this.$route.query.courseId;
    if(this.$route.query.courseId4){
      this.courseId=this.$route.query.courseId4
    }
    this.getChapterInfo();
  },
  methods: {
    //视频上传成功后
    handleVodUploadSuccess(response, file, fileList) {
      this.form.url = response.data.videoId;
      console.log("url="+this.form.url)
    },
    //视图上传多于一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning("想要重新上传视频，请先删除已上传的视频");
    },
    editChapter(chapterId) {
      chapter.getChapterById(chapterId).then((resp) => {
        this.form = resp.data.data.chapter;
        this.dialogFormVisible = true;
      });
    },
    //分页查询课时信息
    getChapterInfo() {
      chapter.getPageChapter(this.courseId, this.pagination).then((resp) => {
        this.pagination.total = resp.data.data.total;
        this.chapterList = resp.data.data.chapterList;
      });
    },
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.getChapterInfo();
    },
    addOrUpdate() {
      if (this.form.id) {
        this.update();
      } else {
        this.add();
      }
    },
    //打开小节
    edit() {
      this.fileList=[]
      this.form = {};
      this.dialogFormVisible = true;
    },
    //添加小节
    add() {
      this.form.courseId = this.courseId;
      chapter.addChapter(this.form).then((resp) => {
        if (resp.data.success) {
          this.$message.success("添加成功");
          this.dialogFormVisible = false;
          this.getChapterInfo();
        } else {
          this.$message.error(resp.data.message);
        }
      });
    },
    //修改小节
    update() {
      chapter.updateChapterById(this.form).then((resp) => {
        if (resp.data.success) {
          this.$message.success("修改课时信息成功");
          this.dialogFormVisible = false;
          this.getChapterInfo();
        } else {
          this.$message.error(resp.data.message);
        }
      });
    },
    //删除小节
    deleteChapter(chapterId) {
      chapter.deleteById(chapterId).then((resp) => {
        this.$message.success("删除课时成功");
        this.getChapterInfo();
      });
    },
    //上一步
    on(){
      this.$router.push({path:'/course/send_course2?id='+this.userId+'&courseId3='+this.courseId})
    },
    //下一步
    next(){
      this.$router.push({path:'/course/send_course4?id='+this.userId+'&courseId='+this.courseId})
    }
  },
};
</script>

<style>
.box-card {
  width: 50%;
  margin-left: 25%;
  margin-top: 2%;
}
.box-card1 {
  width: 100%;
  height: 12vh;
  margin-top: 2%;
  border-radius: 20px;
}
</style>
<template>
  <div>
    <el-container>
      <div class="aside">
        <div class="but">
          <el-button type="primary" plain @click="count1()"
            >总数据汇总分析</el-button
          >
        </div>
        <div class="but">
          <el-button type="primary" @click="count2()" plain
            >近七天点赞量分析</el-button
          >
        </div>
        <div class="but">
          <el-button type="primary" @click="count3()" plain
            >近七天评论数分析</el-button
          >
        </div>
        <div class="but">
          <el-button type="primary" @click="count4()" plain
            >近七天发布数分析</el-button
          >
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="main">
        <!--  总数据汇总分析-->
        <div class="stas" v-show="sta1">
          <div style="font-weight: 800; font-size: 1.3pc">总数据汇总分析</div>
          <div
            style="
              margin-top: 3%;
              height: 20vh;
              width: 100%;
              box-shadow: 5px 5px 10px gray;
              background-color: white;
              border-radius: 20px;
            "
          >
            <el-row>
              <el-col :span="8" align="center">
                <div style="font-size: 1.2pc; font-weight: 600">总文章数</div>
                <div>{{ blogNum }}</div>
              </el-col>
              <el-col :span="8" align="center">
                <div style="font-size: 1.2pc; font-weight: 600">总课程数</div>
                <div>{{ courseNum }}</div>
              </el-col>
              <el-col :span="8" align="center">
                <div style="font-size: 1.2pc; font-weight: 600">总问题数</div>
                <div>{{ questionNum }}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" align="center">
                <div style="font-size: 1.2pc; font-weight: 600">总点赞数</div>
                <div>{{ praiseNum }}</div>
              </el-col>
              <el-col :span="8" align="center">
                <div style="font-size: 1.2pc; font-weight: 600">总评论数</div>
                <div>{{ commentNum }}</div>
              </el-col>
              <el-col :span="8" align="center">
                <div style="font-size: 1.2pc; font-weight: 600">总浏览数</div>
                <div>{{ readNum }}</div>
              </el-col>
            </el-row>
          </div>
          <div
            id="echart1"
            style="width: 100%; height: 50vh; margin-top: 3%"
          ></div>
        </div>
        <!-- 近七天点赞量分析 -->
        <div class="stas" v-show="sta2">
          <div style="font-weight: 800; font-size: 1.3pc">近七天点赞数分析</div>
          <div
            id="echart2"
            style="width: 100%; height: 60vh; margin-top: 3%"
          ></div>
        </div>
        <!-- 近七天评论数分析 -->
        <div class="stas" v-show="sta3">
          <div style="font-weight: 800; font-size: 1.3pc">近七天评论数分析</div>
          <div
            id="echart3"
            style="width: 100%; height: 60vh; margin-top: 3%"
          ></div>
        </div>
        <!-- 近七天发布数分析 -->
        <div class="stas" v-show="sta4">
          <div style="font-weight: 800; font-size: 1.3pc">近七天发布数分析</div>
          <div
            id="echart4"
            style="width: 100%; height: 60vh; margin-top: 3%"
          ></div>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import echarts from "echarts";
import sta from "../../api/sta";
export default {
  layout: "person",
  data() {
    return {
      userId: "",
      sta1: true,
      //总数据
      courseNum: 0,
      blogNum: 0,
      questionNum: 0,
      readNum: 0,
      commentNum: 0,
      praiseNum: 0,
      sta2: false,
      //近七天点赞数
      dateList: [],
      readNumList: [],
      sta3: false,
      commentNumList: [],
      dateList2: [],
      sta4: false,
      sendList:[],
    };
  },
  created() {
    this.userId = this.$route.query.id;
  },
  mounted() {
    this.count1();
  },
  methods: {
    // 总数据分析
    count1() {
      this.sta1 = true;
      this.sta2 = false;
      this.sta3 = false;
      this.sta4 = false;
      sta.countAllNum(this.userId).then((resp) => {
        this.courseNum = resp.data.data.courseNum;
        this.blogNum = resp.data.data.blogNum;
        this.questionNum = resp.data.data.questionNum;
        this.readNum = resp.data.data.readNum;
        this.commentNum = resp.data.data.commentNum;
        this.praiseNum = resp.data.data.praiseNum;
        this.initEchart1();
      });
    },
    initEchart1() {
      var myChart = echarts.init(document.getElementById("echart1"));
      myChart.setOption({
        title: {
          text: "总数据分析",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: [
            "总课程数",
            "总文章数",
            "总提问数",
            "总浏览数",
            "总评论数",
            "总点赞数",
          ],
        },
        series: [
          {
            name: "人数",
            type: "bar",
            data: [
              this.courseNum,
              this.blogNum,
              this.questionNum,
              this.readNum,
              this.commentNum,
              this.praiseNum,
            ],
          },
        ],
      });
    },
    //近七天阅读量分析
    count2() {
      this.sta1 = false;
      this.sta2 = true;
      this.sta3 = false;
      this.sta4 = false;
      sta.countReadNum(this.userId).then((resp) => {
        this.dateList = resp.data.data.dateList;
        this.readNumList = resp.data.data.readNumList;
        this.initEchart2();
      });
    },
    initEchart2() {
      var myChart = echarts.init(document.getElementById("echart2"));
      myChart.setOption({
        xAxis: {
          type: "category",
          data: this.dateList,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.readNumList,
            type: "line",
            smooth: true,
          },
        ],
      });
    },
    //近七天评论数分析
    count3() {
      this.sta1 = false;
      this.sta2 = false;
      this.sta3 = true;
      this.sta4 = false;
      sta.countComment(this.userId).then((resp) => {
        this.dateList2 = resp.data.data.dateList2;
        this.commentNumList = resp.data.data.commentNumList;
        this.initEchart3();
      });
    },
    initEchart3() {
      var chartDom = document.getElementById("echart3");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        xAxis: {
          type: "category",
          data: this.dateList2,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.commentNumList,
            type: "line",
          },
        ],
      };
      myChart.setOption(option);
    },
    //近七天发布数
    count4() {
      this.sta1 = false;
      this.sta2 = false;
      this.sta3 = false;
      this.sta4 = true;
      sta.countSend(this.userId).then(resp=>{
        this.sendList=resp.data.data.sendList
        this.initChart4();
      })
      
    },
    initChart4() {
      var chartDom = document.getElementById("echart4");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        title: {
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: this.sendList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style>
.but {
  margin-top: 20%;
}
.stas {
  background-color: #e9eef3;
  height: 80vh;
  width: 80%;
  margin-left: 10%;
}
.aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height: 87vh;
  width: 20%;
}

.main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 87vh;
  width: 80%;
}
</style>
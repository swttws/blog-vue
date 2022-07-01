<template>
  <div style="height: 90vh">
    <!-- 阿里云视频播放器样式 -->
    <link
      rel="stylesheet"
      href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css"
    />
    <!-- 阿里云视频播放器脚本 -->
    <script
      charset="utf-8"
      type="text/javascript"
      src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"
    />

    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player" />
  </div>
</template>

<script>
import vod from "../../api/vod";
export default {
  asyncData({ params, error }) {
    return vod.getVideoPlayAuth(params.videoId).then((response) => {
      return {
        vid: params.videoId,
        playAuth: response.data.data.playAuth,
      };
    });
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  mounted() {
    new Aliplayer(
      {
        id: "J_prismPlayer",
        vid: this.vid, // 视频id
        playauth: this.playAuth, // 播放凭证
        width: "100%",
        height: "500px",
      },
      function (player) {
        console.log("播放器创建成功");
      }
    );
  },
};
</script>
<template>
  <div>
    <section class="container">
      <quill-editor v-if="isClient" v-model="content"> </quill-editor>
    </section>
  </div>
</template>


<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  props: {
    blog: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isClient: false,
      content: "",
      editorOption: {
        // some quill options
        modules: {
          // toolbar: true
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"][{ font: [] }],
            [{ align: [] }],
          ],
        },
      },
    };
  },
  mounted() {
    if (process.client) {
      const { quillEditor } = require("vue-quill-editor");
      this.$options.components = { quillEditor };
      this.isClient = true;
    }
  },
  watch: {
    //子组件传值给父组件
    content(n, o) {
      this.$emit("func", n);
    },
    //父组件给子组件默认值
    blog(n, o) {
      this.blog = n;
      this.content = this.blog;
    },
  },
  methods: {
    onEditorBlur(editor) {},
    onEditorFocus(editor) {},
    onEditorReady(editor) {},
    onEditorChange({ editor, html, text }) {},
  },
};
</script>
<style  scoped>
.container {
  width: 100%;
  margin: 0 0 0 20px;
  padding: 20px 0px;
  background-color: #ffffff;
}

.title {
  padding-bottom: 20px;
  background-color: transparent;
}
.title-box {
  height: 4rem;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
}
.publish-article {
  margin-top: 20px;
  background-color: #48c774;
  color: #ffffff;
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>

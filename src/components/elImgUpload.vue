<template>
  <div class="el-img-upload-container">
    <div
      class="el-img-upload"
      :class="{ 'limit-num': fileList.length >= limit, mini: size === 'small' }"
    >
      <el-upload
        :action="url"
        :file-list="fileList"
        :limit="limit"
        list-type="picture-card"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :on-preview="handlePictureCardPreview"
        :before-upload="beforeAvatarUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <p v-if="tips">{{ tips }}</p>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElImgUpload",
  componentName: "ElImgUpload",
  data() {
    return {
      url: `${window.baseURI}news/v1/upload`,
      dialogImageUrl: "",
      fileList: [],
      dialogVisible: false,
    };
  },
  props: {
    value: {
      type: [String, Array],
    },
    tips: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "medium", // small
    },
    limit: {
      type: Number,
      default: 2,
    },
    limitSize: {
      type: Number,
      default: 10,
    },
    valueType: {
      type: String,
      default: "String", // Object
    },
    // 是否校验图片尺寸，默认不校验
    isCheckPicSize: {
      type: Boolean,
      default: false,
    },
    checkWidth: {
      type: Number,
      default: 0,
    },
    checkHeight: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    value: {
      deep: true,
      handler: function (val, oldVal) {
        if (val) {
          const res = this.isString(this.value);
          if (res === true) {
            this.fileList = [
              {
                url: val,
              },
            ];
          } else if (this.valueType === "Object") {
            this.fileList = this.value.map((item) => ({
              url: item.url,
              name: item.name,
            }));
          } else {
            this.fileList = this.value.map((item) => ({ url: item }));
          }
        } else {
          this.fileList = [];
        }
      },
    },
  },
  created() {
    if (this.value) {
      const res = this.isString(this.value);
      if (res === true) {
        this.fileList = [
          {
            url: this.value,
          },
        ];
      } else if (this.valueType === "Object") {
        this.fileList = this.value.map((item) => ({
          url: item.url,
          name: item.name,
        }));
      } else {
        this.fileList = this.value.map((item) => ({ url: item }));
      }
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const imgType = file.type;
      const isLtSize = file.size / 1024 / 1024 < this.limitSize;
      let isType = true;
        //   if (
        //     ["image/png", "image/jpeg", "image/jpg", "image/gif"].indexOf(
        //       imgType
        //     ) === -1
        //   ) {
        //     isType = false;
        //     this.$message.error("上传图片只能是 JPG、PNG、GIF格式!");
        //   }
        //   if (!isLtSize) {
        //     this.$message.error(`上传图片大小不能超过${this.limitSize}MB!`);
        //   }
    //   if (this.isCheckPicSize === true) {
    //     console.log(
    //       "checkWidth,checkHeight",
    //       this.checkWidth,
    //       this.checkHeight
    //     );
    //     const width = this.checkWidth;
    //     const height = this.checkHeight;
    //     const isSize = new Promise(function (resolve, reject) {
    //       // window对象，将blob或file读取成一个url
    //       const _URL = window.URL || window.webkitURL;
    //       const img = new Image();
    //       // image对象的onload事件，当图片加载完成后执行的函数
    //       img.onload = function () {
    //         const valid = img.width === width && img.height === height;
    //         valid ? resolve() : reject(new Error("error"));
    //       };
    //       img.src = _URL.createObjectURL(file);
    //     }).then(
    //       () => {
    //         return file;
    //       },
    //       () => {
    //         this.$message.error("图片尺寸限制为" + width + "x" + height + "！");
    //         return Promise.reject(new Error("error"));
    //       }
    //     );
    //     return isType && isLtSize && isSize;
    //   } else {
    //     return isType && isLtSize;
    //   }
    return isType && isLtSize;
    },
    // 判断是否是String
    isString(str) {
      return str instanceof String || (typeof str).toLowerCase() === "string";
    },
    handleRemove(file, fileList) {
      this.$emit("input", "");
      this.exportImg(fileList);
    },
    handleSuccess(res, file, fileList) {
      this.exportImg(fileList);
    },
    handleError(err, file, fileList) {
      console.log(err);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    exportImg(fileList = []) {
      this.fileList = fileList;
      if (fileList.length !== 0) {
        const res = this.isString(this.value);
        if (res === true) {
          this.$emit("input", fileList[0].response.url);
        } else if (this.valueType === "Object") {
          const imgs = fileList.map((item) => {
            if (item.response && item.response.url) {
              item.url = item.response.url;
              item.name = item.response.title;
            }
            return {
              url: item.url,
              name: item.name,
            };
          });
          this.$emit("input", imgs);
        } else {
          const imgs = fileList.map((item) => {
            if (item.response && item.response.url) {
              item.url = item.response.url;
            }
            return item.url;
          });
          this.$emit("input", imgs);
        }
      }
    },
  },
};
</script>

<style lang='less'>
.el-img-upload&&.limit-num {
  .el-upload--picture-card {
    display: none !important;
  }
}
.el-img-upload&&.mini {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload-list__item {
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .el-upload-list__item-status-label {
    right: -24px;
    line-height: 0px;
    // text-align: left;
    i {
      position: relative;
      top: 0px;
      left: -6px;
    }
  }
  .el-upload--picture-card {
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
}
</style>

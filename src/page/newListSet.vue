<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="4">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="110px"
          class="demo-formData"
        >
          <el-form-item label="标题" prop="tit">
            <el-input
              v-model="formData.tit"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="time">
            <el-date-picker
              v-model="formData.time"
              type="date"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="类型" prop="type">
            <el-select
              v-model="formData.list_type"
              placeholder="请选择类型"
              @change="changeListType"
            >
              <el-option
                v-for="item in listTypeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <el-select v-model="formData.type" placeholder="请选择类型">
              <el-option
                v-for="item in typeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否置顶" prop="isTop">
            <el-select v-model="formData.isTop" placeholder="请选择">
              <el-option
                v-for="item in isTopArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="封面">
            <el-radio-group v-model="formData.isPicLink">
              <el-radio :label="1">外链</el-radio>
              <el-radio :label="0">非外链</el-radio>
            </el-radio-group>

            <div class="b1" v-if="formData.isPicLink === 1">
              <el-form-item prop="outAvatar">
                <el-input
                  v-model="formData.pic"
                  placeholder="请输入封面链接"
                ></el-input>
              </el-form-item>
            </div>
            <div class="b1" v-if="formData.isPicLink === 0">
              <el-upload
                class="avatar-uploader"
                action="123"
                :show-file-list="false"
                :on-change="onchange"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="formData.pic" :src="formData.pic" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </el-form-item>

          <el-form-item label="内容" prop="tit">
            <el-radio-group v-model="formData.isLink">
              <el-radio :label="1">外链</el-radio>
              <el-radio :label="0">非外链</el-radio>
            </el-radio-group>

            <div class="b1" v-if="formData.isLink === 1">
              <el-input v-model="formData.link"></el-input>
            </div>
            <div class="b1" v-if="formData.isLink === 0">
              <script id="container" name="content" type="text/plain">
                这里写你的初始化内容
              </script>
            </div>
          </el-form-item>

          <el-form-item class="button_submit">
            <el-button type="primary" @click="submitForm('formData')"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from "@/components/headTop";
// import { cityGuess, addShop, searchplace, foodCategory } from "@/api/getData";
import { baseUrl, baseImgPath } from "@/config/env";

export default {
  data() {
    return {
      // 提交的数据
      formData: {
        tit: "", // 标题
        time: "", // 时间
        list_type: "", // 大类
        type: "", // 小类
        isTop: "", // 是否置顶
        isPicLink: 1, // 封面是否外链
        pic: "", // 封面链接
        isLink: 1, // 文章内容是否外链
        content: "" // 文章内容链接
      },
      // 校验规则
      rules: {
        tit: [{ required: true, message: "请输入标题", trigger: "blur" }],
        name: [{ required: true, message: "请输入作者", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        isTop: [{ required: true, message: "请选择是否置顶", trigger: "blur" }],
        pic: [{ required: true, message: "请输入图片链接", trigger: "blur" }],
        time: [{ required: true, message: "请输入时间", trigger: "blur" }]
      },
      // 大类型
      listTypeArr: [
        {
          value: "dblz",
          label: "代表履职"
        },
        {
          value: "rddt",
          label: "人大动态"
        }
      ],
      // 小类型数据
      typeArr: "",
      radio: "1",
      radio2: "1",
      isTopArr: [
        {
          value: 0,
          label: "非置顶"
        },
        {
          value: 1,
          label: "置顶"
        }
      ]
    };
  },
  components: {
    headTop
  },
  mounted() {
    this.getRouterParams();
    this.initUe();
  },
  methods: {
    // 获取路由的传参参数
    getRouterParams(type, row) {
      var type = this.$route.params.type;
      console.log(" type", type);
      if (type === "修改") {
        console.log(this.$route.params.row);
        this.formData = this.$route.params.row;

        this.formData.avatarStatus = "本地上传";
        this.formData.intAvatar = this.$route.params.row.avatar;

        console.log("this.formData", this.formData);
      }
    },
    changeListType(value) {
      if (value === "dblz") {
        this.typeArr = [
          { value: "scdy", label: "视察调研" },
          { value: "dbfc", label: "代表风采" }
        ];
      } else if (value === "rddt") {
        this.typeArr = [
          { value: "ywsd", label: "要闻速递" },
          { value: "jygg", label: "决议公告" }
        ];
      }
    },
    // 提交数据
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //   Object.assign(
          //     this.formData,
          //     { activities: this.activities },
          //     {
          //       category: this.selectedCategory.join("/"),
          //     }
          //   );
        } else {
          this.$notify.error({
            title: "错误",
            message: "请检查输入是否正确",
            offset: 100
          });
          return false;
        }
      });
    },
    // 初始化百度编辑器
    initUe() {
      var ue = UE.getEditor("container"),
        that = this;
      // 监听百度编辑器的内容变化
      ue.addListener("contentChange", function(editor) {
        var txt = ue.getContentTxt();
        console.log(txt);
        that.formData.intContent = txt;
      });
    },
    // listenRadio() {
    // 	var contentUrl = document.getElementsByClassName('contentUrl');
    // 	contentUrl.click(function() {
    // 		console.log(111);
    // 	})
    // }

    // 图片上传之前
    beforeAvatarUpload(file) {
      return false; // 屏蔽了action的默认上传
    },
    // 当上传图片后，调用onchange方法，获取图片本地路径
    onchange(file, fileList) {
      var _this = this;
      var event = event || window.event;
      console.log("event.target", event.target.files[0]);
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) {
        console.log("e.target.result", e.target.result);
        _this.formData.pic = e.target.result; // 将图片路径赋值给src
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.button_submit {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
.el-table .info-row {
  background: #c9e5f5;
}

.el-table .positive-row {
  background: #e2f0e4;
}
</style>

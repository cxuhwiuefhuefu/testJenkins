<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px">
      <el-col :offset="2">
        <el-button type="primary" @click="$router.back(-1)">返回</el-button>
      </el-col>
      <el-col :span="12" :offset="4">
        <el-form
          :model="formData"
          :rules="rules"
          ref="formData"
          label-width="110px"
          class="demo-formData"
        >
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

          <el-form-item label="姓名" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="职务" prop="position">
            <el-input
              v-model="formData.position"
              placeholder="请输入职务"
            ></el-input>
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
// 引入导航栏头部组件
import headTop from "@/components/headTop";
import { baseUrl, baseImgPath } from "@/config/env";

export default {
  data() {
    return {
      // 提交的数据
      formData: {},
      // 校验规则
      rules: {
        pic: [{ required: true, message: "请上传头像", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        position: [{ required: true, message: "请输入职务", trigger: "blur" }]
      }
    };
  },
  components: {
    headTop
  },
  mounted() {
    this.getRouterParams();
  },
  methods: {
    // 提交数据
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // Object.assign(
          //   this.formData,
          //   { activities: this.activities },
          //   {
          //     category: this.selectedCategory.join("/"),
          //   }
          // );
          // try {
          //   let result = await addShop(this.formData);
          //   if (result.status == 1) {
          //     this.$message({
          //       type: "success",
          //       message: "添加成功",
          //     });
          //     this.formData = {
          //       name: "", //店铺名称
          //       address: "", //地址
          //       latitude: "",
          //       longitude: "",
          //       description: "", //介绍
          //       phone: "",
          //       promotion_info: "",
          //       float_delivery_fee: 5, //运费
          //       float_minimum_order_amount: 20, //起价
          //       is_premium: true,
          //       delivery_mode: true,
          //       new: true,
          //       bao: true,
          //       zhun: true,
          //       piao: true,
          //       startTime: "",
          //       endTime: "",
          //       image_path: "",
          //       business_license_image: "",
          //       catering_service_license_image: "",
          //     };
          //     this.selectedCategory = ["快餐便当", "简餐"];
          //     this.activities = [
          //       {
          //         icon_name: "减",
          //         name: "满减优惠",
          //         description: "满30减5，满60减8",
          //       },
          //     ];
          //   } else {
          //     this.$message({
          //       type: "error",
          //       message: result.message,
          //     });
          //   }
          //   console.log(result);
          // } catch (err) {
          //   console.log(err);
          // }
          if (!this.formData.outAvatar && !this.formData.intAvatar) {
            this.$message("请填写头像链接或本地上传头像");
          }
          console.log("提交成功了");
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
        _this.formData.intAvatar = e.target.result; // 将图片路径赋值给src
      };
      reader.readAsDataURL(file);
    },
    // 获取路由的传参参数
    getRouterParams(type, row) {
      var type = this.$route.params.type;
      var that = this;
      if (type === "修改") {
        that.$nextTick(function() {
          that.formData = that.$route.params.row;
        });
      } else if (type === "添加") {
        that.$nextTick(function() {
          that.formData = {
            pic: "", // 图片链接
            isPicLink: 1, //
            name: "", // 姓名
            position: "" // 职务
          };
        });
      }
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

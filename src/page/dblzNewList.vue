<template>
  <div class="fillcontain">
    <head-top></head-top>
        11
    <img src="../assets/logo.png">

    <el-row :gutter="2">
      <el-col :offset="1" :span="6">
        <el-button type="primary" @click="handleEdit('添加')">添加</el-button>
      </el-col>
      <el-col :span="12">
        类型选择：
        <el-select v-model="type" placeholder="请选择" @change="selectType">
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <div class="table_container">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="id" label="序号"> </el-table-column>
        <el-table-column prop="pic" label="图片">
          <template slot-scope="scope">
            <img
              :src="scope.row.pic"
              alt=""
              style="width: 36px; height: 36px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="link tit" label="标题">
          <template slot-scope="scope">
            <a :href="scope.row.link" style="text-decoration: underline">{{
              scope.row.tit
            }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="time" label="添加时间"> </el-table-column>
        <el-table-column prop="isTop" label="是否置顶"> </el-table-column>
        <el-table-column prop="online" label="状态"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-switch
              @change="handleEdit('状态改变', scope.$index, scope.row)"
              v-model="scope.row.handleStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>

            <el-button
              size="mini"
              @click="handleEdit('修改', scope.$index, scope.row)"
              >修改</el-button
            >

            <el-button
              v-if="scope.row.isFrezz === 0"
              size="mini"
              type="success"
              @click="handleEdit('是否冻结', scope.$index, scope.row)"
              >冻结</el-button
            >

            <el-button
              v-if="scope.row.isFrezz === 1"
              size="mini"
              type="danger"
              @click="handleEdit('是否冻结', scope.$index, scope.row)"
              >解冻</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <pagination @handlePage="handlePage"></pagination>
    </div>
  </div>
</template>


<script>
import headTop from "../components/headTop";
import { getNewList, articleSwitchStatue } from "@/api/getData";
// 引入分页组件
import pagination from "@/components/pagination";

export default {
  data() {
    return {
      list_type: "dblz", // 当前选中的大类
      type: "dbysh", // 当前选中的小类
      start: 0, // 当前页面数
      listTypeArr: {
        dblz: "代表履职",
        rddt: "人大动态"
      },
      tableData: [], // 列表数据

      isTopArr: ["非置顶", "置顶"],
      isOnlineArr: {
        off: "下线",
        on: "上线"
      },
      isContraryOnlineArr: {
        下线: "off",
        上线: "on"
      },
      // isOnlineArr
      typeArr: {
        dbysh: "代表议事会",
        scdy: "视察调研",
        dbfc: "代表风采",
        dhqj: "大会期间",
        bhqj: "闭会期间",
        bljy: "办理建议",
        xwsd: "新闻速递",
        jygg: "决议公告",
        rsrm: "人事任免",
        gzjx: "工作简讯",
        mtgz: "媒体关注"
      },
      handleStatusArr: {
        on: true,
        off: false
      },
      selectOptions: [
        {
          value: "dbysh",
          label: "代表议事会"
        },
        {
          value: "scdy",
          label: "视察调研"
        },
        {
          value: "dbfc",
          label: "代表风采"
        },
        {
          value: "dhqj",
          label: "大会期间"
        },
        {
          value: "bhqj",
          label: "闭会期间"
        },
        {
          value: "bljy",
          label: "办理建议"
        }
      ]
    };
  },
  components: {
    headTop,
    pagination
  },
  created() {
    this.initData();
  },
  methods: {
    // 初始化
    async initData() {
      this.getNewsData();
      // this.getNewsData(this.list_type, this.type, this.start);
    },
    // 请求获取新闻数据并填充
    getNewsData(list_type, type, start) {
      var _this = this;
      try {
        getNewList({ list_type, type, start })
          .then(function(response) {
            console.log("response", response);
            response.forEach(ele => {
              ele.type = _this.typeArr[ele.type];
              ele.isTop = _this.isTopArr[ele.isTop];
              ele.handleStatus = _this.handleStatusArr[ele.online];
              ele.online = _this.isOnlineArr[ele.online];
            });

            console.log("response", response);
            _this.tableData = response;
          })
          .catch(function(error) {
            console.log(error);
          });
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    // 点击添加/修改按钮触发的事件
    handleEdit(type, index, row) {
      console.log(type, index, row);

      if (type === "添加") {
        this.$router.push({ name: "newListSet", params: { type: "添加" } });
      } else if (type === "修改") {
        row.list_type = this.listTypeArr[this.list_type];
        this.$router.push({
          name: "newListSet",
          params: { type: "修改", row }
        });
      } else if (type === "状态改变") {
        console.log(type, row.id, row.online);
        var params = {
          id: row.id,
          source: this.list_type,
          status: this.isContraryOnlineArr[row.online]
        };
        console.log(params);
        // articleSwitchStatue(params);
      } else if (type === "是否冻结") {
        console.log(type, row.id, row.online);
        var params = {
          id: row.id,
          source: this.list_type,
          isFrezz: row.isFrezz
        };
      }
    },
    // 新闻类型切换
    selectType(value) {
      this.type = value;
      this.getNewsData(this.list_type, this.type, this.start);
    },
    // 点击触发页数触发的函数
    handlePage(value) {
      console.log(value);
      this.start = value * 30;
      this.getNewsData(this.list_type, this.type, this.start);
    },
    // 是否冻结状态显示
    tableRowClassName({ row }) {
      console.log(row.isFrezz);
      if (row.isFrezz === 1) {
        return "warning-row";
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}

.warning-row {
  background: #eeeeee !important;
}

/* 冻结的行数不能操作 */
.warning-row:hover > td {
  pointer-events: none;
}
</style>



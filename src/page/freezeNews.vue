<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%" border>
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
            <a :href="scope.row.link" style="text-decoration: underline">{{scope.row.tit}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="time" label="添加时间"> </el-table-column>
        <el-table-column prop="isTop" label="是否置顶"> </el-table-column>
        <el-table-column prop="online" label="状态"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >解冻</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="Pagination" style="text-align: left; margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import { getFrezzNewList } from "@/api/getData";
export default {
  data() {
    return {
      tableData: [],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      value: "", // 按钮值

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
      
    };
  },
  components: {
    headTop,
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
        this.getFrezzNewList(0)
    },
    // 请求获取新闻数据并填充
    getFrezzNewList(start) {
      var _this = this;
      try {
        getFrezzNewList()
          .then(function(response) {
            response.forEach(ele => {
              ele.type = _this.typeArr[ele.type];
              ele.isTop = _this.isTopArr[ele.isTop];
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      
    },
    
    // 获取所在行的数据
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({ name: "modifyNew", params: {index, row} });
    },
  },
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
</style>



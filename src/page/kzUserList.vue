<template>
  <div class="fillcontain">
    <head-top></head-top>
    <el-col :offset="1" :span="6">
      <el-button type="primary" @click="handleEdit('添加')">添加</el-button>
    </el-col>
    <div class="table_container">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        highlight-current-row
      >
        <el-table-column type="index" width="100" label="#"> </el-table-column>
        <el-table-column prop="pic" label="图片">
          <template slot-scope="scope">
            <img
              :src="scope.row.pic"
              alt=""
              style="width: 36px; height: 36px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="position" label="职务" width="180">
        </el-table-column>
        <el-table-column prop="admin" label="权限">
          <template slot-scope="scope">
            <el-switch
              v-model="value"
              @change="changeStatus"
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
              @click="handleDelete(scope.$index, scope.row)"
              >冻结</el-button
            >
            <el-button
              v-if="scope.row.isFrezz === 1"
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
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
// 引入分页组件
import pagination from "@/components/pagination";
import { getNewList } from "@/api/getData";

export default {
  data() {
    return {
      tableData: [],
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      value: true
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
    async initData() {
      // try{
      //     const countData = await adminCount();

      //     console.log('countData', countData);

      //     if (countData.status == 1) {
      //         this.count = countData.count;
      //     }else{
      //         throw new Error('获取数据失败');
      //     }
      //     this.getAdmin();
      // }catch(err){
      //     console.log('获取数据失败', err);
      // }

      // var data = getNewList();
      // console.log(data);

      this.count = 10;
      this.getAdmin();
    },
    async getAdmin() {
      try {
        const res = await adminList({ offset: this.offset, limit: this.limit });

        console.log("adminList", res);

        if (res.status == 1) {
          this.tableData = [];
          res.data.forEach(item => {
            const tableItem = {
              create_time: item.create_time,
              user_name: item.user_name,
              admin: item.admin,
              city: item.city
            };
            this.tableData.push(tableItem);
          });
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }

      this.tableData = [
        {
          pic:
            "data:image/jpeg;base64,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",
          name: "haha",
          position: "班长",
          isFrezz: 1,
          isPicLink: 1
        }
      ];
    },
    changeStatus() {
      // this.value = !this.value;
      console.log("状态改变了");
    },
    handleEdit(type, index, row) {
      console.log(type, index, row);
      if (type === "添加") {
        this.$router.push({ name: "userListSet", params: { type: "添加" } });
      } else if (type === "修改") {
        console.log(row);
        this.$router.push({
          name: "userListSet",
          params: { type: "修改", row }
        });
      }
    },
    // 点击触发页数触发的函数
    handlePage(value) {
      console.log(value);
      this.start = value * 30;
      this.getNewsData(this.list_type, this.type, this.start);
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
</style>



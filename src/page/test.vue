<template>
  <div class="home">
    <my-table :table="table"></my-table>
  </div>
</template>

<script>
import myTable from "@/components/Table";
import { getNewList, articleSwitchStatue } from "@/api/getData";
// 引入格式化的JS
import {
  listTypeFormatter,
  typeFormatter,
  isTopFormatter,
  isOnlineFormatter,
  handleStatus
} from "@/util/formatter";

export default {
  name: "home",
  components: {
    "my-table": myTable
  },
  created() {
    this.initData();
  },
  data() {
    return {
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
      ],

      table: {
        stripe: false, //是否为斑马纹
        loading: false, // 数据加载loading
        data: [],
        event: {
          sortEvent: this.tableSort
        },
        // 表头
        header: [
          {
            prop: "id",
            label: "序号",
            width: "50",
            formatter: ""
          },
          {
            prop: "pic",
            label: "图片",
            isImg: true
          },
          {
            prop: "tit",
            label: "标题",
            formatter: ""
          },
          {
            prop: "type",
            label: "类型",
            formatter: typeFormatter
          },
          {
            prop: "time",
            label: "添加时间",
            formatter: ""
          },
          {
            prop: "isTop",
            label: "是否置顶",
            formatter: isTopFormatter,
            tooltip: false,
            sortable: false
          },
          {
            prop: "online",
            label: "状态",
            formatter: isOnlineFormatter
          },
          {
            prop: "options",
            label: "操作",
            width: "250",
            fixed: "right"
          }
        ],
        options: [
          {
            type: "switch",
            label: "",
            formatter: handleStatus,
            event: this.checkPass
          },
          {
            type: "",
            label: "修改",
            event: this.checkPass,
            isShow: item => {
              return item.status == 0 ? false : true;
            }
          },
          {
            type: "success",
            label: "冻结",
            event: this.checkPass,
            isShow: item => {
              return item.isFrezz == 0 ? false : true;
            }
          },
          {
            type: "danger",
            label: "解冻",
            event: this.checkNoPass,
            isShow: item => {
              return item.isFrezz == 1 ? false : true;
            }
          }
        ]
      }
    };
  },
  methods: {
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
              console.log(ele);
              _this.table.data.push(ele);
            });
            console.log(_this.table);
          })
          .catch(function(error) {
            console.log(error);
          });
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    tableSort(val) {
      console.log(val);
    },
    checkPass(val) {
      console.log("switch");
    },
    checkNoPass(val) {
      console.log(val);
    }
  }
};
</script>

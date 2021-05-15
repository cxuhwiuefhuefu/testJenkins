<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%">
      <el-col :span="4" style="min-height: 100%; background-color: #324057">
       
        <NavMenu :menuList="menuList"></NavMenu>
        
      </el-col>
      <el-col :span="20" style="height: 100%; overflow: auto">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入导航栏组件
import NavMenu from "@/components/navMenu";

export default {
  components: {
    NavMenu
  },
  computed: {
    defaultActive: function () {
      console.log(11111);
      return this.$route.path.replace("/", "");
    },
  },
  data() {
    return {
      isCollapse: false,
      menuList: [
        {
          path: "",
          name: "数据管理",
          icon:'el-icon-menu',
          children: [
            {
              path: "",
              name: "新闻列表",
              icon:'el-icon-menu',
              children: [
                {
                  path: "/newList/dblz",
                  name: "代表履职",
                  icon:'el-icon-menu',
                },
                {
                  path: "/newList/rddt",
                  name: "人大动态",
                  icon:'el-icon-menu',
                },
              ]
            },
            {
              path: "/freezeNews",
              name: "解冻新闻",
              icon:'el-icon-menu',
            }
          ]
        },
         {
          path: "/1",
          name: "设置",
          icon:'el-icon-s-custom',
          children: [
            {
              path: "/1/1",
              name: "用户列表",
              icon:'el-icon-menu',
              children: [
                {
                  path: "/userList/ps",
                  name: "坪山",
                  icon:'el-icon-menu',
                },
                {
                  path: "/userList/kz",
                  name: "坑梓",
                  icon:'el-icon-menu',
                },
                {
                  path: "/userList/lt",
                  name: "龙田",
                  icon:'el-icon-menu',
                },
                {
                  path: "/userList/bl",
                  name: "碧岭",
                  icon:'el-icon-menu',
                },
                {
                  path: "/userList/sj",
                  name: "石井",
                  icon:'el-icon-menu',
                },
                {
                  path: "/userList/ml",
                  name: "马峦",
                  icon:'el-icon-menu',
                },
              ]
            },
            {
              path: "/adminList",
              name: "管理员列表",
              icon:'el-icon-menu',
            }
          ]
        },
        {
          path: "/2",
          name: "导航二",
          icon:'el-icon-menu'
        }
      ]
      
      
    };
  },
};
</script>


<style lang="less" scoped>
@import "../style/mixin";
.manage_page {
}
</style>

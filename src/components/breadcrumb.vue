<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in routerList" :key="item" :to="item.path">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerList:[]
    };
  },
  created() {
    console.log("this.$route.meta.routeList", this.$route.meta.routeList);
    this.routerList = this.$route.meta.routeList; 
  },
  watch: {
    $route:function(newVal,oldVal){
      this.routerList = newVal.meta.routeList 
    }
  },
 // 或使用路由守卫beforeRouteEnter，watch和beforeRouteEnter二者其一即可
 // beforeRouteEnter(to, from, next) {
 //	next(vm=>{
 //   	vm.routeList = to.meta.routeList
 //	 })
 //	}
};
</script>



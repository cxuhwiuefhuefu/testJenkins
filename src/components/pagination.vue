<template>
    <div class="Pagination" style="text-align: center; margin: 20px 0px 20px 0px">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
        >
        </el-pagination>
    </div>
</template>


<script>
export default {
    methods: {
        handleCurrentChange(value) {
            var start = value;
            this.$emit('handlePage', start);    
        },
    },
}
</script>

<style lang="less">
.btn-prev:after{
    content: "上一页";   
    padding: 10px 15px; 
    border: 1px solid #409EFF;
    border-radius: 5px;
}
.btn-next:after{
    content: "下一页";   
    padding: 10px 15px; 
    border: 1px solid #409EFF;
    border-radius: 5px;
}
.btn-prev i:before{
    content: ""    
}
.btn-next i:before{
    content: ""    
}


</style>
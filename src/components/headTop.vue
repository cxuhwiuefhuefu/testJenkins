<template>
    <div class="header_container">

		<!-- <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
		</el-breadcrumb> -->
		<breadcrumb></breadcrumb>


		<el-dropdown @command="handleCommand" menu-align='start'>
			<!-- <img :src="baseImgPath + adminInfo.avatar" class="avator"> -->
			<img src="data:image/jpeg;base64,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" class="avator">
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="home">首页</el-dropdown-item>
				<el-dropdown-item command="signout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
    </div>
</template>

<script>
	import {signout} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
	// 引入面包屑组件
	import breadcrumb from "./breadcrumb";

    export default {
		components: {
			breadcrumb,
		},
    	data(){
    		return {
    			baseImgPath,
    		}
    	},
    	created(){
    		if (!this.adminInfo.id) {
    			this.getAdminData()
    		}
    	},
    	computed: {
    		...mapState(['adminInfo']),
    	},
		methods: {
			...mapActions(['getAdminData']),
			async handleCommand(command) {
				if (command == 'home') {
					// this.$router.push('/manage');
					console.log('回到首页');
				}else if(command == 'signout'){
					// const res = await signout()
					// if (res.status == 1) {
					// 	this.$message({
	                //         type: 'success',
	                //         message: '退出成功'
	                //     });
	                //     this.$router.push('/');
					// }else{
					// 	this.$message({
	                //         type: 'error',
	                //         message: res.message
	                //     });
					// }
					console.log('退出了');
				}
			},
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
</style>

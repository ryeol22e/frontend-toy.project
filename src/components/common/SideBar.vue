<template>
	<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="sideBar" aria-labelledby="sideBarLabel">
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="sideBarLabel">Mypage</h5>
			<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<ul>
				<li v-for="(corner, index) in cornerList" :key="index" v-if="cornerList.length>0">
					<h3 v-if="corner.cornerDepth==='1'">{{corner.cornerName}}</h3>
					<a href="javascript:void(0);" v-else-if="corner.cornerDepth!=='1'">{{corner.cornerName}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		name : 'SideBar',
		props : ['title', 'isMyPage'],
		data() {
			return {
				cornerList : new Array(),
			};
		},
		created() {},
		async updated() {
			const isMyPage = this.isMyPage;
			const cornerTypeCode = '10000';
			const param = {
				cornerTypeCode : cornerTypeCode,
				useYn : 'Y',
				dispYn : 'Y',
			};

			if(isMyPage) {
				await axios.get('/display/corner', {
					params : param
				})
				.then(res=> {
					this.$data.cornerList = res.data;
					this.$emit('changeBoolMyPAge', false);
				})
				.catch(error=> {
					alert(error.message);
				});
			}
		}
	}
</script>

<style>
	ul {
		list-style: none;
		padding-left: 0px;
	}

	a {
		text-decoration: none;
	}
</style>
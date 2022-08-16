<template>
	<Header :isLogin="isLogin"/>
	<router-view class="container"/>
</template>

<script>
	import Header from './components/common/Header.vue';
	import UtilsCookie from './assets/js/common/UtilsCookie';

	export default {
		name: 'App',
		components : {
			Header,
		},
		data() {
			return {
				isLogin : false,
			};
		},
		created() {
			const token = new UtilsCookie().getCookie('token');

			if(token!=='') {
				this.$data.isLogin = true;
			}
		},
		
	};
</script>

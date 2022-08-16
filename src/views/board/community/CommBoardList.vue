<template>
	<div>
		<h1>COMMUNITY</h1>
		<br>
		<BaseBoardList :boardList="boardList" detailName="CommBoardDetail"/>
	</div>
</template>

<script>
	import BaseBoardList from '@/components/board/BaseBoardList.vue';
	import axios from 'axios';

	export default {
		name : 'CommList',
		data() {
			return {
				boardList : new Array(),
			}
		},
		components : {
			BaseBoardList
		},
		created() {
			axios
				.get('/boards/comm/list')
					.then(res=> {
						const data = res.data;
						this.$data.boardList = data;
					})
					.catch(error=> {
						alert(error.message);
					});
		},
		methods : {
			
		}
	}
</script>
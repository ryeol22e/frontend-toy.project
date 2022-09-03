<template>
	<div>
		<h1>COMMUNITY</h1>
		<br>
		<BaseBoardList :boardList="dataObj.boardList" detailName="CommBoardDetail"/>
	</div>
</template>

<script>
	import { ref } from 'vue';
	import BaseBoardList from '@/components/board/BaseBoardList.vue';
	import axios from 'axios';

	export default {
		name : 'CommList',
		components : {
			BaseBoardList
		},
		setup() {
			const dataObj = ref({
				boardList : new Array(),
			});

			axios
				.get('/boards/comm/list')
				.then(res=> {
					const data = res.data;
					dataObj.value.boardList = data;
				})
				.catch(error=> {
					alert(error.message);
				});

			return {dataObj};
		}
	}
</script>
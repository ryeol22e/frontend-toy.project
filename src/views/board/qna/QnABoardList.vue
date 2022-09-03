<template>
	<div>
		<h1>Q&A</h1>
		<br>
		<BaseBoardList :boardList="dataObj.boardList" detailName="QnABoardDetail"/>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import BaseBoardList from '@/components/board/BaseBoardList.vue';
	import axios from 'axios';

	const dataObj = ref({
		boardList : new Array(),
	});
	
	axios
		.get('/boards/qna/list')
		.then(res=> {
			const data = res.data;
			dataObj.value.boardList = data;
		})
		.catch(error=> {
			alert(error.message);
		});
</script>
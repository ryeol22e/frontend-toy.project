<template>
	<div>
		<h1>Q&A</h1>
		<br>
		<BaseBoardList :boardList="boardList" detailName="QnABoardDetail"/>
	</div>
</template>

<script setup>
	import { computed, onMounted } from 'vue';
	import {useStoreBoard} from '@/store/useStoreBoard.js';
	import BaseBoardList from '@/components/board/BaseBoardList.vue';

	const useBoard = useStoreBoard();
	const boardList = computed(()=> useBoard.getBoardList);
	
	onMounted(()=> {
		const url = '/boards/qna/list';
		useBoard.setBoardList(url);
	});
</script>
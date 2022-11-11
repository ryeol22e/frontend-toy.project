<template>	
	<div>
		<BaseBoardDetail :boardInfo="boardInfo" :memberInfo="memberInfo" @delBoard="delBoard"/>
	</div>
</template>

<script setup>
	import { useRoute } from 'vue-router';
	import { onMounted, computed } from 'vue';
	import {useStoreBoard} from '@/store/useStoreBoard.js';
	import BaseBoardDetail from '@/components/board/BaseBoardDetail.vue';

	const route = useRoute();
	const useBoard = useStoreBoard();
	const boardSeq = route.params.boardSeq;
	const boardInfo = computed(()=> useBoard.getBoardDetail);
	const memberInfo = computed(()=> useBoard.getBoardDetail.memberInfo);
	const delBoard = ()=> {
		const url = `/boards/comm/del/${boardSeq}`;
		useBoard.delBoardData(url);
	};
	
	onMounted(()=> {
		const url = `/boards/comm/list/${boardSeq}`;
		useBoard.setBoardDetail(url);
	});
	
</script>
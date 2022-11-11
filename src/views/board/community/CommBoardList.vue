<template>
	<div>
		<h1>COMMUNITY</h1>
		<br>
		<BaseBoardList :boardList="boardList" detailName="CommBoardDetail"/>
	</div>
</template>

<script>
	import { onMounted, computed } from 'vue';
	import {useStoreBoard} from '@/store/useStoreBoard.js';
	import BaseBoardList from '@/components/board/BaseBoardList.vue';

	export default {
		name : 'CommList',
		components : {
			BaseBoardList
		},
		setup() {
			const useBoard = useStoreBoard();
			const boardList = computed(()=> useBoard.getBoardList);

			onMounted(()=> {
				const url = '/boards/comm/list';
				useBoard.setBoardList(url);
			});
			
			return {boardList};
		}
	}
</script>
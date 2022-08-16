<template>
	<div>
		<h1>Q&A</h1>
		<br>
		<BaseBoardList :boardList="boardList" detailName="QnABoardDetail"/>
	</div>
</template>

<script>
	import BaseBoardList from '@/components/board/BaseBoardList.vue';
	import axios from 'axios';

	export default {
		name : 'QnAList',
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
				.get('/boards/qna/list')
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
	};
</script>
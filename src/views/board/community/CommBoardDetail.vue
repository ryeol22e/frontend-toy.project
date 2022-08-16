<template>	
	<div>
		<BaseBoardDetail :boardInfo="boardInfo"/>
	</div>
</template>

<script>
	import axios from 'axios';
	import BaseBoardDetail from '@/components/board/BaseBoardDetail';

	export default {
		name : 'CommBoardDetail',
		components : {
			BaseBoardDetail,
		},
		data() {
			return {
				boardInfo : new Object(),
			};
		},
		created() {
			const boardSeq = this.$route.params.boardSeq;
			
			axios.get('/boards/comm/list/'.concat(boardSeq))
				.then(res=> {
					const data = res.data;

					this.$data.boardInfo = data;
				})
				.catch(error=> {
					alert(error.message);
					this.$router.go(-1);
				});
		},
	}
</script>
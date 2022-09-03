<template>	
	<div>
		<BaseBoardDetail :boardInfo="dataObj.boardInfo"/>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import axios from 'axios';
	import BaseBoardDetail from '@/components/board/BaseBoardDetail.vue';

	const route = useRoute();
	const router = useRouter();
	const dataObj = ref({
		boardInfo : new Object(),
	});
	const boardSeq = route.params.boardSeq;
	
	axios.get('/boards/qna/list/'.concat(boardSeq))
		.then(res=> {
			dataObj.value.boardInfo = res.data;
		})
		.catch(error=> {
			alert(error.message);
			router.go(-1);
		});
</script>
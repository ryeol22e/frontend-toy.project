<template>	
	<div>
		<BaseBoardDetail :boardInfo="dataObj.boardInfo"/>
	</div>
</template>

<script setup>
	import { useRoute, useRouter } from 'vue-router';
	import { ref } from 'vue';
	import axios from 'axios';
	import BaseBoardDetail from '@/components/board/BaseBoardDetail.vue';

	const route = useRoute();
	const router = useRouter();
	const boardSeq = route.params.boardSeq;
	const dataObj = ref({
		boardInfo : new Object(),
	});
	
	axios.get('/boards/comm/list/'.concat(boardSeq))
		.then(res=> {
			const data = res.data;

			dataObj.value.boardInfo = data;
		})
		.catch(error=> {
			alert(error.message);
			router.go(-1);
		});
</script>
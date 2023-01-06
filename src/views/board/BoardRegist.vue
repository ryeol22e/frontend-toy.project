<template>
	<BaseRegistForm :data="data" :type="type" @boardRegist="boardRegist"/>
</template>

<script setup>
	import { computed, onMounted } from 'vue';
	import { useRoute } from 'vue-router';
	import {useUtils} from '@/composables/useUtils.js';
	import {useStoreBoard} from '@/store/useStoreBoard.js';
	import BaseRegistForm from '@/components/board/BaseRegistForm.vue';

	const route = useRoute();
	const useBoard = useStoreBoard();
	const useIsEmpty = useUtils().useIsEmpty;
	const data = computed(()=> useBoard.getBoardDetail);
	const type = route.params.type;
	const validate = (data)=> {
		if(data.title==='') {
			alert('제목을 입력해주세요.');
			return false;
		}
		if(data.content===''){
			alert('내용을 입력해주세요.');
			return false;
		}

		return true;
	};
	const boardRegist = (data)=> {
		const type = data.type;
		
		if(validate(data)) {
			if(type==='community') {
				useBoard.registImageBoard(type, changeToFormData(data));
			} else {
				useBoard.registGeneralBoard(type, data);
			}
			
		}
	};
	const changeToFormData = (data)=> {
		const form = new FormData();
		const keyList = Object.keys(data);

		for(let i=0, length=keyList.length ; i<length ; i++) {
			const key = keyList[i];
			const value = data[key];

			form.append(key, value);
		}

		return form;
	};

	onMounted(()=> {
		if(!useIsEmpty(route.query.boardSeq)) {
			const url = type==='qna' ? '/boards/qna/list/ ' : '/boards/comm/list/';
			useBoard.setBoardDetail(url.concat(route.query.boardSeq));
		}
	});
</script>

<style scoped>

</style>
<template>
	<h3>{{boardInfo.title}}</h3><p>작성자 : {{memberInfo.userName}}</p>
	<br>
	<img v-if="!useIsEmpty(boardInfo.imageDataByte)" :src="`data:image/png;base64,${boardInfo.imageDataByte}`" alt="">
	<p>{{boardInfo.content}}</p>
	<button v-if="siteLoginMember===memberInfo.loginId" @click="delBoard" type="button" class="btn btn-primary" style="float:right;">삭제</button>
</template>

<script setup>
	import { ref } from 'vue';
	import {useUtils} from '@/composables/useUtils.js';

	const useIsEmpty = useUtils().useIsEmpty;
	const props = defineProps({
		boardInfo : {
			type : Object,
			default : {}
		},
		memberInfo : {
			type : Object,
			default : {}
		}
	});
	const emit = defineEmits([
		'delBoard',
	])
	const siteLoginMember = ref(JSON.parse(sessionStorage.getItem('userInfo'))?.loginId);
	const delBoard = ()=> {
		emit('delBoard');
	};
	
</script>
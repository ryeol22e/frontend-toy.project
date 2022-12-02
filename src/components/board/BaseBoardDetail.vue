<template>
	<h3>{{boardInfo.title}}</h3><p>작성자 : {{memberInfo.userName}}</p>
	<br>
	<img v-if="!useIsEmpty(boardInfo.imageDataByte)" :src="`data:image/png;base64,${boardInfo.imageDataByte}`" alt="">
	<p>{{boardInfo.content}}</p>
	<button v-if="siteLoginMember===memberInfo.loginId" @click="delBoard" type="button" class="btn btn-primary detail-button">삭제</button>
	<button v-if="siteLoginMember===memberInfo.loginId" @click="modifyBoard" type="button" class="btn btn-primary detail-button">수정</button>
</template>

<script setup>
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import {useUtils} from '@/composables/useUtils.js';

	const router = useRouter();
	const useIsEmpty = useUtils().useIsEmpty;
	const siteLoginMember = ref(JSON.parse(sessionStorage.getItem('userInfo'))?.loginId);
	const props = defineProps({
		boardInfo : {
			type : Object,
			default : {}
		},
		memberInfo : {
			type : Object,
			default : {}
		},
		type : {
			type : String,
			default : 'qna'
		}
	});
	const emit = defineEmits([
		'delBoard',
	])
	const modifyBoard = ()=> {
		router.push({path : `/boards/regist/${props.type}`, query : {boardSeq : props.boardInfo.boardSeq}});
	};
	const delBoard = ()=> {
		emit('delBoard');
	};
	console.log(props.boardInfo);
</script>

<style scoped>
	.detail-button {
		float: right;
	}
</style>
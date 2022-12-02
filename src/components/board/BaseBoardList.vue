<template>	
	<ul class="list-group" v-if="boardList.length>0">
		<router-link style="text-decoration-line:none;" v-for="board in boardList" :key="board.boardSeq" :to="{name : detailName, params : {boardSeq : board.boardSeq}}">
			<li class="list-group-item">{{board.title}}<span class="text" style="float:right;">작성자 : {{board.memberInfo.userName}}</span></li>
		</router-link>
	</ul>
	<div v-else>
		<h3>게시글이 없습니다.</h3>
	</div>
	<br/>
	<button v-if="isAdmin" type="button" class="btn btn-primary" @click="clickRegist" style="float:right;">작성하기</button>
</template>

<script setup>
	import { ref } from 'vue';
	import { useRoute, useRouter } from 'vue-router';

	const route = useRoute();
	const router = useRouter();
	const props = defineProps({
		boardList : Array,
		detailName : String,
	});
	const isAdmin = ref(JSON.parse(sessionStorage.getItem('userInfo'))?.loginId==='jaeryeol@3top.co.kr' || false);
	const clickRegist = ()=> {
		let inType = String(route.path);
		
		inType = inType.substring(inType.lastIndexOf('/')+1, inType.length);
		router.push({name : 'BoardRegist', params : {type : inType}});
	};
</script>

<style>
	a li:hover {
		background: skyblue;
	}
</style>

<template>
	<div>
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">제목</label>
			<input type="email" class="form-control" id="exampleFormControlInput1" v-model="dataObj.title" placeholder="제목을 입력해주세요.">
		</div>
		<div class="mb-3" v-if="dataObj.type==='community'">
			<label for="uploadImage" class="form-label">이미지</label>
			<input type="file" name="uploadImage" class="form-control" id="uploadImage" accept="image/*" @change="uploadImage">
		</div>
		<div class="mb-3">
			<label for="exampleFormControlTextarea1" class="form-label">내용</label>
			<textarea class="form-control" id="exampleFormControlTextarea1" rows="10" v-model="dataObj.content"></textarea>
		</div>
		<div class="mb-3">
			<button type="button" class="btn btn-primary" @click="regist" style="float:right;">등록</button>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { useRoute } from 'vue-router';

	const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
	const route = useRoute();
	const emit = defineEmits(['boardRegist']);
	const dataObj = ref({
		title : '',
		content : '',
		image : null,
		writer : userInfo.loginId,
		type : route.params.type,
	});
	const regist = ()=> {
		emit('boardRegist', dataObj.value);
	};
	const uploadImage = (e)=> {
		dataObj.value.image = e.target.files[0];
	}
</script>

<style>

</style>
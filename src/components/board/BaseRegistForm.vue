<template>
	<div>
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">제목</label>
			<input type="email" class="form-control" id="exampleFormControlInput1" v-model="data.title" placeholder="제목을 입력해주세요.">
		</div>
		<div class="mb-3" v-if="type==='community'">
			<label for="uploadImage" class="form-label">이미지</label>
			<input type="file" name="uploadImage" class="form-control" id="uploadImage" accept="image/*" @change="uploadImage">
			<img v-if="!useIsEmpty(data.imageDataByte)" :src="`data:image/png;base64,${data.imageDataByte}`" alt="">
		</div>
		<div class="mb-3">
			<label for="exampleFormControlTextarea1" class="form-label">내용</label>
			<textarea class="form-control" id="exampleFormControlTextarea1" rows="10" v-model="data.content"></textarea>
		</div>
		<div class="mb-3">
			<button type="button" class="btn btn-primary" @click="regist" style="float:right;">등록</button>
		</div>
	</div>
</template>

<script setup>
	import {useUtils} from '@/composables/useUtils.js';

	const useIsEmpty = useUtils().useIsEmpty;
	const emit = defineEmits(['boardRegist']);
	const props = defineProps({
		data : {
			type : Object,
			default : {
				title : '',
				content : '',
				image : null,
				writer : '',
			}
		},
		type : {
			type : String,
			default : 'qna',
		}
	});
	const regist = ()=> {
		props.data.type = props.type;
		emit('boardRegist', props.data);
	};
	const uploadImage = (e)=> {
		props.data.image = e.target.files[0];
	}
	
</script>

<style>

</style>
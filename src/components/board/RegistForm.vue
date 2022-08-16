<template>
	<div>
		<div class="mb-3">
			<label for="exampleFormControlInput1" class="form-label">제목</label>
			<input type="email" class="form-control" id="exampleFormControlInput1" v-model="title" placeholder="제목을 입력해주세요.">
		</div>
		<div class="mb-3">
			<label for="exampleFormControlTextarea1" class="form-label">내용</label>
			<textarea class="form-control" id="exampleFormControlTextarea1" rows="10" v-model="content"></textarea>
		</div>
		<div class="mb-3">
			<button type="button" class="btn btn-primary" @click="regist" style="float:right;">등록</button>
		</div>
	</div>
</template>

<script>
	import UtilsCookie from '../../assets/js/common/UtilsCookie';

	export default {
		name : 'RegistForm',
		data() {
			return {
				title : '',
				content : '',
				writer : new UtilsCookie().getCookie('loginId'),
				type : this.$route.params.type,
			};
		},
		created() {},
		methods : {
			regist() {
				this.$emit('boardRegist', this.$data);
			},
		}
	}
</script>

<style>

</style>
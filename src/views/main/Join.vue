<template>
	<main class="comp-form">
		<h1 class="h3 mb-3 fw-normal">Join</h1>

		<div class="form-floating">
			<input type="email" class="form-control" id="userEmail" v-model="dataObj.loginId">
			<label for="userEmail">e-mail</label>
		</div>
		<br>
		<div class="form-floating">
			<input type="text" class="form-control" id="userName" v-model="dataObj.userName">
			<label for="userName">이름</label>
		</div>
		<br>
		<div class="form-floating">
			<input type="password" class="form-control" id="userPassword" v-model="dataObj.password">
			<label for="userPassword">Password</label>
		</div>
		<br>
		<div class="form-floating">
			<input type="text" class="form-control" id="userAddr" v-model="dataObj.userAddr">
			<label for="userAddr">주소</label>
		</div>
		<br>
		<button type="button" class="w-100 btn btn-lg btn-primary" @click="join" style="float:right;">가입</button>
	</main>
</template>

<script setup>
	import { reactive } from 'vue';
	import {useRouter} from 'vue-router';
	import axios from 'axios';

	const router = useRouter();
	const dataObj = reactive({
		loginId : '',
		password : '',
		userName : '',
		userAddr : '',
	});
	const validate = ()=> {
		const data = dataObj;

		if(data.userName==='') {
			alert('이름은 필수입력입니다.');
			return false;
		}
		if(data.loginId==='') {
			alert('이메일은 필수입력입니다.');
			return false;
		}
		if(data.password==='') {
			alert('비밀번호는 필수입력입니다.');
			return false;
		}

		return true;
	};
	const join = ()=> {
		if(validate()) {
			axios.post('/member/join', dataObj)
				.then(res=> {
					const result = res.data || false;

					if(result) {
						alert('가입완료하였습니다.');
						router.push({name : 'Main'});
					}
				})
				.catch(error=> {
					alert(error.message);
				});
		}
	};
</script>

<style scoped>
	@import url('../../assets/css/form.css');
</style>
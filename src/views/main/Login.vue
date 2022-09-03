<template>
  <!-- <div>
		<div class="mb-3 row">
			<label for="loginId" class="col-sm-1 col-form-label">id</label>
			<div class="col-sm-5">
				<input type="email" class="form-control" id="loginId" v-model="loginId" placeholder="id를 입력하세요.">
			</div>
		</div>
		<div class="mb-3 row">
			<label for="userPassword" class="col-sm-1 col-form-label">Password</label>
			<div class="col-sm-5">
				<input type="password" class="form-control" id="userPassword" v-model="password" @keypress.enter="goLogin" placeholder="비밀번호를 입력하세요.">
			</div>
		</div>
		<button type="button" class="btn btn-primary" @click="goLogin">로그인</button>
	</div> -->
	<main class="comp-form">
		<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

		<div class="form-floating">
			<input type="email" class="form-control" id="floatingInput" v-model="dataObj.loginId">
			<label for="floatingInput">Email address</label>
		</div>
		<br>
		<div class="form-floating">
			<input type="password" class="form-control" id="floatingPassword" v-model="dataObj.password" @keypress.enter="goLogin">
			<label for="floatingPassword">Password</label>
		</div>

		<div class="checkbox mb-3">
			<label>
				<input type="checkbox" value="remember-me" v-model="dataObj.rememberMe"> Remember me
			</label>
		</div>
		<button class="w-100 btn btn-lg btn-primary" type="button" @click="goLogin">Sign in</button>
		<p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
	</main>
</template>

<script setup>
	import { ref } from 'vue';
	import axios from 'axios';
	import { useRouter } from 'vue-router';
	import { useStoreUser } from '@/store/useStoreUser';
	import UtilsCookie from '@/assets/common/UtilsCookie';

	const router = useRouter();
	const store = useStoreUser();
	const dataObj = ref({
		loginId : new UtilsCookie().getCookie('loginId'),
		password : '',
		rememberMe : new UtilsCookie().getCookie('loginId')!=='' ? true : false,
	});
	const goLogin = ()=> {
		axios
			.post('/member/login', dataObj.value)
			.then(res=> {
				const token = res.data || '';

				if(token!=='') {
					new UtilsCookie().setCookie('token', token);

					if(dataObj.value.rememberMe) {
						new UtilsCookie().setCookie('loginId', dataObj.value.loginId);
					}
					
					store.setLogin(true);
					router.push('/');
				}
			})
			.catch((error)=> {
				alert(error.message);
			});
	}
</script>

<style>
	@import url('@/assets/css/form.css');
</style>
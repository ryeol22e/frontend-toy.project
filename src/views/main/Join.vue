<template>
	<main class="comp-form">
		<h1 class="h3 mb-3 fw-normal">Join</h1>

		<div class="form-floating">
			<input type="email" class="form-control" id="userEmail" v-model="loginId">
			<label for="userEmail">e-mail</label>
		</div>
		<br>
		<div class="form-floating">
			<input type="text" class="form-control" id="userName" v-model="userName">
			<label for="userName">이름</label>
		</div>
		<br>
		<div class="form-floating">
			<input type="password" class="form-control" id="userPassword" v-model="password">
			<label for="userPassword">Password</label>
		</div>
		<br>
		<div class="form-floating">
			<input type="text" class="form-control" id="userAddr" v-model="userAddr">
			<label for="userAddr">주소</label>
		</div>
		<br>
		<button type="button" class="w-100 btn btn-lg btn-primary" @click="join" style="float:right;">가입</button>
	</main>
</template>

<script>
	import axios from 'axios';

	export default {
		name : 'Join',
		data() {
			return {
				loginId : '',
				password : '',
				userName : '',
				userAddr : '',
			}
		},
		created() {},
		mounted() {},
		methods : {
			join() {
				if(this.validate()) {
					axios.post('/member/join', this.$data)
						.then(res=> {
							const result = res.data || false;

							if(result) {
								alert('가입완료하였습니다.');
								this.$router.push({name : 'Main'});
							}
						})
						.catch(error=> {
							alert(error.message);
						});
				}
			},
			validate() {
				const data = this.$data;

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
			}
		}
	}
</script>

<style>
	@import url('../../assets/css/form.css');
</style>
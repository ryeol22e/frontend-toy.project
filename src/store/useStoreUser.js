import { defineStore } from "pinia"
import axios from "axios";
import {useUtils} from '@/composables/useUtils.js';

const useCookie = useUtils().useCookie;
// const member = axios.create({
// 	baseURL : import.meta.env.VITE_APP_API_URL_WEBFLUX,
// 	timeout : 1000,
// });

export const useStoreUser = defineStore('useStoreUser', {
	state : ()=> ({
		isLogin : false,
	}),
	getters : {
		getIsLogin : state=> state.isLogin,
	},
	actions : {
		async setLogin(data) {
			this.isLogin = await axios.post('/member/login', data)
				.then(res=> {
					let flag = false;
					const userInfo = res.data || '';

					if(userInfo.token!=='' && userInfo.token!==null) {
						useCookie.setCookie('token', userInfo.token);
						sessionStorage.setItem('userInfo', JSON.stringify(userInfo));

						if(data.rememberMe) {
							localStorage.setItem('loginId', data.loginId);
						}

						flag = true;
					}

					return flag;
				})
				.catch((error)=> {
					alert('로그인 실패하였습니다.');
					console.error(error);
					return false;
				});
		},
		setIsLogin(flag) {
			this.isLogin = flag;
		}
	}
})
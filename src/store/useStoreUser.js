import { defineStore } from "pinia"
import axios from "axios";
import UtilsCookie from '@/assets/common/UtilsCookie';

export const useStoreUser = defineStore('useStoreUser', {
	state : ()=> {
		return {
			isLogin : false,
		}
	},
	getters : {
		getIsLogin : state=> state.isLogin,
	},
	actions : {
		setLogin(data) {
			this.isLogin = axios.post('/member/login', data)
				.then(res=> {
					let flag = false;
					const userInfo = res.data || '';

					if(userInfo.token!=='' && userInfo.token!==null) {
						new UtilsCookie().setCookie('token', userInfo.token);
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
				});
		},
		setIsLogin(flag) {
			this.isLogin = flag;
		}
	}
})
import { defineStore } from "pinia"
import UtilsCookie from '@/assets/common/UtilsCookie';

export const useStoreUser = defineStore('useStoreUser', {
	state : ()=> {
		return {
			isLogin : false,
		}
	},
	getters : {
		getIsLogin : state=> {
			const token = new UtilsCookie().getCookie('token');

			if(token!=='') {
				state.isLogin = true;
			}
			
			return state.isLogin;
		}
	},
	actions : {
		setLogin(flag) {
			this.isLogin = flag;
		}
	}
})
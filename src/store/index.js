import { createStore } from 'vuex';
import UtilsCookie from '../assets/js/common/UtilsCookie';

export default createStore({
	state: {
		isLogin : false,
	},
	mutations: {
		isLogin(state) {
			const token = new UtilsCookie().getCookie('token');

			if(token!=='') {
				state.isLogin = true;
			}
		}
	},
	actions: {
	},
	modules: {
	}
});

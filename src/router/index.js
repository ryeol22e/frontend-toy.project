import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";
import axios from "axios";
import UtilsCookie from '../assets/common/UtilsCookie';
import authenticationUrl from '../assets/common/authenticationUrl';
import { useStoreUser } from "../store/useStoreUser";
import main from './main';
import board from './board';

const routes = [
	{
		path : '/:pathMatch(.*)*',
		redirect : to=> {
			return {name : 'Error', params : {errorType : '404'}};
		}
	},
	{
		path : '/error/:errorType',
		name : 'Error',
		component : ()=> import('@/views/error/CommonError.vue'),
		props : true,
		meta : {
			title : 'Error :('
		}
	},
	{
		path : '/setup/test',
		name : 'SetupTest',
		component : ()=> import('@/views/common/SetupTestView.vue'),
		props : true,
		meta :  {
			title : 'setup test'
		}
	},
	...main,
	...board,
];
const router = createRouter({
	history : createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next)=> {
	const token = new UtilsCookie().getCookie('token');
	const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
	const authFlag = authenticationUrl(to.path);
	
	if(token!=='') {
		axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(token);
		axios.defaults.headers.common['MemberId'] = userInfo.loginId;
	} else {
		delete axios.defaults.headers.common['Authorization'];
		delete axios.defaults.headers.common['MemberId'];
	}
	
	if(!authFlag) {
		next();
	} else {
		axios
			.get('/auth/check')
			.then(res=> {
				next();
			})
			.catch(error=> {
				const useUser = useStoreUser();

				useUser.setIsLogin(false);
				new UtilsCookie().deleteCookie('token');
				sessionStorage.removeItem('userInfo');
				
				next('/login');
			});
	}
});
router.afterEach(to=> {
	nextTick(()=> {
		document.title = 'toy';
	});
})

export default router;
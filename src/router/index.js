import axios from "axios";
import { nextTick } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import {useUtils} from '@/composables/useUtils.js';
import { useStoreUser } from "@/store/useStoreUser.js";
import authenticationUrl from '@/assets/common/authenticationUrl.js';

import main from './main.js';
import board from './board.js';

const useCookie = useUtils().useCookie;
const useIsEmpty = useUtils().useIsEmpty;
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
	const token = useCookie.getCookie('token');
	const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
	const authFlag = authenticationUrl(to.path);
	
	if(!useIsEmpty(token) && !useIsEmpty(userInfo)) {
		axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(token);
		axios.defaults.headers.common['MemberId'] = userInfo.loginId;
	} else {
		delete axios.defaults.headers.common['Authorization'];
		delete axios.defaults.headers.common['MemberId'];
	}
	
	if(!authFlag) {
		next();
	} else {
		axios.get('/auth/check')
		.then(res=> next())
		.catch(error=> {
			const useUser = useStoreUser();
			
			useUser.setIsLogin(false);
			useCookie.deleteCookie('token');
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
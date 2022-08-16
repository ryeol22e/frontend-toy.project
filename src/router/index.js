import { createRouter, createWebHistory } from 'vue-router';
import { nextTick } from 'vue';
import axios from 'axios';
import UtilsCookie from '../assets/js/common/UtilsCookie';
import authenticationUrl from './common/authenticationUrl';
import store from '../store/index';
import main from './main/main';
import board from './board/board';

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
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
	...main,
	...board,
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach((to, from, next)=> {
	const token = new UtilsCookie().getCookie('token');
	const authFlag = authenticationUrl(to.path);
	
	if(token!=='') {
		axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(token);
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
	
	if(!authFlag) {
		next();
	} else {
		axios
			.get('/common/auth/check')
			.then(res=> {
				next();
			})
			.catch(error=> {
				new UtilsCookie().deleteCookie('token');
				router.push({name : 'Login'});
			});
	}
});

router.afterEach((to, from)=> {
	let title = to.meta.title || 'toy project';

	nextTick(()=>{
		document.title = title;
	});
});

export default router

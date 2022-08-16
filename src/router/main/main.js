export default [
	{
		path: '/',
		name: 'Main',
		component: ()=> import('@/views/main/Main.vue'),
		meta : {
		  title : 'toy project main',
		},
	},
	{
		path : '/login',
		name : 'Login',
		component : ()=> import('@/views/main/Login.vue'),
		meta : {
			title : '로그인'
		}
	},
	{
		path : '/join',
		name : 'Join',
		component : ()=> import('@/views/main/Join.vue'),
		meta : {
			title : '회원가입',
		}
	}
];
import qs from 'qs';
import axios from 'axios';
// import router from '@/router';

export default ()=> {
	axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
	axios.defaults.responseType = 'json';
	axios.defaults.responseEncoding = 'UTF-8';
	axios.defaults.timeout = 2000;
	axios.defaults.paramsSerializer = params=> {
		return qs.stringify(params);
	};

// 	axios.interceptors.response.use(res=> {
// 		return res;
// 	}, error=>{
// 		const regex = /40[0-9]/gi;
// 		const status = error.response.status;
		
// 		if(regex.test(status)) {
// 			error.message = 'please login.';
// 			router.push('/login');
// 		}

// 		return Promise.reject(error);
//   });
};

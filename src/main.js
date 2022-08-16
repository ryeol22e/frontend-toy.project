import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from "axios";
import qs from 'qs';
import store from './store';
import BootstrapVue3  from 'bootstrap-vue-3';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";


(()=> {  
	axios.defaults.baseURL = process.env.VUE_APP_API_URL;
	axios.defaults.responseType = 'json';
	axios.defaults.responseEncoding = 'UTF-8';
  axios.defaults.paramsSerializer = params=> {
    return qs.stringify(params);
  };

  axios.interceptors.response.use(res=> {
    return res;
  }, error=>{
    const regex = /40[0-9]/gi;
    const status = error.response.status;
    
    if(regex.test(status)) {
      error.message = 'please login.';
      location.href = '/login';
    }

    return Promise.reject(error);
  });
})();

createApp(App)
  .use(BootstrapVue3)
  .use(router)
  .use(store)
  .mount('#app');

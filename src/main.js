import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router';
import axiosConfig from './assets/config/axiosConfig';
import App from './App.vue'

const app = createApp(App);

axiosConfig();
app.use(createPinia()).use(router);
app.mount('#app');

import axios from "axios";
import { defineStore } from "pinia";

export const useStoreHeader = defineStore('useStoreHeader', {
	state : ()=> {
		return {
			headers : new Array()
		}
	},
	getters : {
		getHeaders : state=> state.headers,
	},
	actions : {
		async setHeaders() {
			await axios.get('/common/headers')
				.then(res=> {
					this.headers = res.data;
				})
				.catch(error=> {
					console.log('error');
				});
		},
		setHeaderActive(id) {
			this.headers.map(h=> {
				h.active = h.id===id ? true : false;
			});
		}
	}
});
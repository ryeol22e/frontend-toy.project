import axios from "axios";
import { defineStore } from "pinia";

export const useStoreHeader = defineStore('useStoreHeader', {
	state : ()=>({
		headers : [],
	}),
	getters : {
		getHeaders : state=> state.headers,
	},
	actions : {
		async callHeaders() {
			this.headers = await axios.get('/common/headers', {
				params : {
					commonType : 'header',
					useYn : 'Y',
				}
			})
			.then(res=> res.data)
			.catch(error=> console.log(error));
		},
		setHeaderActive(id) {
			this.headers.map(h=> {
				h.active = h.id===id ? true : false;
			});
		}
	}
});
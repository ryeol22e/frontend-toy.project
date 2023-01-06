import axios from "axios";
import { defineStore } from "pinia";

export const useStoreHeader = defineStore('useStoreHeader', {
	state : ()=>({
		headers : [],
		mypageList : [],
		searchWord : '',
	}),
	getters : {
		getHeaders : state=> state.headers,
		getMypageList : state=> state.mypageList,
		getSearchWord : state=> state.searchWord,

	},
	actions : {
		async callHeaders() {
			await axios.get('/common/headers', {
				params : {
					commonType : 'header',
					useYn : 'Y',
				}
			})
			.then(res=> this.headers = res.data)
			.catch(error=> console.log(error));
		},
		setHeaderActive(id) {
			this.headers.map(h=> {
				h.active = h.id===id ? true : false;
			});
		},
		async setMypageList(param) {
			axios.get('/display/corner', {
				params : param
			}).then(res=> this.mypageList = res.data)
			.catch(error=> console.log(error));
		},
		async setSearchWord(word) {
			await axios.post('/search/'.concat(word), { 
				word,
			})
			.then(res=> this.searchWord = res.data)
			.catch(error=> alert(error.message));
		}
	}
});
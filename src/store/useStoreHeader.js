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
		},
		setMypageList(param) {
			this.mypageList = axios.get('/display/corner', {
				params : param
			}).then(res=> res.data)
			.catch(error=> console.log(error));
		},
		async setSearchWord(word) {
			this.searchWord = await axios.post('/search/'.concat(word), { 
				word,
			})
			.then(res=> res.data)
			.catch(error=> {
				alert(error.message);
				return '';
			});
		}
	}
});
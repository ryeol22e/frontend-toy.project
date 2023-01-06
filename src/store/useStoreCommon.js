import { defineStore } from "pinia";
import axios from "axios";

export const useStoreCommon = defineStore('useStoreCommon', {
	state : ()=> ({
		str : '',
	}),
	getters : {
		getStr : state=> state.str,
	},
	actions : {
		async setStr() {
			await axios.get('/common/clicks')
			.then(res=> this.str = res.data)
			.catch(error=> console.log(error));
		}
	}
})
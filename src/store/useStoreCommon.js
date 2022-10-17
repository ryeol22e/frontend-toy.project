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
		setStr() {
			this.str = axios.get('/common/clicks')
				.then(res=> res.data)
				.catch(error=> console.log(error));
		}
	}
})
import { defineStore } from "pinia";
import axios from 'axios';
import router from '@/router/index.js';

const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {};
export const useStoreBoard = defineStore('useStoreBoard', {
	state : ()=> ({
		boardList : [],
		boardDetail : {
			title : '',
			content : '',
			image : null,
			writer : userInfo.loginId || '',
			type : '',
		},
	}),
	getters : {
		getBoardList : state=> state.boardList,
		getBoardDetail : state=> state.boardDetail,
	},
	actions : {
		async setBoardList(url) {
			this.boardList = await axios.get(url)
				.then(res=> res.data)
				.catch(error=> {
					alert(error.message);
				});
		},
		async setBoardDetail(url) {
			this.boardDetail = await axios.get(url)
			.then(res=> res.data)
			.catch(error=> {
				alert(error.message);
				router.go(-1);
			});
		},
		registImageBoard(type, formData) {
			axios.post('/boards/regist/'.concat(type), formData, {
				headers : {
					'Content-Type' : 'multipart/form-data',
				}
			})
			.then(res=> {
				const result = res.data;

				if(result) {
					alert('등록완료되었습니다.');
					router.push({path : '/boards/'.concat(type)});
				}
			})
			.catch(error=> {
				alert(error.message);
			});
		},
		registGeneralBoard(type, data) {
			axios.post('/boards/regist/'.concat(type), data)
			.then(res=> {
				const result = res.data;

				if(result) {
					alert('등록완료되었습니다.');
					router.push({path : '/boards/'.concat(type)});
				}
			})
			.catch(error=> {
				alert(error.message);
			});
		},
		delBoardData(url) {
			axios.delete(url)
				.then(res=> {
					const result = res.data;

					if(result) {
						alert('삭제되었습니다.');
					}
				})
				.catch(error=> console.log(error))
				.finally(()=> {
					router.go(-1);
				})
		}
	}
});
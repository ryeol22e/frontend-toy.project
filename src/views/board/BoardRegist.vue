<template>
	<RegistForm @boardRegist="boardRegist"></RegistForm>
</template>

<script setup>
	import {useStoreBoard} from '@/store/useStoreBoard.js';
	import RegistForm from '@/components/board/RegistForm.vue';

	const useBoard = useStoreBoard();
	const validate = (data)=> {
		if(data.title==='') {
			alert('제목을 입력해주세요.');
			return false;
		}
		if(data.content===''){
			alert('내용을 입력해주세요.');
			return false;
		}

		return true;
	};
	const boardRegist = (data)=> {
		const type = data.type;
		
		if(validate(data)) {
			if(type==='community') {
				useBoard.registImageBoard(type, changeToFormData(data));
			} else {
				useBoard.registGeneralBoard(type, data);
			}
			
		}
	};
	const changeToFormData = (data)=> {
		const form = new FormData();
		const keyList = Object.keys(data);

		for(let i=0 ; i<keyList.length ; i++) {
			const key = keyList[i];
			const value = data[key];

			form.append(key, value);
		}

		return form;
	};
</script>

<style>

</style>
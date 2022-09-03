<template>
	<RegistForm @boardRegist="boardRegist"></RegistForm>
</template>

<script setup>
	import { useRouter } from 'vue-router';
	import axios from 'axios';
	import RegistForm from '@/components/board/RegistForm.vue';

	const router = useRouter();
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
		if(validate(data)) {
			const type = data.type;
			const formData = changeToFormData(data);

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
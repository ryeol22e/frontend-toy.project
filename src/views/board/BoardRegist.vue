<template>
	<RegistForm @boardRegist="boardRegist"></RegistForm>
</template>

<script>
	import axios from 'axios';
	import RegistForm from '@/components/board/RegistForm';

	export default {
		name : 'BoardRegist',
		components : {
			RegistForm
		},
		created(){},
		methods : {
			boardRegist(data) {
				if(this.validate(data)) {
					const type = data.type;
					axios.post('/boards/regist/'.concat(type), data)
						.then(res=> {
							const result = res.data;

							if(result) {
								alert('등록완료되었습니다.');
								this.$router.push({path : '/boards/'.concat(type)});
							}
						})
						.catch(error=> {
							alert(error.message);
						});
				}
			},
			validate(data) {
				if(data.title==='') {
					alert('제목을 입력해주세요.');
					return false;
				}
				if(data.content===''){
					alert('내용을 입력해주세요.');
					return false;
				}

				return true;
			}

		}
	}
</script>

<style>

</style>
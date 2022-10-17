<template>
	<div>
		<h1>view</h1>
		<h2>{{data.future1}}</h2>
		<h2>{{data.future2}}</h2>
		<SetupTestComp :data="data" @buttonHanlder="buttonHanlder"/>
		<button type="button" class="btn btn-primary" @click="clickButton">클릭해봐</button>
		<h3>{{str}}</h3>
	</div>
</template>

<script setup>
	import axios from 'axios';
	import { ref, reactive, onMounted, onUpdated, computed } from 'vue';
	import SetupTestComp from '@/components/common/SetupTestComp.vue';
	import {useStoreCommon} from '@/store/useStoreCommon';

	const str = ref('!!!');
	const data = reactive({
		obj : new Object(),
		list : new Array(),
		str : 'this is string.',
		future1 : '',
		future2 : '',
	});
	const useCommon = useStoreCommon();
	const buttonHanlder = (data)=> {
		console.log('emit data. this processing logics...');
		console.log('data : ', data);
	};
	const clickButton = async ()=> {
		useCommon.setStr();
		const result = await useCommon.getStr;
		
		if(result) {
			alert(result);
			str.value = 'alert창의 문제인가..?';
		}
	};

	onMounted(()=> {
		axios.get('/common/future1')
			.then(res=> {
				data.future1 = res.data;
			})
			.catch(error=> {
				alert(error);
			});
		
		axios.get('/common/future2')
			.then(res=> {
				data.future2 = res.data;
			})
			.catch(error=> {
				alert(error);
			})
	});
</script>
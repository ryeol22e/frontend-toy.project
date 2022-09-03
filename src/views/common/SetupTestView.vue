<template>
	<div>
		<h1>view</h1>
		<h2>{{data.future1}}</h2>
		<h2>{{data.future2}}</h2>
		<SetupTestComp :data="data" @buttonHanlder="buttonHanlder"/>
	</div>
</template>

<script setup>
	import axios from 'axios';
	import { ref, reactive, onMounted, onUpdated } from 'vue';
	import SetupTestComp from '@/components/common/SetupTestComp.vue';

	const data = ref({
		obj : new Object(),
		list : new Array(),
		str : 'this is string.',
		future1 : '',
		future2 : '',
	});
	const buttonHanlder = (data)=> {
		console.log('emit data. this processing logics...');
		console.log('data : ', data);
	};

	onMounted(()=> {
		// axios.get('/common/future1')
		// 	.then(res=> {
		// 		data.value.future1 = res.data;
		// 	})
		// 	.catch(error=> {
		// 		alert(error);
		// 	});
		
		// axios.get('/common/future2')
		// 	.then(res=> {
		// 		data.value.future2 = res.data;
		// 	})
		// 	.catch(error=> {
		// 		alert(error);
		// 	})
	});
</script>
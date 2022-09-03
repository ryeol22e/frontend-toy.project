<template>
	<div>
		<h1>{{data.id}}</h1>
		<button type="button" class="w-100 btn btn-lg btn-primary" @click="callFetch">fetch call</button>
	</div>
</template>

<script setup>
	import { reactive, onMounted, onUpdated } from 'vue';
	import { useRoute } from 'vue-router';
	
	const route = useRoute();
	const data = reactive({
		id : '',
	});
	const callFetch = ()=> {
		
	}

	onMounted(()=> {
		data.id = route.params.id;
	});

	onUpdated(()=> {
		data.id = route.params.id;
	});
</script>
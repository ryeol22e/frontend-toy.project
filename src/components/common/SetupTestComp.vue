<template>
	<h2>component</h2>
	<p>{{props.data.str}}</p>
	<button class="btn btn-primary" @click="sendParent">emit button</button>
</template>

<script setup>
	const props = defineProps({
		data : {
			type : Object,
		}
	});
	const emit = defineEmits([
		'buttonHanlder',
	]);

	const sendParent = ()=> {
		emit('buttonHanlder', {
			id : 'jaeryeol',
			name : '이재렬 :)',
		});
	};
</script>
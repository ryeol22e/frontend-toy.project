<template>
	<h3>{{props.boardInfo.title}}</h3>
	<br>
	<p>{{props.boardInfo.content}}</p>
</template>

<script setup>
	const props = defineProps({
		boardInfo : Object,
	});
	
</script>
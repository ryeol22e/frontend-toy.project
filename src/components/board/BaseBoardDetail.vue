<template>
	<h3>{{boardInfo.title}}</h3>
	<br>
	<img v-if="!useIsEmpty(boardInfo.imageDataByte)" :src="`data:image/png;base64,${boardInfo.imageDataByte}`" alt="">
	<p>{{boardInfo.content}}</p>
</template>

<script setup>
	import {useUtils} from '@/composables/useUtils.js';

	const useIsEmpty = useUtils().useIsEmpty;
	const props = defineProps({
		boardInfo : Object,
	});
	
</script>
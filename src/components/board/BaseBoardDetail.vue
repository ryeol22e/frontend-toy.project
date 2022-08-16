<template>
	<h3>{{boardInfo.title}}</h3>
	<br>
	<p>{{boardInfo.content}}</p>
</template>

<script>
	export default {
		name : 'BaseBoardDetail',
		props : ['boardInfo'],
		created() {},
	};
</script>
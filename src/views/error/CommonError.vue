<template>
	<keep-alive>
		<NotFound :is="props.errorType==='404'"/>
	</keep-alive>
	<keep-alive>
		<ServerError :is="props.errorType==='500'"/>
	</keep-alive>
	<keep-alive>
		<CheckSite :is="props.errorType==='9999'"/>
	</keep-alive>
</template>

<script setup>
	import NotFound from "@/components/error/NotFound.vue";
	import ServerError from "@/components/error/ServerError.vue";
	import CheckSite from "@/components/error/CheckSite.vue";

	const props = defineProps({
		errorType : String,
	});
</script>
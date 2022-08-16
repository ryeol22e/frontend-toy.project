<template>
	<keep-alive>
		<NotFound :is="errorType==='404'"/>
	</keep-alive>
	<keep-alive>
		<ServerError :is="errorType==='500'"/>
	</keep-alive>
	<keep-alive>
		<CheckSite :is="errorType==='9999'"/>
	</keep-alive>
</template>

<script>
	import NotFound from "@/components/error/NotFound.vue";
	import ServerError from "@/components/error/ServerError.vue";
	import CheckSite from "@/components/error/CheckSite.vue";

	export default {
		name : 'Error',
		props : ['errorType'],
		components : {
			NotFound,
			ServerError,
			CheckSite,
		}
		
	}
</script>
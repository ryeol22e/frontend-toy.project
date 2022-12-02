<template>
	<SubHeader @subHeaderHandler="subHeaderHandler"/>
	<router-view></router-view>
</template>

<script setup>
	import { useRouter } from 'vue-router';
	import SubHeader from '@/components/common/SubHeader.vue';

	const router = useRouter();
	const subHeaderHandler = (data)=> {
		console.log(data);
	}
	

</script>

<template>
	<Header></Header>
	<!-- <router-view class="container"/> -->
	<RouterView/>
</template>

<script setup>
	import Header from '@/components/common/Header.vue';
	import { RouterView } from 'vue-router';
</script>
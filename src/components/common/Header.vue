<template>
	<SideBar v-if="isLogin" :isMyPage="isLogin" title="mypage"/>
	<Modal :title="headerData.modalTitle" :content="headerData.modalContent"/>

	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<RouterLink to="/" class="navbar-brand">TOY</RouterLink>
		
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="getHeaders.length>0">
					<li class="nav-item" v-for="(header, index) in getHeaders" :key="index" :class="header.active ? 'active' : ''">
						<RouterLink class="nav-link" :to="{path : header.path}" @click="changeStyle(header)">{{header.name}}</RouterLink>
					</li>
				</ul>
				<div class="d-flex">
					<RouterLink class="navbar-text" to="/login" v-if="!isLogin" style="text-decoration: none;">login</RouterLink>
					<a href="#sideBar" class="navbar-text" role="button" data-bs-toggle="offcanvas" aria-controls="sideBar" v-else @click="isMyPage=!isMyPage" style="text-decoration: none;">mypage</a>
					&nbsp;&nbsp;
					<RouterLink class="navbar-text" to="/join" v-if="!isLogin" style="text-decoration: none;">join</RouterLink>
					<a href="javascript:void(0);" class="navbar-text" v-else @click="logout" style="text-decoration: none;">logout</a>
					&nbsp;&nbsp;
					<input class="form-control me-2 dropwon-toggle" type="search" placeholder="Search" aria-label="Search" v-model="headerData.word" @keypress.enter="searchWord">
					<button class="btn btn-outline-success" type="button" @click="searchWord">Search</button>
				</div>
			</div>
		</div>
	</nav>
	<br>
</template>

<script setup>
	import {ref, reactive, onMounted, computed } from 'vue';
	import axios from 'axios';
	import {useUtils} from '@/composables/useUtils.js';
	import SideBar from '@/components/common/SideBar.vue';
	import Modal from '@/components/common/Modal.vue';
	import { useStoreHeader } from '@/store/useStoreHeader';
	import { useStoreUser } from '@/store/useStoreUser';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const useCookie = useUtils().useCookie;
	const storeUser = useStoreUser();
	const storeHeader = useStoreHeader();
	const getHeaders = computed(()=> storeHeader.getHeaders);
	const isLogin = computed(()=> storeUser.getIsLogin);
	const headerData = reactive({
		word : '',
		modalTitle : '',
		modalContent : '',
	});
	const changeStyle = (header)=> {
		storeHeader.setHeaderActive(header.id);
	};
	const logout = ()=> {
		useCookie.deleteCookie('token');
		sessionStorage.removeItem('userInfo');
		storeUser.setIsLogin(false);
		router.push('/');
	};
	const searchWord = (e)=> {
		const word = String(headerData.value.word);
		
		if(word.replace(/[\s]/gi, '').length>0) {
			axios.post('/search/'.concat(word), { 
				word : word,
			})
			.then(res=> {
				const data = res.data || '';
				const width = (window.screen.width/2) - (1140/2);
				const height = (window.screen.height/2) - (600/2);

				if(data!=='') {
					const popup = window.open(data, '', 'width=1140, height=600, left='.concat(width).concat(', top=').concat(height));
				}
			})
			.catch(error=> {
				alert(error.message);
			});
		} else {
			const el = document.createElement('button');
			const event = new MouseEvent('click');
			headerData.value.modalTitle = 'no search word.';
			headerData.value.modalContent = 'please write search word.';

			document.getElementById('app').appendChild(el);
			el.setAttribute('data-bs-toggle', 'modal');
			el.setAttribute('data-bs-target', '#commonModal');
			el.dispatchEvent(event);
			el.remove();
			
			return false;
		}
	};

	onMounted(()=> {
		storeHeader.callHeaders();
		const token = useCookie.getCookie('token');
		
		if(token!=='') {
			storeUser.setIsLogin(true);
		}
	});
</script>

<style scoped>
	nav-link:visited {

	}
</style>
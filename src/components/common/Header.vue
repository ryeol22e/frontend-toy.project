<template>
	<SideBar v-if="isLogin" :isMyPage="isLogin" title="mypage"/>
	<Modal :title="headerData.modalTitle" :content="headerData.modalContent"/>

	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<RouterLink to="/" class="navbar-brand">TOY</RouterLink>
		
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="getHeaders.length>0">
					<li v-for="(header, index) in getHeaders" :key="index" :class="`nav-item${header.active ? ' active' : ''}`">
						<RouterLink :to="{path : header.path}" @click="changeStyle(header)" class="nav-link">{{header.name}}</RouterLink>
					</li>
					<!-- <li :class="`nav-item`">
						<RouterLink @click="changeStyle({id : 9999, active : null})" to="/setup/test" class="nav-link">TESTPAGE</RouterLink>
					</li> -->
				</ul>
				<div class="d-flex">
					<RouterLink v-if="!isLogin" class="navbar-text" to="/login">login</RouterLink>
					<a v-else @click="isMyPage=!isMyPage" href="#sideBar" class="navbar-text" role="button" data-bs-toggle="offcanvas" aria-controls="sideBar">mypage</a>
					<span class="navbar-text">&nbsp;|&nbsp;</span>
					<RouterLink v-if="!isLogin" class="navbar-text" to="/join">join</RouterLink>
					<a v-else href="javascript:void(0);" class="navbar-text" @click="logout">logout</a>
					&nbsp;&nbsp;
					<input v-model="headerData.word" @keypress.enter="searchWord" class="form-control me-2 dropwon-toggle" type="search" placeholder="Search" aria-label="Search">
					<button @click="searchWord" class="btn btn-outline-success" type="button">Search</button>
				</div>
			</div>
		</div>
	</nav>
	<br>
</template>

<script setup>
	import { reactive, onMounted, computed } from 'vue';
	import {useUtils} from '@/composables/useUtils.js';
	import SideBar from '@/components/common/SideBar.vue';
	import Modal from '@/components/common/Modal.vue';
	import { useStoreHeader } from '@/store/useStoreHeader';
	import { useStoreUser } from '@/store/useStoreUser';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const useCookie = useUtils().useCookie;
	const useIsEmpty = useUtils().useIsEmpty;
	const storeUser = useStoreUser();
	const storeHeader = useStoreHeader();
	const getHeaders = computed(()=> storeHeader.getHeaders);
	const isLogin = computed(()=> storeUser.getIsLogin);
	const searchWordData = computed(()=> storeHeader.getSearchWord);
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
	const searchWord = async (e)=> {
		const word = String(headerData.word);

		if(word.replace(/[\s]/gi, '').length>0) {
			await storeHeader.setSearchWord(word);
			
			const width = (window.screen.width/2) - (1140/2);
			const height = (window.screen.height/2) - (600/2);
			
			if(!useIsEmpty(searchWordData.value)) {
				const popup = window.open(searchWordData.value, '', 'width=1140, height=600, left='.concat(width).concat(', top=').concat(height));
			}
		} else {
			const el = document.createElement('button');
			const event = new MouseEvent('click');
			headerData.modalTitle = 'no search word.';
			headerData.modalContent = 'please write search word.';

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
	@import url('../../assets/css/navbar.css');
	
	a {
		text-decoration: none;
	}
	nav-link:visited {

	}
</style>
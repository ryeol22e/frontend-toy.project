<template>
	<SideBar :isMyPage="isMyPage" @changeBoolMyPage="changeBoolMyPage" title="mypage" v-if="storeUser.getIsLogin"/>
	<Modal :title="headerData.modalTitle" :content="headerData.modalContent"/>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<router-link to="/" class="navbar-brand">TOY</router-link>
		
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="getHeaders.length>0">
					<li class="nav-item" v-for="(header, index) in getHeaders" :key="index" :class="header.active ? 'active' : ''">
						<router-link class="nav-link" :to="{path : header.path}" @click="changeStyle(header)">{{header.name}}</router-link>
					</li>
				</ul>
				<div class="d-flex">
					<router-link class="navbar-text" to="/login" v-if="!storeUser.getIsLogin" style="text-decoration: none;">login</router-link>
					<a href="#sideBar" class="navbar-text" role="button" data-bs-toggle="offcanvas" aria-controls="sideBar" v-else @click="isMyPage=!isMyPage" style="text-decoration: none;">mypage</a>
					&nbsp;&nbsp;
					<router-link class="navbar-text" to="/join" v-if="!storeUser.getIsLogin" style="text-decoration: none;">join</router-link>
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
	import { reactive, onMounted, computed } from 'vue';
	import axios from 'axios';
	import UtilsCookie from '@/assets/common/UtilsCookie';
	import SideBar from '@/components/common/SideBar.vue';
	import Modal from '@/components/common/Modal.vue';
	import { useStoreHeader } from '@/store/useStoreHeader';
	import { useStoreUser } from '@/store/useStoreUser';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const storeUser = useStoreUser();
	const storeHeader = useStoreHeader();
	const getHeaders = computed(()=> {
		return storeHeader.getHeaders;
	});
	const headerData = reactive({
		word : '',
		isMyPage : false,
		modalTitle : '',
		modalContent : '',
	});
	const changeStyle = (header)=> {
		storeHeader.setHeaderActive(header.id);
	};
	const logout = ()=> {
		new UtilsCookie().deleteCookie('token');
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
	const changeBoolMyPage= (data)=> {
		headerData.value.isMyPage = Boolean(data);
	}

	onMounted(()=> {
		storeHeader.callHeaders();
		const token = new UtilsCookie().getCookie('token');
		
		if(token!=='') {
			storeUser.setIsLogin(true);
		}
	});
</script>

<style>
	nav-link:visited {

	}
</style>
<template>
	<SideBar :isMyPage="isMyPage" @changeBoolMyPAge="changeBoolMyPAge" title="mypage"/>
	<Modal :title="modalTitle" :content="modalContent"/>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<a href="/" class="navbar-brand">TOY</a>
		
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link class="nav-link header-list" to="/boards/qna" @click="changeStyle">Q&A</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link header-list" to="/boards/community" @click="changeStyle">COMMUNITY</router-link>
					</li>
				</ul>
				<div class="d-flex">
					<router-link class="navbar-text" to="/login" v-if="!isLogin" style="text-decoration: none;">login</router-link>
					<a href="#sideBar" class="navbar-text" role="button" data-bs-toggle="offcanvas" aria-controls="sideBar" v-else @click="isMyPage=!isMyPage" style="text-decoration: none;">mypage</a>
					&nbsp;&nbsp;
					<router-link class="navbar-text" to="/join" v-if="!isLogin" style="text-decoration: none;">join</router-link>
					<a href="javascript:void(0);" class="navbar-text" v-else @click="logout" style="text-decoration: none;">logout</a>
					&nbsp;&nbsp;
					<input class="form-control me-2 dropwon-toggle" type="search" placeholder="Search" aria-label="Search" v-model="word" @keypress.enter="searchWord">
					<button class="btn btn-outline-success" type="submit" @click="searchWord">Search</button>
				</div>
			</div>
		</div>
	</nav>
	<br>
</template>

<script>
	import axios from 'axios';
	import UtilsCookie from '../../assets/js/common/UtilsCookie';
	import SideBar from './SideBar.vue';
	import Modal from './Modal.vue';

	export default {
		name : 'Header',
		props : ['isLogin'],
		components : {
			SideBar,
			Modal,
		},
		data() {
			return {
				word : '',
				isMyPage : false,
				modalTitle : '',
				modalContent : '',
			};
		},
		created() {},
		mounted() {},
		// watch : {
		// 	searchData(data) {
		// 		const searchData = String(data).replace(/[\s]/gi, '');
		// 		if(searchData.length>0) {
		// 			console.log('searching...');
		// 		}
		// 	}
		// },
		methods :{
			changeStyle(e) {
				const el = e.currentTarget;
				const headerList = [...document.getElementsByClassName('header-list')];

				headerList.forEach((item)=> {
					item.classList.remove('active');
				});

				el.classList.add('active');
			},
			logout() {
				new UtilsCookie().deleteCookie('token');
				location.href = '/';
			},
			searchWord(e) {
				const word = String(this.$data.word);

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
					this.$data.modalTitle = 'no search word.';
					this.$data.modalContent = 'please write search word.';

					document.getElementById('app').appendChild(el);
					el.setAttribute('data-bs-toggle', 'modal');
					el.setAttribute('data-bs-target', '#commonModal');
					el.dispatchEvent(event);
					el.remove();
					
					return false;
				}
			},
			changeBoolMyPAge(data) {
				this.$data.isMyPage = Boolean(data);
			}
			
		}
	}
</script>

<style>
	nav-link:visited {

	}
</style>
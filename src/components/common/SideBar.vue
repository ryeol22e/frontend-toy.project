<template>
	<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="sideBar" aria-labelledby="sideBarLabel">
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="sideBarLabel">{{title}}</h5>
			<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="offcanvas-body">
			<ul>
				<li v-if="cornerList.length>0" v-for="(corner, index) in cornerList" :key="index">
					<h3 v-if="corner.cornerDepth==='1'">{{corner.cornerName}}</h3>
					<a href="javascript:void(0);" v-else-if="corner.cornerDepth!=='1'">{{corner.cornerName}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {computed, onMounted } from 'vue';
	import { useStoreHeader } from '@/store/useStoreHeader';

	export default {
		name : 'SideBar',
		props : ['title', 'isMyPage'],
		setup(props) {
			const useHeader = useStoreHeader();
			const cornerList = computed(()=> useHeader.getMypageList);

			onMounted(()=> {
				const isMyPage = props.isMyPage;

				if(isMyPage) {
					const param = {
						cornerTypeCode : '10000',
						useYn : 'Y',
						dispYn : 'Y',
					};

					useHeader.setMypageList(param);
				}
			});

			return {cornerList};
		}
	}
</script>

<style>
	ul {
		list-style: none;
		padding-left: 0px;
	}

	a {
		text-decoration: none;
	}
</style>
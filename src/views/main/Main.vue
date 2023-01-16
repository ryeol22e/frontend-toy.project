<template>
	<!-- <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
		<div class="carousel-indicators">
			<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
			<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
			<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
		</div>
		<div class="carousel-inner">
			<div class="carousel-item active">
			<img src="@/assets/1655348868189.jpg" class="d-md-block w-100" alt="..." height="900">
			</div>
			<div class="carousel-item">
			<img src="@/assets/1646896562201.jpg" class="d-md-block w-100" alt="..." height="900">
			</div>
			<div class="carousel-item">
			<img src="@/assets/1643080221765.jpg" class="d-md-block w-100" alt="..." height="900">
			</div>
		</div>
		<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>
	</div> -->
	<div>
		<a href="https://www.a-rt.com/" title="go!">
			<video id="video" preload autoplay loop muted>
				<source src="@/assets/images/1665636867671.mp4" type="video/mp4">
			</video>
		</a>
	</div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from 'vue';
	const x = ref(0);
	const y = ref(0);
	const onScroll = e=> {
		x.value = window.scrollX;
		x.value = window.scrollY;
	};

	// 스크롤 이벤트 바인딩
	onMounted(()=> {
		window.addEventListener('scroll', onScroll);
	});
	// main.vue 떠날때 이벤트 해제.
	onUnmounted(()=> {
		window.removeEventListener('scroll', onScroll);
	})
</script>

<style scoped>
	video {
		object-fit: initial;
		width: 100%;
		height: 820px;
	}
</style>
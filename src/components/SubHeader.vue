<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light container">
		<div class="container-fluid">
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item">
						<router-link class="nav-link header-list" :to="{name: 'SubItem', params : {id : '1'}}" @click="emitHandler">sub1</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link header-list" :to="{name: 'SubItem', params : {id : '2'}}">sub2</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script setup>
	const emit = defineEmits([
		'subHeaderHandler'
	]);
	const emitHandler = ()=> {
		emit('subHeaderHandler', 'hello emit world.');
	}
</script>
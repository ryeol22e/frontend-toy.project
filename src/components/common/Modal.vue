<template>
	<div class="modal fade" id="commonModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalLabel">{{title}}</h5>
					<!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
				</div>
				<div class="modal-body">
					{{content}}
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<!-- <button type="button" class="btn btn-primary">Understood</button> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name : 'Modal',
		props : ['title', 'content'],
		created() {
			// if(this.title===undefined || this.title===null || this.title==='') {
			// 	this.title = 'WARN';
			// }
			// if(this.content===undefined || this.content===null || this.content==='') {
			// 	this.content ='WARNNING...';
			// }
		}
	}
</script>
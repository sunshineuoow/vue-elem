<template>
	<div class="shoplist_container">
		<ul v-load-more="loadMore" v-if="shopListArr.length" type="1">
			
		</ul>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import { shopList } from '../../service/getData'
	import { imgBaseUrl } from '../../config/env'
	import { loadMore, getImgPath } from './mixin'
</script>

<style lang="scss" scoped>
	
</style>
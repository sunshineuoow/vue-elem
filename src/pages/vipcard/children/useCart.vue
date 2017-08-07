<template>
	<div class="page_container">
		<head-top head-title="兑换会员" go-back="true"></head-top>
		<p class="buy_for">成功兑换后将关联到当前帐号： <span>{{userInfo.username}}</span></p>
		<form class="form_style">
			
		</form>
		<p class="determine">兑换</p>
		<footer class="binding"></footer>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import headTop from '../../../components/header/head'
	import alertTip from '../../../components/common/alertTip'


	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState([
				'userInfo'
			])
		},
		components: {
			headTop,
			alertTip
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/mixin';

	.page_container{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding-top: 1.95rem;
		z-index: 202;
		background-color: #fff;
		p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
	}
</style>
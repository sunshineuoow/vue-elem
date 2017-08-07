<template>
	<div class="page_container">
		<head-top head-title="购买记录" go-back="true"></head-top>
		<section class="invoice_container">
			<img src="../../../images/no-log.png">
			<p>没有购买记录</p>
		</section>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import headTop from '../../../components/header/head'

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
			headTop
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

	.invoice_container{
		display: flex;
		flex-direction: column;
		align-items: center;
		img{
			@include wh(8rem, 5rem);
			margin-top: 5rem;
		}
		p{
			margin-top: .8rem;
			@include sc(.6rem, #999);
		}
	}
</style>
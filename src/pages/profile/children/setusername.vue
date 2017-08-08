<template>
	<div class="page">
		<head-top head-title="修改用户名" go-back="true"></head-top>
		<section class="setname">
			<section class="setname-top">
				<input type="text" placeholder="请输入用户名">
				<div>
					<p>用户名只能修改一次（5-24字符之间）</p>
				</div>
			</section>
			<section class="reset">
				<button>确认修改</button>
			</section>
		</section>
	</div>
</template>

<script>
	import headTop from '../../../components/header/head'

	export default {
		data() {
			return {

			}
		},
		components: {
			headTop,
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/mixin';

	.page{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding-top: 1.95rem;
		z-index: 202;
		background-color: #f2f2f2;
		p, span{
    	    font-family: Helvetica Neue,Tahoma,Arial;
    	}
	}

	.setname{
		width: 15.2rem;
		margin: 0 auto;
		.setname-top{
			padding-top: .4rem;
			input{
				display: block;
				width: 15.2rem;
				line-height: 1.2rem;
				padding: .2rem .1rem;
				border: 1px solid #ddd;
				background: none;
				font-size: .7rem;
			}
			p{
				width: 100%;
				padding: .4rem 0 1rem;
				@include sc(.4rem, #666);
			}
		}
		.reset{
			width: 100%;
			background-color: $blue;
			button{
				display: block;
				width: 100%;
				line-height: 2rem;
				@include sc(.7rem, #fff);
				opacity: .6;
				background: none;
				transition: all 1s;
			}
		}
	}
</style>
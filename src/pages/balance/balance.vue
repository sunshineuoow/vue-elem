<template>
	<div class="page">
		<head-top head-title="我的余额" go-back="true"></head-top>
		<section class="content_container">
			<section class="content">
				<header class="content_header">
					<span class="content_title_style">当前余额</span>
					<section class="content_description">
						<img src="../../images/description.png" height="24" width="24">
						<router-link to="/balance/detail" class="content_title_style">余额说明</router-link>
					</section>
				</header>
				<p class="content_num">
					<span>0.00</span>
					<span>元</span>
				</p>
				<div class="promit_button">提现</div>
			</section>
		</section>
		<p class="deal_detail">交易明细</p>
		<div class="no_log">
			<img src="../../images/no-log.png">
			<p>暂无明细记录</p>
		</div>
		<transition name="router-slide" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'

	export default {
		data() {
			return {

			}
		},
		components: {
			headTop
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';

	.page{
		padding-top: 1.95rem;
		p, span{
			font-family: Helvetica Neue,Tahoma,Arial;
		}
	}
	.content_container{
		padding: .3rem;
		background-color: $blue;
		.content{
			padding: .4rem;
			border-radius: .15rem;
			background-color: #fff;
			.content_header{
				@include fj;
				font-size: .55rem;
				.content_title_style{
					color: #666;
				}
				.content_description{
					display: flex;
					align-items: center;
					img{
						@include wh(.6rem, .6rem);
						margin-right: .2rem;
					}
					.content_title_style{
						color: $blue;
					}
				}
			}
			.content_num{
				span:nth-of-type(1){
					@include sc(1.8rem, #333);
				}
				span:nth-of-type(2){
					@include sc(.7rem, #333);
				}
			}
			.promit_button{
				@include wh(100%, 2rem);
				line-height: 2rem;
				margin-top: 1rem;
				border-radius: .15rem;
				@include sc(.8rem, #fff);
				text-align: center;
				background-color: #ccc;
			}
		}
	}
	.deal_detail{
		line-height: 2rem;
		padding-left: .5rem;
		@include sc(.6rem, #999);
	}
	.no_log{
		margin-top: 1rem;
		text-align: center;
		img{
			@include wh(8rem, 5rem);
		}
		p{
			margin-top: .5rem;
			@include sc(.7rem, #666);
		}
	}

	.router-slide-enter-active, .router-slide-leave-active{
		transition: all .4s;
	}
	.router-slide-enter, .router-slide-leave-active{
		transform: translate3d(2rem, 0, 0);
		opacity: 0;
	}
</style>
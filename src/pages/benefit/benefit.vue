<template>
	<div class="benefit_page">
		<head-top head-title="我的优惠" go-back="true"></head-top>
		<section v-if="!showLoading">
			<section class="category_title">
				<span :class="{chosen: categoryType == 1}" @click="categoryType = 1">红包</span>
				<span :class="{chosen: categoryType == 2}" @click="categoryType = 2">商家代金券</span>
			</section>
			<transition name="router-fade">
				<section v-if="categoryType == 1">
					<section class="hongbao_container">
						<header class="hongbao_title">
							<section class="total_number">
								有 <span>{{hongbaoList.length}} </span> 个红包即将到期
							</section>
							<section class="hongbao_description">
								<img src="../../images/description.png" height="24" width="24">
								<router-link to="/benefit/hbDescription" class="hongbao_detail">红包说明</router-link>
							</section>
						</header>
						<ul class="hongbao_list_ul">
							<li class="hongbao_list_li" v-for="item in hongbaoList" :key="item.id">
								<section class="list_item">
									<div class="list_item_left">
										<span>&yen;</span>
										<span>{{String(item.amount).split('.')[0]}}</span>
										<span>.</span>
										<span>{{String(item.amount).split('.')[1] || 0}}</span>
										<p>{{item.description_map.sum_condition}}</p>
									</div>
									<div class="list_item_right">
										<h4>{{item.name}}</h4>
										<p>{{item.description_map.validity_periods}}</p>
										<p>{{item.description_map.phone}}</p>
									</div>
									<div class="time_left">{{item.description_map.validity_delta}}</div>
								</section>
								<footer class="list_item_footer" v-if="item.limit_map">
									<p>{{item.limit_map.restaurant_flavor_ids}}</p>
								</footer>
							</li>
						</ul>
					</section>
					<router-link to="/benefit/hbHistory" class="history_hongbao">
						<span class="check_history">查看历史红包</span>
						<svg class="history_right">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
						</svg>
					</router-link>
					<footer class="hongbao_footer">
						<router-link to="/benefit/exchange" class="hongbao_style" style="border-right: 1px solid #f5f5f5">
                            兑换红包
                        </router-link>
                        <router-link to="/benefit/commend" class="hongbao_style">
                            推荐有奖
                        </router-link>
					</footer>
				</section>
			</transition>
			<transition name="router-fade">
				<section v-if="categoryType == 2" class="voucher_container">
					<section class="hongbao_description voucher_header">
						<img src="../../images/description.png" height="24" width="24">
						<router-link to="/benefit/coupon" class="hongbao_detail">商家代金券说明</router-link>
					</section>
					<section class="unable_use">
						<img src="../../images/voucher.png" height="170" width="300">
						<p>无法使用代金券</p>
						<p>非客户端或客户端版本过低</p>
						<router-link to="/download" class="download_app">下载或升级客户端</router-link>
					</section>
				</section>
			</transition>	
		</section>
		<alert-tip v-if="showAlert" :alert-text="alertText" @closeTip = "showAlert = false"></alert-tip>
		<loading v-show="showLoading"></loading>
		<transition name="router-slide" mode="out-in">
			<router-view></router-view>
		</transition>	
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import headTop from '../../components/header/head'
	import loading from '../../components/common/loading'
	import alertTip from '../../components/common/alertTip'
	import { getHongbaoNum } from '../../service/getData'

	export default {
		data() {
			return {
				showLoading: true,
				showAlert: false,
				alertText: null,
				hongbaoList: null,
				categoryType: 1,
			}
		},
		mounted() {
			this.initData();
		},
		computed: {
			...mapState([
				'userInfo'
			])
		},
		components: {
			headTop,
			loading,
			alertTip
		},
		methods: {
			async initData() {
				if (this.userInfo) {
					this.hongbaoList = await getHongbaoNum(this.userInfo.user_id);
					this.showLoading = false;
				}
			}
		},
		watch: {
			userInfo: function(value) {
				this.initData();
			}
		}
	}

</script>

<style lang="scss" scoped>
	@import '../../style/mixin';

	.benefit_page{
		padding-top: 1.95rem;
		p, span{
			font-family: Helvetica Neue,Tahoma,Arial;
		}
	}
	.category_title{
		@include fj(space-around);
		align-items: center;
		height: 2rem;
		background-color: #fff;
		span{
			padding-bottom: .2rem;
			border-bottom: 0.1rem solid #fff;
			@include sc(.65rem, #333);
			text-align: center;
		}
		.chosen{
			color: $blue;
			border-bottom-color: $blue;
		}
	}
	.hongbao_container{
		padding: 0 .7rem;
		.hongbao_title{
			@include fj;
			line-height: 2rem;
			font-size: .5rem;
			.total_number{
				color: #666;
				span{
					color: #ff5340;
				}
			}
		}
		.hongbao_list_ul{
			.hongbao_list_li{
				margin-bottom: .5rem;
				border-radius: .25rem;
				background: url('../../images/hongbao.png') repeat-x #fff;
				background-size: .5rem .2rem;
				.list_item{
					@include fj;
					padding: 1rem .5rem .8rem;
					.list_item_left{
						flex: 1;
						font-size: 0;
						border-right: 0.025rem solid #ccc;
						span:nth-of-type(1){
							@include sc(.75rem, #ff5340);
							font-weight: bold;
						}
						span:nth-of-type(2){
							@include sc(1.5rem, #ff5340);
						}
						span:nth-of-type(3),span:nth-of-type(4){
							@include sc(.8rem, #ff5340);
							font-weight: bold;
						}
						p{
							@include sc(.4rem, #999);
						}
					}
					.list_item_right{
						flex: 2;
						margin-left: 1.5rem;
						h4{
							@include sc(.7rem, #666);
							margin-left: -.7rem;
						}
						p{
							margin-left: -.7rem;
							@include sc(.4rem, #999);
							list-style-type: disc;
						}
					}
					.time_left{
						@include sc(.75rem, #ff5340);
					}
				}
				.list_item_footer{
					padding: .4rem;
					border-bottom-left-radius: .25rem;
					border-bottom-right-radius: .25rem;
					background-color: #f9f9f9;
					p{
						margin-left: .4rem;
						@include sc(.4rem, #999);
						list-style-type: disc;
					}
				}
			}
		}
	}
	.hongbao_description{
		display: flex;
		align-items: center;
		img{
			@include wh(.6rem, .6rem);
			margin-right: .2rem;
		}
		.hongbao_detail{
			color: $blue;
		}
	}
	.history_hongbao{
		@include fj(center);
		align-items: center;
		padding: .5rem 0 2.8rem;
		.check_history{
			margin-right: .2rem;
			@include sc(.5rem, #999);
		}
		.history_right{
			@include wh(.4rem, .4rem);
			fill: #aaa;
		}
	}
	.hongbao_footer{
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		background-color: #fff;
		.hongbao_style{
			flex: 1;
			line-height: 2rem;
			@include sc(.7rem, #555);
			text-align: center;
		}
	}
	.voucher_container{
		.voucher_header{
			justify-content: flex-end;
			line-height: 2rem;
			margin-right: .5rem;
			font-size: .5rem;
		}
		.unable_use{
			margin-top: 4rem;
			text-align: center;
			img{
				@include wh(6rem, 3.4rem);
			}
			p{
				margin-top: .4rem;
				@include sc(.7rem, #666);
			}
			p:nth-of-type(2){
				margin: .3rem 0;
				@include sc(.5rem, #999);
			}
			.download_app{
				padding: .3rem;
				border-radius: .15rem;
				@include sc(.65rem, #fff);
				background-color: #56d176;
			}
		}
	}

	.router-fade-enter-active, .router-fade-leave-active{
		transition: opacity .3s;
	}
	.router-fade-enter, .router-fade-leave-active{
		opacity: 0;
	}
	.router-slide-enter-active, .router-slide-leave-active{
		transition: all .4s;
	}
	.router-slide-enter, .router-slide-leave-active{
		transform: translate3d(2rem, 0, 0);
		opacity: 0;
	}
</style>
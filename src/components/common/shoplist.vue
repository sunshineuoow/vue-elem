<template>
	<div class="shoplist_container">
		<ul v-load-more="loaderMore" v-if="shopListArr.length" type="1">
			<li v-for="item in shopListArr" :key="item.id" class="shop_li">
				<section>
					<img :src="imgBaseUrl + item.image_path" class="shop_img"></img>
				</section>
				<hgroup class="shop_right">
					<header class="shop_detail_header">
						<h4 :class="item.is_premium?'premium':''" class="shop_title ellipsis">
							{{item.name}}
						</h4>
						<ul class="shop_detail_ul">
							<li v-for="item in item.supports" :key="item.id" class="supports">
								{{item.icon_name}}
							</li>
						</ul>
					</header>
					<h5 class="rating_order_num">
						<section class="rating_order_num_left">
							<section class="rating_section">
								<rating-star :rating='item.rating'></rating-star>
								<span class="rating_num">
									{{item.rating}}
								</span>
							</section>
							<section class="order_section">
								月售{{item.recent_order_num}}
							</section>
						</section>
						<section class="rating_order_num_right">
							<span class="delivery_style delivery_left" v-if="item.delivery_mode">
								{{item.delivery_mode.text}}
							</span>
							<span class="delivery_style delivery_right" v-if="onTime(item.supports)">准时达</span>
						</section>
					</h5>
					<h5 class="fee_distance">
						<p class="fee">
							&yen;{{item.float_minimum_order_amount}}起送
							<span class="segmentation">/</span>
							{{item.piecewise_agent_fee.tips}}
						</p>
						<p class="distance_time">
							<span v-if="Number(item.distance)">
								{{item.distance > 1000 ? (item.distance/1000).toFixed(2) + 'km' : item.distance + 'm'}}
									<span class="segmentation">/</span>
							</span>
							<span v-else>
								{{item.distance}}
							</span>
							<span class="segmentation">/</span>
							<span class="order_time">
								{{item.order_lead_time}}
							</span>
						</p>
					</h5>
				</hgroup>
			</li>
		</ul>
		<ul class="animation_opacity" v-else>
			<li class="list_back_li" v-for="item in 10" :key="item">
				<img src="../../images/shopback.svg" class="list_back_svg">
			</li>
		</ul>
		<p v-if="touchend" class="empty_data">没有更多了</p>
		<aside class="return_top" @click="backTop" v-if="showBackStatus">
			<svg class="back_to_top">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
			</svg>
		</aside>
		<transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import { shopList } from '../../service/getData'
	import { imgBaseUrl } from '../../config/env'
	import { showBack, animate } from '../../config/mUtils'
	import { loadMore, getImgPath } from './mixin'
	import loading from './loading'
	import ratingStar from './ratingStar'
	
	export default {
		data() {
			return {
				offset: 0,
				shopListArr: [],
				preventRepeatRequest: false,
				showBackStatus: false,
				showLoading: true,
				touchend: false,
				imgBaseUrl
			}
		},
		mounted() {
			this.initData();
		},
		components: {
			loading,
			ratingStar
		},
		props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
		mixins: [loadMore, getImgPath],
		computed: {
			...mapState([
				'latitude','longitude'
			])
		},
		methods: {
			async initData() {
				//获取数据
				let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
				this.shopListArr = [...res];
				this.hideLoading();
				showBack(status => {
					this.showBackStatus = status;
				})
			},
			async loaderMore() {
				if (this.touchend) return;
				if (this.preventRepeatRequest) return;
				this.showLoading = true;
				this.preventRepeatRequest = true;
				this.offset += 20;
				let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
				this.hideLoading();
				this.shopListArr = [...this.shopListArr, ...res];
				if (res.length < 20) {
					this.touchend = true;
					return;
				}
				this.preventRepeatRequest = false;
			},
			async listenPropsChange() {
			    this.showLoading = true;
			    this.offset = 0;
			    let res = await shopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportsId);
			    this.shopListArr = [...res];

			},
			backTop() {
				animate(document.body, {scrollTop: '0'}, 400, 'ease-out');
			},
			hideLoading() {
				this.showLoading = false;
			},
			onTime(supports){
			    let onTimeStatus;
			    if ((supports instanceof Array) && supports.length){
			        supports.forEach(item => {
			            if (item.icon_name === "准"){
			                onTimeStatus = true;
						}
					})
				} else {
			        onTimeStatus = false;
				}
				return onTimeStatus;
			}
		},
		watch: {
			restaurantCategoryIds: function(value) {
			    this.listenPropsChange();
			},
			sortByType: function(value) {
			    this.listenPropsChange();
			},
			confirmSelect: function(value) {
			    this.listenPropsChange();
			    this.$emit('DidConfirm');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.shoplist_container{
		margin-bottom: 2rem;
		background-color: #FFF;
	}
	.shop_li{
		display: flex;
		padding: 0.7rem 0.4rem;
		border-bottom: 0.025rem solid #f1f1f1;
	}
	.shop_img{
		display: block;
		margin-right: 0.4rem;
		@include wh(2.7rem, 2.7rem);
	}
	.shop_right{
		flex: auto;
		.shop_detail_header{
			@include fj;
			align-items: center;
			.shop_title{
				width: 8.5rem;
				padding-top: .01rem;
				color: #333;
				@include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
				font-weight: 700;
			}
			.premium::before{
				content: "品牌";
				display: inline-block;
				padding: 0 0.1rem;
				margin-right: 0.2rem;
				line-height: .6rem;
				border-radius: 0.1rem;
				background-color: #ffd930;
				color: #333;
				font-size: 0.5rem;
			}
			.shop_detail_ul{
				display: flex;
				transform: scale(.8);
				margin-right: -0.3rem;
				.supports{
					@include sc(0.5rem, #999);
					margin-left: 0.05rem;
					padding: 0 0.04rem;
					border: 0.025rem solid #f1f1f1;
					border-radius: 0.08rem;
				}
			}
		}
		.rating_order_num{
			@include fj(space-between);
			height: 0.6rem;
			margin-top: 0.52rem;
			.rating_order_num_left{
				@include fj(flex-start);
				.rating_section{
					display: flex;
					.rating_num{
						@include sc(0.4rem, #ff6000);
						margin: 0 0.2rem;
					}
				}
				.order_section{
					transform: scale(.8);
					margin-left: -0.2rem;
					@include sc(0.4rem, #666);
				}
			}
			.rating_order_num_right{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				transform: scale(.7);
				min-width: 5rem;
				margin-right: -0.8rem;
				.delivery_style{
					margin-left: 0.08rem;
					padding: 0.04rem 0.08rem 0;
					font-size: 0.4rem;
					border: 1px;
				}
				.delivery_left{
					border: 0.025rem solid $blue;
					background-color: $blue;
					color: #fff;
				}
				.delivery_right{
					border: 0.025rem solid $blue;
					color: $blue;
				}
			}
		}
		.fee_distance{
			margin-top: 0.52rem;
			@include fj;
			@include sc(0.5rem, #333);
			.fee{
				transform: scale(.9);
				@include sc(0.5rem, #666);
			}
			.distance_time{
				transform: scale(.9);
				span{
					color: #999;
				}
				.order_time{
					color: $blue;
				}
				.segmentation{
					color: #ccc;
				}
			}	
		}
	}
	.empty_data{
		@include sc(0.5rem, #666);
		text-align: center;
		line-height: 2rem;
	}
	.return_top{
		position: fixed;
		bottom: 3rem;
		right: 1rem;
		.back_to_top{
			@include wh(2rem, 2rem);
		}
	}
	.loading-enter-active, .loading-leave-active{
		transition: opacity 1s;
	}
	.loading-enter, .loading-leave-active{
		opacity: 0;
	}

</style>
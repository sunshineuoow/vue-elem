<template>
	<div>
		<head-top signin-up="msite">
			<router-link :to="'/search/' + geohash" class="link_search" slot="search">
				<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
					<circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none" />	
					<line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2" />
				</svg>	
			</router-link>
			<router-link to="/home" slot="msite-title" class="msite_title">
				<span class="title_text ellipsis">{{msiteTitle}}</span>
			</router-link>
		</head-top>
		<nav class="msite_nav">
			<swiper :options="swiperOption" v-if="foodTypes.length">
				<swiper-slide class="food_types_container" v-for="(item, index) in foodTypes" :key="index">
					<a v-for="foodItem in item" class="link_to_food">
						<figure>
							<img :src="imgBaseUrl + foodItem.image_url">
							<figcaption>
									{{ foodItem.title }}
							</figcaption>
						</figure>
					</a>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
			<img src="../../images/fl.svg" class="fl_back animation_opacity" v-else>
		</nav>
		<div class="shop_list_container">
			<header class="shop_header">
				<svg class="shop_icon">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>	
				</svg>
				<span class="shop_header_title">
					附近商家
				</span>
				<shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
			</header>
		</div>
		<foot-guide></foot-guide>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'
	import headTop from '../../components/header/head'
	import shopList from '../../components/common/shoplist'
	import footGuide from '../../components/footer/footGuide'
	import { msiteAddress, msiteFoodTypes, cityGuess } from '../../service/getData'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'

	export default {
		data () {
			return {
				geohash: '',
				msiteTitle: '请选择地址...',
				foodTypes: [],
				hasGetData: false,
				imgBaseUrl: 'https://fuss10.elemecdn.com',
				swiperOption: {
          			setWrapperSize :true,
          			pagination : '.swiper-pagination',
          			paginationClickable :true,
          			observeParents:true,
        		},
			}
		},
		async beforeMount (){
			if(!this.$route.query.geohash) {
				const address = await cityGuess();
				this.geohash = address.latitude + ',' + address.longitude;
			} else {
				this.geohash = this.$route.query.geohash
			}
			//保存geohash到vuex
			this.SAVE_GEOHASH(this.geohash);
			//获取位置信息
			let res = await msiteAddress(this.geohash);
			this.msiteTitle = res.name;
			//记录经纬度
			this.RECORD_ADDRESS(res);
			this.hasGetData = true;
		},
		mounted() {
			//获取导航实物类型列表
			msiteFoodTypes(this.geohash).then(res => {
				let resLength = res.length;
				let resArr = [...res];
				let foodArr = [];
				for(let i = 0, j = 0; i < resLength; i += 8, j++){
					foodArr[j] = resArr.splice(0, 8);
				}
				this.foodTypes = foodArr;
			})
		},
		components: {
			headTop,
			shopList,
			footGuide,
			swiper,
			swiperSlide
		},
		methods: {
			...mapMutations([
				'RECORD_ADDRESS', 'SAVE_GEOHASH'
			]),
			getCategoryId(url){
				let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
	.link_search{
		left: .8rem;
		@include wh(.9rem, .9rem);
		@include ct;
	}
	.msite_title{
		@include center;
		width: 50%;
		margin-left: 0.5rem;
		text-align: center;
		color: #fff;
		.title_text{
			@include sc(0.8rem, #fff);
			display: block;
			text-align: center;
		}
	}
	.msite_nav{
		height: 10.6rem;
		padding-top: 2.1rem;
		border-bottom: 0.025rem solid $bc;
		background-color: #fff;
		.swiper-container{
			@include wh(100%, auto);
			padding-bottom: 0.6rem;
			.swiper-pagination{
				bottom: 0.2rem;
			}
		}
		.fl_back{
			@include wh(100%, 100%);
		}
	}
	.food_types_container{
		display: flex;
		flex-wrap: wrap;
		.link_to_food{
			width: 25%;
			padding: 0.3rem 0rem;
			@include fj(center);
			figure{
				img{
					margin-bottom: 0.3rem;
					@include wh(1.8rem, 1.8rem);
				}
				figcaption{
					text-align: center;
					@include sc(0.55rem, #666);
				}
			}
		}
	}
	.shop_list_container{
		margin-top: .4rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}
</style>
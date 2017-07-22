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
				<span class="title_text ellipsis">{{msietTitle}}</span>
			</router-link>
		</head-top>
		<nav class="msite_nav">
			<swiper :options="swiperOptions" v-if="foodTypes.length">
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
				<div class="swiper-pagination"></div>
			</swiper>
			<img src="../../images/fl.svg" class="fl_back animation_opacity">
		</nav>
		<div class="shop_list_container">
			<header class="shop_header">
				<svg class="shop_icon">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>	
				</svg>
				<span class="shop_header_title">
					附近商家
				</span>
			</header>

		</div>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import shopList from '../../components/common/shoplist'
	import { swiper, swiperSlide} from 'vue-awesome-swiper'

	export default {
		data () {
			return {
				geohash: '',
				msietTitle: '请选择地址...',
				foodTypes: [],
				swiperOptions: {
					notNextTick: true,
          			autoplay: 3000,
          			direction : 'vertical',
          			grabCursor : true,
          			setWrapperSize :true,
          			autoHeight: true,
          			pagination : '.swiper-pagination',
          			paginationClickable :true,
          			prevButton:'.swiper-button-prev',
          			nextButton:'.swiper-button-next',
          			scrollbar:'.swiper-scrollbar',
          			mousewheelControl : true,
          			observeParents:true,
          			debugger: true,
          			onTransitionStart(swiper){
          			  console.log(swiper)
          			},	
				}
			}
		},
		async beforeMount (){
			if(!this.$route.query.geohash) {

			}
		},
		components: {
			headTop,
			shopList,
			swiper,
			swiperSlide
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	
</style>
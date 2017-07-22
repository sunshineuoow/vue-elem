<template>
	<div>
		<head-top signin-up="home">
			<span slot="logo" class="head_logo" @click="reload">ele.me</span>
		</head-top>
		<nav class="city_nav">
			<div class="city_tip">
				<span>当前定位城市：</span>
				<span>定位不准时，请在城市列表中选择</span>
			</div>
			<a class="guess_city">
				<span>{{ guessCity }}</span>
				<svg class="arrow_right">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
				</svg>
			</a>
		</nav>
		<section id="hot_city_container">
			<h4 class="city_title">热门城市</h4>
			<ul class="citylist clear">
				<router-link tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">
                    {{ item.name }}
                </router-link>
			</ul>
		</section>
		<section class="group_city_container">
			<ul class="letter_classify">
				<li v-for="(value, key, index) in sortgroupcity" :key="key" class="letter_classify_li">
					<h4 class="city_title">
						{{ key }}
						<span v-if="index == 0">（按字母排序）</span>
					</h4>
					<ul class="groupcity_name_container citylist clear">
						<router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
                            {{ item.name }}
                        </router-link>
					</ul>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import {cityGuess, hotcity, groupcity} from '../../service/getData'
	export default {
		data () {
			return {
				guessCity: '',
				guessCityid: '',
				hotcity: [],
				groupcity: {},
			}
		},
		mounted() {
			// 获取当前城市
			cityGuess().then(res => {
				this.guessCity = res.name;
				this.guessCityid = res.id;
			})

			// 获取热门城市
			hotcity().then(res => {
				this.hotcity = res;
			})

			// 获取所有城市
			groupcity().then(res => {
				this.groupcity = res;
			})
		},
		components: {
			headTop
		},
		computed: {
			// 排序得到的城市列表
			sortgroupcity() {
				let sortobj = {};
				for(let i = 65; i <= 90; i++) {
					if(this.groupcity[String.fromCharCode(i)]) {
						sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
					}
				}
				return sortobj;
			}
		},
		methods: {
			reload() {
				window.location.reload();
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';

	.head_logo{
        left: 0.4rem;
        font-weight: 400;
        @include sc(0.7rem, #fff);
        @include wh(2.3rem, 0.7rem);
        @include ct;
	}
	.city_nav{
		padding-top: 2.35rem;
		border-top: 1px solid $bc;
		margin-bottom: 0.4rem;
		background-color: #fff;
		.city_tip{
			@include fj;
			padding: 0 0.45rem;
			line-height: 1.45rem;
			span:nth-of-type(1){
				@include sc(0.55rem, #666);
			}
			span:nth-of-type(2){
				font-weight: 900;
				@include sc(0.475rem, #9f9f9f);
			}
		}
		.guess_city{
			@include fj;
			align-items: center;
			height: 1.8rem;
			padding: 0 0.45rem;
			border-top: 1px solid $bc;
			border-bottom: 2px solid $bc;
			@include font(0.75rem, 1.8rem);
			span:nth-of-type(1){
				color: $blue;
			}
			.arrow_right{
				@include wh(.6rem, .6rem);
                fill: #999;
			}
		}
	}
    #hot_city_container{
        margin-bottom: 0.4rem;
        background-color: #fff;
    }
    .citylist{
        li{
            float: left;
            border-bottom: 0.025rem solid $bc;
            border-right: 0.025rem solid $bc;
            text-align: center;
            color: $blue;
            @include wh(25%, 1.75rem);
            @include font(0.6rem, 1.75rem);
        }
        li:nth-of-type(4n){
            border-right: none;
        }
    }
    .city_title{
        border-top: 2px solid $bc;
        border-bottom: 1px solid $bc;
        font-weight: 400;
        text-indent: 0.45rem;
        color: #666;
        @include font(0.55rem, 1.45rem, "Helvetica Neue");
        span{
            @include sc(0.475rem, #999);
        }
    }

    .letter_classify_li{
        border-bottom: 1px solid $bc;
        margin-bottom: 0.4rem;
        background-color: #fff;
        .groupcity_name_container{
            li{
                color: #666;
            }
        }
    }
</style>
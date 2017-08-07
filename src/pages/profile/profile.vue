<template>
	<div class="profile_page">
		<head-top go-back="true" :head-title="profileTitle"></head-top>
		<section>
			<section class="profile_number">
				<router-link :to="userInfo && userInfo.user_id ? '/profile/info' : '/login'" class="profile-link">
					<img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo && userInfo.user_id">
					<span class="privateImage" v-else>
						<svg class="privateImage-svg">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
						</svg>
					</span>
					<div class="user-info">
						<p>{{username}}</p>
						<p>
							<span class="user-icon">
								<svg class="icon-mobile" fill="#fff">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
								</svg>
							</span>
							<span class="icon-mobile-number">{{mobile}}</span>
						</p>
					</div>
					<span class="arrow">
						<svg class="arrow-svg" fill="#fff">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
						</svg>
					</span>
				</router-link>
			</section>
			<section class="info_data">
				<ul class="clear">
					<router-link to="/balance" tag="li" class="info-data-link">
						<span class="info-data-top">
							<b>{{parseInt(balance).toFixed(2)}}</b>元
						</span>
						<span class="info-data-bottom">我的余额</span>
					</router-link>
					<router-link to="/benefit" tag="li" class="info-data-link">
						<span class="info-data-top">
							<b>{{count}}</b>个
						</span>
						<span class="info-data-bottom">我的优惠</span>
					</router-link>
					<router-link to="/points" tag="li" class="info-data-link">
						<span class="info-data-top">
							<b>{{pointNumber}}</b>分
						</span>
						<span class="info-data-bottom">我的积分</span>
					</router-link>
				</ul>
			</section>
			<section class="profile-1reTe">
				<router-link to="/order" class="myorder">
					<aside>
						<svg fill="#4aa5f0">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
						</svg>
					</aside>
					<div class="myorder-div">
						<span>我的订单</span>
						<span class="myorder-divsvg">
							<svg fill="#bbb">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
							</svg>
						</span>
					</div>
				</router-link>
				<a href="https://home.m.duiba.com.cn/#/chome/index" class="myorder">
					<aside>
	                    <svg fill="#fc7b53">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
                        </svg>
					</aside>
					<div class="myorder-div">
						<span>积分商城</span>
						<span class="myorder-divsvg">
							<svg fill="#bbb">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
							</svg>
						</span>
					</div>
				</a>
				<router-link to="/vipcard" class="myorder">
					<aside>
						<svg fill="#ffc630">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
						</svg>
					</aside>
					<div class="myorder-div">
						<span>饿了么会员卡</span>
						<span class="myorder-divsvg">
							<svg fill="#bbb">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
							</svg>
						</span>
					</div>
				</router-link>
			</section>
			<section class="profile-1reTe">
				<router-link to="/service" class="myorder">
					<aside>
						<svg fill="#4aa5f0">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
						</svg>
					</aside>
					<div class="myorder-div">
						<span>服务中心</span>
						<span class="myorder-divsvg">
							<svg fill="#bbb">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
							</svg>
						</span>
					</div>
				</router-link>
				<router-link to="/download" class="myorder">
					<aside>
						<svg fill="#3cabff">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
						</svg>
					</aside>
					<div class="myorder-div">
						<span>下载饿了么APP</span>
						<span class="myorder-divsvg" :style="{borderBottom: 0}">
							<svg fill="#bbb">
								<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
							</svg>
						</span>
					</div>
				</router-link>
			</section>
		</section>
		<footGuide></footGuide>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import headTop from '../../components/header/head'
	import footGuide from '../../components/footer/footGuide'
	import { imgBaseUrl } from '../../config/env'
	import { getImgPath } from '../../components/common/mixin'
 
	export default {
		data() {
			return {
				profileTitle: '我的',
				username: '登录/注册',
				resetname: '',
				mobile: '暂无绑定手机号',
				balance: 0,
				count: 0,
				pointNumber: 0,
				avatar: '',
				imgBaseUrl,
			}
		},
		mounted() {
			this.initData();
		},
		computed: {
			...mapState([
				'userInfo',
			])
		},
		components: {
			headTop,
			footGuide
		},
		methods: {
			initData() {
				if (this.userInfo && this.userInfo.user_id) {
					this.avatar = this.userInfo.avatar;
					this.username = this.userInfo.username;
					this.mobile = this.userInfo.mobile || '暂无绑定手机号';
					this.balance = this.userInfo.balance;
					this.count = this.userInfo.gift_amount;
				 	this.pointNumber = this.userInfo.point;
				} else {
				this.username = "登录/注册";
				this.mobile = "暂无绑定手机号";
				}
			}
		},
		watch: {
			userInfo: function(value) {
				this.initData()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';

	.profile_page{
		p, span{
			font-family: Helvetica Neue,Tahoma,Arial;
		}
	}
	.profile_number{
		padding-top: 1.95rem;
		.profile-link{
			display: flex;
			align-items: center;
			box-align: center;
			-webkit-box-align: center;
			-ms-box-align: center;
			padding: .666667rem .6rem;
			background-color: $blue;
			.privateImage{
				display: inline-block;
				@include wh(2.5rem, 2.5rem);
				border-radius: 50%;
				vertical-align: middle;
			}
			.user-info{
				flex-grow: 1;
				-webkit-box-flex: 1;
				-ms-flex-positive: 1;
				margin-left: .48rem;
				p{
					@include sc(.8rem, #fff);
					font-weight: 700;
					.user-icon{
						display: inline-block;
						@include wh(.5rem, .75rem);
						line-height: .75rem;
						vertical-align: middle;
						.icon-mobile{
							@include wh(100%, 100%);
						}
					}
					.icon-mobile-number{
						display: inline-block;
						@include sc(.57333rem, #fff);
					}
				}
			}
			.arrow{
				display: inline-block;
				@include wh(.46667rem, .98rem);
				svg{
					@include wh(100%, 100%);
				}
			}
		}
	}

	.info_data{
		width: 100%;
		background-color: #fff;
		box-sizing: border-box;
		ul{
			.info-data-link{
				display: inline-block;
				float: left;
				width: 33.3%;
				border-right: 1px solid #f1f1f1;
				span{
					display: block;
					width: 100%;
					text-align: center;
				}
				.info-data-top{
					padding: .853333rem 0 .453333rem;
					@include sc(.55rem, #333);
					b{
						display: inline-block;
						line-height: 1rem;
						@include sc(1.2rem, #f90);
						font-weight: 700;
						font-family: Helvetica Neue,Tahoma;
					}
				}
				.info-data-bottom{
					padding-bottom: .453333rem;
					@include sc(.573333rem, #666);
					font-weight: 400;
				}
			}
			.info-data-link:nth-of-type(2){
				.info-data-top{
					b{
						color: #ff5f3e;
					}
				}
			}
			.info-data-link:nth-of-type(3){
				border: none;
				.info-data-top{
					b{
						color: #6ac20b;
					}
				}
			}
		}
	}

	.profile-1reTe{
		margin-top: .4rem;
		background-color: #fff;
		.myorder{
			display: flex;
			align-items: center;
			padding-left: 1.6rem;
			aside{
				display: flex;
				align-items: center;
				@include wh(.7rem, .7rem);
				margin-left: -.866667rem;
				margin-right: .266667rem;
				svg{
					@include wh(100%, 100%);
				}
			}
			.myorder-div{
				@include fj;
				width: 100%;
				padding: .433333rem .266667rem .433333rem 0;
				@include sc(.7rem, #333);
				span{
					display: block;
				}
				.myorder-divsvg{
					@include wh(.46667rem, .46667rem);
					svg{
						@include wh(100%, 100%);
					}
				}
			}
		}
	}
</style>
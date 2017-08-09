<template>
	<div class="page">
		<head-top head-title="账户信息" go-back="true"></head-top>
		<section class="profile-info">
			<section class="headportrait">
				<input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
				<h2>头像</h2>
				<div class="headportrait-div">
					<img v-if="userInfo" :src="imgBaseUrl + userInfo.avatar" class="headportrait-div-top">
					<span class="headportrait-div-top" v-else>
						<svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
					</span>
					<span class="headportrait-div-bottom">
						<svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
					</span>
				</div>
			</section>
			<router-link to="/profile/setusername" class="info-router">
				<section class="headportrait headportraitwo">
					<h2>用户名</h2>
					<div class="headportrait-div">
						<p>{{username}}</p>
						<span class="headportrait-div-bottom">
						<svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
					</span>
					</div>
				</section>
			</router-link>
			<router-link to="/profile/info/address" class="info-router">
				<section class="headportrait headportraitwo headportraithree">
					<h2>收货地址</h2>
					<div class="headportrait-div">
						<span class="headportrait-div-bottom">
						<svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                        </span>
					</div>
				</section>
			</router-link>
			<section class="bind-phone">账号绑定</section>
			<section class="info-router" @click="changePhone">
				<section class="headportrait headportraitwo headportraithree">
					<h2>
						<img src="../../../images/bindphone.png" style="display:inline-block;margin-right:.4rem;" alt="">
						手机
					</h2>
					<div class="headportrait-div">
						<p>{{infotel}}</p>
						<span class="headportrait-div-bottom">
						<svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                        </span>
					</div>
				</section>
			</section>
			<section class="bind-phone">安全设置</section>
			<router-link to="/forget" class="info-router">
				<section class="headportrait headportraitwo headportraithree">
                    <h2>登录密码</h2>
                    <div class="headportrait-div">
                        <p>修改</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
			</router-link>
			<section class="exitlogin" @click="exitlogin">退出登录</section>
		</section>
		<section class="coverpart" v-if="show">
			<section class="cover-background"></section>
			<section class="cover-content" :class="{'cover-animate' : isEnter, 'cover-animate-leave' : isLeave}">
				<div class="sa-icon">
					<span class="sa-body"></span>
					<span class="sa-dot"></span>
				</div>
				<h2>是否退出登录</h2>
				<div class="sa-button">
					<button class="waiting" @click="waitingThing">再等等</button>
					<div style="display:inline-block;">
						<button class="quitlogin" @click="outLogin">退出登录</button>
					</div>
				</div>
			</section>
		</section>
		<alert-tip v-if="showAlert" @closeTip="showAlert = false" :alert-text="alertText"></alert-tip>
		<transition name="router-slide" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import headTop from '../../../components/header/head'
	import alertTip from '../../../components/common/alertTip'
	import { getImgPath } from '../../../components/common/mixin'
	import { imgBaseUrl } from '../../../config/env'
	import { signout } from '../../../service/getData'
	import { removeStore } from '../../../config/mUtils'

	export default {
		data() {
			return {
				username: '',
				resetname: '',
				infotel: '',
				avatar: '',
				show: false,
				isEnter: true,
				isLeave: false,
				showAlert: false,
				alertText: null,
				imgBaseUrl,
			}
		},
		beforeDestroy() {
			clearTimeout(this.timer);
		},
		computed: {
			...mapState([
				'userInfo', 'imgPath'
			])
		},
		components: {
			headTop,
			alertTip
		},
		mixins: [getImgPath],
		methods: {
			...mapMutations([
				'OUT_LOGIN', 'SAVE_AVATAR'
			]),
			async uploadAvatar() {
				if (this.userInfo) {
					let input = document.querySelector('.profileinfopanel-upload');
					let data = new FormData();
					data.append('file', input.files[0]);
					try{
						let response = await fetch('/eus/v1/users/' + this.userInfo.user_id + '/avatar', {
							method: 'POST',
							credentials: 'include',
							body: data
						});
						let res = await response.json();
						if (res.status == 1){
							this.userInfo.avatar = res.image_path;
						}
					} catch(error) {
						this.showAlert = true;
						this.alertText = "上传失败";
						throw new Error(error);
					}
				}
			},
			changePhone () {
				this.showAlert = true;
				this.alertText = "请在手机APP中设置";
			},
			exitlogin() {
				this.show = true;
				this.isEnter = true;
				this.isLeave = false;
			},
			waitingThing() {
				clearTimeout(this.timer);
				this.isEnter = false;
				this.isLeave = true;
				this.timer = setTimeout(() => {
					clearTimeout(this.timer);
					this.show = false;
				}, 200);
			},
			async outLogin() {
				this.OUT_LOGIN();
				this.waitingThing();
				this.$router.go(-1);
				removeStore('user_id');
				await signout();
			}
		},
		watch: {
			userInfo: function(value) {
				if (value && value.uesr_id) {
					this.username = value.username;
					this.infotel = value.mobile;
					this.avatar = value.avatar;
				}
			}
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
.profile-info{
	@include wh(100%, 3.1rem);
	.headportrait{
		@include fj;
		align-items: center;
		margin-top: .4rem;
		padding: .5rem .4rem;
		border-top: 1px solid #ddd;
		background-color: #fff;
		h2{
			display: flex;
			align-items: center;
			@include sc(.6rem, #333);
			font-weight: 500;
		}
		.headportrait-div{
			span{
				display: inline-block;
				svg{
					@include wh(100%, 100%);
				}
			}
			.headportrait-div-top{
				@include wh(2rem, 2rem);
				vertical-align: middle;
				border-radius: 50%;
			}
			.headportrait-div-bottom{
				position: relative;
				top: .44rem;
				@include wh(.66667rem, 1.4rem);
			}
		}
	}
	.profileinfopanel-upload{
		display: block;
		position: absolute;
		top: 2.35rem;
		left: 0;
		@include wh(100%, 3.1rem);
		opacity: 0;
	}
	.headportraitwo{
		margin-top: 0;
		padding: .3rem .4rem;
		.headportrait-div{
			@include fj(left);
			p{
				line-height: 1.39rem;
				margin-right: .2rem;
				@include sc(.7rem, #999);
				font-weight: 100;
				text-align: left;
				font-family: Arial;
			}
			.headportrait-div-bottom{
				top: 0;
			}
		}
	}
	.headportraithree{
		border-bottom: 1px solid #ddd;
	}
	.bind-phone{
		padding: .4rem;
		@include sc(.5rem, #666);
	}
	.exitlogin{
		width: 96%;
		line-height: 1.5rem;
		margin: 1.3rem auto 0;
		@include sc(.6rem, #fff);
		border-radius: 5px;
		text-align: center;
		background-color: #d8584a;
	}
}
.info-router{
	display: block;
}
.coverpart{
	@include allcover;
	@include wh(100%, 100%);
	.cover-background{
		@include wh(100%, 100%);
		@include allcover;
		z-index: 100;
		background-color: #000;
		opacity: .2;
	}
	.cover-content{
		position: absolute;
		top: 20%;
		left: 3%;
		width: 94%;
		padding: 17px;
		border-radius: 5px;
		background-color: #fff;
		z-index: 1000;
		.sa-icon{
			position: relative;
			@include wh(90px, 90px);
			margin: 20px auto;
			border: 4px solid #f8bb86;
			border-radius: 50%;
			.sa-body{
				@include cl;
				@include wh(5px, 47px);
				top: 10px;
				border-radius: 2px;
				background-color: #f8bb86;
			}
			.sa-dot{
				@include cl;
				@include wh(7px, 7px);
				bottom: 10px;
				border-radius: 50%;
				background-color: #f8bb86;
			}
		}
		h2{
			width: 100%;
			margin: 25px 0;
			@include sc(30px, #575757);
			font-weight: 500;
			text-align: center;
		}
		.sa-button{
			width: 100%;
			text-align: center;
			button{
				display: inline-block;
				margin-top: 26px;
				padding: .4rem 1rem;
				border-radius: 5px;
				@include sc(.6rem, #fff);
				letter-spacing: 1px;
			}
			.waiting{
				margin-right: .4rem;
				background-color: #c1c1c1;
			}
			.quitlogin{
				background-color: #dd6b55;
			}
		}
	}
}

@-webkit-keyframes bounceIn {
  from, 20%, 40%, 60%, 80%, 100% {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounceIn {
  	from, 20%, 40%, 60%, 80%, 100% {
    	-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    	animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  	}

  	0% {
  	  	opacity: 0;
  	  	-webkit-transform: scale3d(.3, .3, .3);
  	  	transform: scale3d(.3, .3, .3);
  	}
	
  	20% {
  	  	-webkit-transform: scale3d(1.1, 1.1, 1.1);
  	  	transform: scale3d(1.1, 1.1, 1.1);
  	}
	
  	40% {
  	  	-webkit-transform: scale3d(.9, .9, .9);
  	  	transform: scale3d(.9, .9, .9);
  	}
	
  	60% {
  	  	opacity: 1;
  	  	-webkit-transform: scale3d(1.03, 1.03, 1.03);
  	  	transform: scale3d(1.03, 1.03, 1.03);
  	}
	
  	80% {
  	  	-webkit-transform: scale3d(.97, .97, .97);
  	  	transform: scale3d(.97, .97, .97);
  	}
	
  	100% {
  	  	opacity: 1;
  	  	-webkit-transform: scale3d(1, 1, 1);
  	  	transform: scale3d(1, 1, 1);
  	}
}

@-webkit-keyframes zoomOut {
    from {
      	opacity: 1;
    }
  
    50% {
      	opacity: 0;
      	-webkit-transform: scale3d(.3, .3, .3);
      	transform: scale3d(.3, .3, .3);
    }
  
    100% {
      	opacity: 0;
    }
}

@keyframes zoomOut {
    from {
      	opacity: 1;
    }
  
    50% {
      	opacity: 0;
      	-webkit-transform: scale3d(.3, .3, .3);
      	transform: scale3d(.3, .3, .3);
    }
  
    100% {
      	opacity: 0;
    }
}

body .coverpart .cover-animate{
	transition: all 1s;
	animation: bounceIn .6s;
}
body .coverpart .cover-animate-leave{
    animation:zoomOut .4s;
}

.router-slide-enter-active, .router-slide-leave-active{
	transition: all .4s;
}
.router-slide-enter, .router-slide-leave-active{
	transform: translate3d(2rem, 0, 0);
	opacity: 0;
}
</style>
<template>
	<div class="login_container">
		<head-top :head-title="loginWay ? '登录' : '密码登录'" goBack="true">
			<div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay ? "密码登录" : "短信登录"}}</div>
		</head-top>	
		<form class="login_form" v-if="loginWay">
			<section class="input_container phone_number">
				<input type="text" placeholder="账号密码随便输入" name="phone" maxlength="11" v-model="phoneNumber">
				<button :class="{right_phone_number:rightPhoneNumber}" @click.prevent="getVerifyCode" v-show="!computedTime">获取验证码</button>
				<button v-show="computedTime">已发送({{computedTime}}s)</button>
			</section>
			<section class="input_container">
				<input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
			</section>
		</form>
		<form class="login_form" v-else>
			<section class="input_container">
				<input type="text" placeholder="账号" v-model.lazy="userAccount">
			</section>
			<section class="input_container">
				<input v-if="!showPassword" type="password" placeholder="密码" v-model="password">
				<input type="text" placeholder="密码" v-model="password" v-else>
				<div class="button_switch" :class="{change_to_text: showPassword}">
					<div class="circle_button" :class="{trans_to_right: showPassword}" @click="changePasswordType"></div>
					<span v-show="showPassword">abc</span>
					<span v-show="!showPassword">...</span>
				</div>
			</section>
			<section class="input_container captcha_code_container">
				<input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
				<div class="img_change_img">
					<img :src="captchaCodeImg">
					<div class="change_img">
						<p>看不清</p>
						<p>换一张</p>
					</div>
				</div>
			</section>
		</form>
		<p class="login_tips">	
        	温馨提示：未注册过的账号，登录时将自动注册
		</p>
		<p class="login_tips">
			注册过的用户可凭账号密码登录
		</p>
		<div class="login_button_container" @click="mobileLogin">登录</div>
		<router-link to="/forget" class="to_forget" v-if="!loginWay">忘记密码?</router-link>
		<alert-tip v-if="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import headTop from '../../components/header/head'
	import alertTip from '../../components/common/alertTip'
	import { imgBaseUrl } from '../../config/env'
	import { mobileCode, checkExsis, getcaptchas, accountLogin } from '../../service/getData'


	export default {
		data() {
			return {
				loginWay: false,
				showPassword: false,
				phoneNumber: null,
				mobileCode: null,
				validate_token: null,
				computedTime: 0,
				userInfo: null,
				userAccount: null,
				password: null,
				captchaCodeImg: null,
				codeNumber: null,
				showAlert: false,
				alertText: null,
			}
		},
		created() {
			this.getCaptchaCode();
		},
		components: {
			headTop,
			alertTip
		},
		computed: {
			rightPhoneNumber: function() {
				return /^1\d{10}$/gi.test(this.phoneNumber)
			}
		},
		methods: {
			...mapMutations([
				'RECORD_USERINFO'
			]),
			changeLoginWay() {
				this.loginWay = !this.loginWay;
			},
			changePasswordType() {
				this.showPassword = !this.showPassword;
			},
			async getCaptchaCode() {
				let res = await getcaptchas();
				this.captchaCodeImg = res.code;
			},
			async getVerifyCode() {
				if (this.rightPhoneNumber) {
					this.computedTime = 60;
					this.timer = setInterval(() => {
						this.computedTime--;
						if (this.computedTime == 0) {
							clearInterval(this.timer)
						}
					}, 1000)
				}
				let exsis = await checkExsis(this.phoneNumber, 'mobile');
				if (exsis.message) {
					this.showAlert = true;
					this.alertText = exsis.message;
					return;
				} else if (!exsis.is_exsis) {
					this.showAlert = true;
					this.alertText = '您输入的手机号尚未绑定';
					return;
				} 
				let res = await mobileCode(this.phoneNumber);
				if (res.message) {
					this.showAlert = true;
					this.alertText = res.message;
					return;
				}
				this.validate_token = res.validate_token;
			},
			async mobileLogin() {
				if (this.loginWay) {
					if (!this.rightPhoneNumber) {
						this.showAlert = true;
						this.alertText = '手机号码不正确';
						return 
					} else if (!(/^\d{6}$/gi.test(this.mobileCode))) {
						this.showAlert = true;
						this.alertText = '短信验证码不正确';
						return;
					}
					this.userInfo = await sendLogin(this.mobileCode, this.phoneNumber, this.validate_token);
				} else {
					if (!this.userAccount) {
						this.showAlert = true;
						this.alertText = '请输入手机号/邮箱/用户名';
						return
					} else if (!this.password) {
						this.showAlert = true;
						this.alertText = '请输入密码';
						return
					} else if (!this.codeNumber) {
						this.showAlert = true;
						this.alertText = '请输入验证码';
						return;
					}
					this.userInfo = await accountLogin(this.userAccount, this.password, this.codeNumber);
				}
				if (!this.userInfo.user_id) {
					this.showAlert = true;
					this.alertText = this.userInfo.message;
					if (!this.loginWay) this.getCaptchaCode();
				} else {
					this.RECORD_USERINFO(this.userInfo);
					this.$router.go(-1);
				}
			},
			closeTip() {
				this.showAlert = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';

	.login_container{
		padding-top: 1.95rem;
		p, span, input{
			font-family: Helvetica Neue,Tahoma,Arial;
		}
	}
	.change_login{
		@include ct;
		right: .75rem;
		@include sc(.7rem, #fff);
	}
	.login_form{
		margin-top: .6rem;
		background-color: #fff;
		.input_container{
			@include fj;
			padding: .6rem .8rem;
			border-bottom: 1px solid #f1f1f1;
			input{
				@include sc(.7rem, #666);
			}
			button{
				padding: .28rem .4rem;
				border: 1px;
				border-radius: 0.15rem;
				@include sc(.65rem, #fff);
				font-family: Helvetica Neue,Tahoma,Arial;
			}
			.right_phone_number{
				background-color: #4cd964;
			}
		}
		.phone_number{
			padding: .3rem .8rem;
		}
		.captcha_code_container{
			height: 2.2rem;
			.img_change_img{
				display: flex;
				align-items: center;
				img{
					@include wh(3.5rem, 1.5rem);
					margin-right: .2rem;
				}
				.change_img{
					@include fj(center);
					flex-wrap: wrap;
					flex-direction: column;
					width: 2rem;
					p{
						@include sc(.55rem, #666);
					}
					p:nth-of-type(2){
						margin-top: .2rem;
						color: $blue;
					}
				}
			}
		}
	}
	.button_switch{
		@include fj(center);
		position: relative;
		@include wh(2rem, .7rem);
		padding: 0 .2rem;
		border: 1px;
		border-radius: .5rem;
		background-color: #ccc;
		.circle_button{
			position: absolute;
			top: -0.2rem;
			left: -0.3rem;
			@include wh(1.2rem, 1.2rem);
			border-radius: 50%;
			background-color: #f1f1f1;
			box-shadow: 0 0.02667rem 0.05333rem rgba(0, 0, 0, .1);
			z-index: 1;
			transition: all .3s;
		}
		.trans_to_right{
			transform: translateX(1.3rem);
		}
		span{
			line-height: .6rem;
			@include sc(.45rem, #fff);
			transform: translate(-0.5rem, 0.05rem);
		}
		span:nth-of-type(2){
			transform: translate(0.5rem, -0.08rem);
		}
	}
	.change_to_text{
		background-color: #4cd964;
	}
	.login_tips{
		line-height: .5rem;
		padding: .4rem .6rem;
		@include sc(.5rem, red);
	}
	.login_button_container{
		margin: 0 .5rem 1rem;
		padding: .5rem 0;
		border: 1px;
		border-radius: 0.15rem;
		@include sc(.7rem, #fff);
		text-align: center;
		background-color: #4cd964;
	}
	.to_forget{
		float: right;
		margin-right: .3rem;
		@include sc(.6rem, $blue);
	}
</style>
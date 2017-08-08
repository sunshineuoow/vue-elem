<template>
	<div class="page">
		<head-top head-title="兑换红包" go-back="true"></head-top>
		<form class="exchange_code">
			<input type="text" placeholder="请输入兑换码" class="exchange_input" v-model="exchangeCode">
			<section class="input_container captcha_code_container">
				<input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
				<div class="img_change_img">
					<img :src="captchaCodeImg" v-show="captchaCodeImg">
					<div class="change_img" @click="getCaptchaCode">
						<p>看不清</p>
						<p>换一张</p>
					</div>
				</div>
			</section>
		</form>
		<div class="determine" :class="{active: status}" @click="exchange">兑换</div>
		<alert-tip v-if="showAlert" @closeTip="showAlert = false" :alert-text="alertText"></alert-tip>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import headTop from '../../../components/header/head'
	import alertTip from '../../../components/common/alertTip'
	import { getcaptchas, exChangeHongbao } from '../../../service/getData'


	export default {
		data() {
			return {
				showAlert: false,
				alertText: null,
				exchangeCode: null,
				codeNumber: '',
				captchaCodeImg: null,
			}
		},
		mounted() {
			this.getCaptchaCode();
		},
		components: {
			headTop,
			alertTip
		},
		computed: {
			...mapState([
				'userInfo'
			]),
			status: function() {
				let status = (/^\d+$/gi.test(this.exchangeCode)) && (/^\w{4}$/gi.test(this.codeNumber));
                return status;
			}
		},
		methods: {
			async getCaptchaCode() {
				let res = await getcaptchas();
				this.captchaCodeImg = res.code;
			},
			async exchange() {
				if (this.status) {
					let res = await exChangeHongbao(this.userInfo.user_id, this.exchangeCode, this.codeNumber);
					if (res.message) {
						this.getCaptchaCode();
						this.showAlert = true;
						this.alertText = res.message;
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/mixin';

	.page{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding-top: 1.95rem;
		z-index: 203;
		background-color: #f1f1f1;
		p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
	}

	.exchange_code{
		margin-top: .7rem;
		padding: 0 .5rem;
		.exchange_input{
			width: 100%;
			padding: .6rem .4rem;
			border-radius: .15rem;
			@include sc(.7rem, #666);
		}
	}

	.captcha_code_container{
		display: flex;
		height: 2.2rem;
		margin-top: .7rem;
		input{
			flex: 3;
			padding: .4rem;
			border-radius: .15rem;
			@include sc(.7rem, #666);
		}
		.img_change_img{
			display: flex;
			flex: 2;
			align-items: center;
			margin-left: .3rem;
			padding-left: .2rem;
			border-radius: .15rem;
			background-color: #fff;
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
	.determine{
		line-height: 1.8rem;
		margin: .7rem .7rem 0;
		border-radius: .2rem;
		@include sc(.7rem, #fff);
		text-align: center;
		background-color: #ccc;
	}
	.active{
		background-color: #4cd964;
	}
</style>
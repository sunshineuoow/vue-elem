<template>
	<div class="page_container">
		<head-top head-title="兑换会员" go-back="true"></head-top>
		<p class="buy_for">成功兑换后将关联到当前帐号： <span>{{userInfo.username}}</span></p>
		<form class="form_style">
			<input type="text" name="cartNumber" maxlength="10" placeholder="请输入10位卡号" v-model="cartNumber">
			<input type="text" name="password" maxlength="6" placeholder="请输入6位卡密" v-model="password">
		</form>
		<p class="determine" :class="{could_pay: couldPay}" @click="confirmPay">兑换</p>
		<footer class="binding">
			<h3>——温馨提示——</h3>
	        <p>新兑换的会员服务，权益以「会员说明」为准。</p>
	        <p>月卡：<b>30次</b>减免配送费。</p>
	        <p>季卡：<b>90次</b>减免配送费。</p>
	        <p>年卡：<b>360</b>次减免配送费。</p>
	        <p>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
		</footer>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import headTop from '../../../components/header/head'
	import alertTip from '../../../components/common/alertTip'
	import { vipCart } from '../../../service/getData'


	export default {
		data() {
			return {
				cartNumber: null,
				password: null,
				showAlert: false,
				alertText: null,
			}
		},
		computed: {
			...mapState([
				'userInfo'
			]),
			couldPay: function() {
				return (/^\d{10}$/.test(this.cartNumber))&&(/^\d{6}$/.test(this.password));
			}
		},
		components: {
			headTop,
			alertTip
		},
		methods: {
			async confirmPay() {
				if (this.couldPay) {
					let res = await vipCart(this.userInfo.id, this.cartNumber, this.password);
					if (res.message) {
						this.showAlert = true;
						this.alertText = res.message;
					} else if (res.name) {
						this.showAlert = true;
						this.alertText = res.name;
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/mixin';

	.page_container{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding-top: 1.95rem;
		z-index: 202;
		background-color: #f5f5f5;
		p, span, input{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
	}

	.buy_for{
		line-height: 2rem;
		padding-left: .7rem;
		@include sc(.6rem, #666);
		span{
			font-weight: bold;
		}
	}
	.form_style{
		display: flex;
		flex-direction: column;
		input{
			height: 2rem;
			padding-left: .7rem;
			@include sc(.65rem, #999);
			border-bottom: 1px solid #f5f5f5;
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
	.could_pay{
		background-color: #4cd964;
	}
	.binding{
		margin-top: 1rem;
		h3{
			margin-bottom: .6rem;
			@include sc(.65rem, #aaa);
			font-weight: normal;
			text-align: center;
		}
		p, b{
			@include sc(.5rem, #aaa);
			line-height: .8rem;
		}
		p{
			padding-left: 2rem;
		}
	}
</style>
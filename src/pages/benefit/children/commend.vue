<template>
	<div class="page">
		<head-top head-title="推荐有奖" go-back="true"></head-top>
		<section class="activity_banner">
			<img src="../../../images/activity.png">
		</section>
		<section class="invite_friend">
			<div class="invite_friend_style">
				<img src="../../../images/weixin.png" @click="fenxiang">
				<p>邀请微信好友</p>
			</div>
			<div class="invite_friend_style">
				<img src="../../../images/qq.png" @click="fenxiang">
				<p>邀请QQ好友</p>
			</div>
			<div class="invite_friend_style">
				<img src="../../../images/fenxiang.png" @click="fenxiang">
				<p>面对面邀请</p>
			</div>
		</section>
		<section class="invite_num">
			<div class="invite_num_style">
				<p>累计收益</p>
				<p><span>0</span>元</p>
			</div>
			<div class="invite_num_style invite_people">
				<p>成功邀请</p>
				<p><span>0</span>人</p>
			</div>
		</section>
		<p class="income_detail">-收益明细-</p>
		<section class="income_tip">
			<img src="../../../images/qianbao.png">
			<p>还不赶紧去邀请好友</p>
		</section>
		<alert-tip v-if="showAlert" @closeTip="showAlert = false" :alert-text="alertText"></alert-tip>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import headTop from '../../../components/header/head'
	import alertTip from '../../../components/common/alertTip'

	export default {
		data() {
			return {	
				showAlert: false,
				alertText: null,
			}
		},
		computed: {
			...mapState([
				'userInfo'
			])
		},
		components: {
			headTop,
			alertTip
		},
		methods: {
			fenxiang() {
				this.showAlert = true;
				this.alertText = "请在饿了么APP中打开";
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
		background-color: #f5f5f5;
		overflow-y: auto;
		p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
	}
	.activity_banner {
		img{
			@include wh(100%, 10rem);
		}
	}
	.invite_friend{
		display: flex;
		padding: 1rem 0;
		background-color: #fff;
		.invite_friend_style{
			flex: 1;
            text-align: center;
            img{
            	@include wh(2.5rem, 2.5rem);
            }
            p{
            	@include sc(.5rem, #333);
            }
		}
	}
	.invite_num{
		display: flex;
		margin-top: 1rem;
		@include sc(.5rem, #666);
		.invite_num_style{
			flex: 1;
			text-align: center;
			p{
				color: #666;
			}
			span{
				@include sc(.8rem, #ff5633);
				font-weight: bold;
			}
		}
		.invite_people{
			border-left: 0.025rem solid #ddd;
			span{
				color: #666;
			}
		}
	}
	.income_detail{
		margin-top: 1rem;
		@include sc(.5rem, #666);
		text-align: center;
	}
	.income_tip{
		margin-top: 1rem;
		text-align: center;
		img{
			@include wh(1.3rem, 1.6rem);
		}
		p{
			@include sc(.5rem, #999);
		}
	}
</style>
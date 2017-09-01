<template>
	<div class="page">
		<head-top head-title="新增地址" go-back="true"></head-top>
		<section class="add-detail">
			<form action="" @submit.prevent>
				<section class="ui-padding-block">
					<div class="input-new">
						<input type="text" placeholder="请填写你的姓名" :class="{verifies: verify}" v-model="message" @input="inputThing" />
						<p v-if="verify">请填写您的姓名</p>
					</div>
					<router-link to="/profile/info/address/add/addDetail" class="add-detail-link">
						<div class="input-new">
							<input type="text" placeholder="小区/写字楼/学校等" readonly="readonly" v-model="addAddress" />
						</div>
					</router-link>
					<div class="input-new">
						<input type="text" placeholder="请填写详细送餐地址" :class="{verifies: verifyTwo}" @input="inputThingTwo" v-model="mesTwo" />
						<p v-if='verifyTwo'>{{sendAddress}}</p>
					</div>
					<div class="input-new">
						<input type="text" placeholder="请填写能够联系到您的手机号" :class="{verifies: verifyThree}" @input="inputThingThree" v-model="telenum" />
						<p v-if='verifyThree'>{{telephone}}</p>
					</div>
					<div class="input-new">
						<input type="text" placeholder="备用联系电话（选填）" v-model="standbyTelenum" @input="inputThingFour" />
						<p v-if="verifyFour">{{standbyTele}}</p>
					</div>
				</section>
				<section class="addbutton">
					<button :class="{butopacity: butpart}" @click.prevent="submitThing">新增地址</button>
				</section>
			</form>
		</section>
		<transition name="router-slide" mode="out-in">
			<router-view></router-view>
		</transition>
		<alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import headTop from '../../../../../components/header/head'
	import alertTip from '../../../../../components/common/alertTip'
	import { postAddAddress } from '../../../../../service/getData'

	export default {
		data() {
			return {
				verify: false,
				verifyTwo: false,
				verifyThree: false,
				verifyFour: false,
				butpart: false,
				sendAddress: '',
				message: '',
				mesTwo: '',
				telenum: '',
				telephone: '',
				standbyTelenum: '',
				standbyTele: '',
				showAlert: false,
				alertText: null,
			}
		},
		computed: {
			...mapState([
				'userInfo', 'addAddress', 'removeAddress', 'newAddress', 'geohash'
			])
		},
		components: {
			headTop
		},
		methods: {
			...mapMutations([
				'ADD_ADDRESS'
			]),
			inputThing() {
				(!this.message) ? this.verfiy=true : this.verify=false;
				this.bindThing();
			},
			inputThingTwo() {
				this.verifyTwo = true;
				if (this.mesTwo.length == 0) {
					this.sendAddress = "请详细填写送餐地址";
				} else if (this.mesTwo.length > 0 && this.mesTwo.length <= 2) {
					this.sendAddress = "送餐地址太短了，不能辨识";
				} else {
					this.sendAddress = "";
					this.verifyTwo = false;
				}
				this.bindThing();
			},
			inputThingThree() {
				this.verifyThree = true;
				if ((/^[1][358][0-9]{9}$/).test(this.telenum)) {
					this.verifyThree = true;
				} else if (this.telenum == '') {
					this.telephone = "手机号不能为空";
				} else {
					this.telephone = "请输入正确的手机号";
				}
				this.bindThing();
			},
			inputThingFour() {
				this.verifyFour = true;
				if ((/^[1][358][0-9]{9}$/).test(this.standbyTelenum) && this.standbyTelenum.length == '') {
					this.verifyFour = false;
				} else {
					this.standbyTele = "请输入正确的手机号";
				}
				this.bindThing();
			},
			bindThing() {
				if (this.message && this.mesTwo && !this.verifyThree) {
					this.butpart = true;
				} else {
					this.butpart = false;
				}
 			},
 			async submitThing() {
 				let res = await postAddAddress(this.userInfo.user_id, this.mesTwo, this.addAddress, this.geohash, this.message, this.telenum, this.standbyTelenum, 0, 1, '公司', 4);
 				if (res.message) {
 					this.showAlert = true;
 					this.alertText = res.message;
 				} else if (this.butpart) {
 					this.ADD_ADDRESS({
 						name: this.message,
 						address: this.mesTwo,
 						address_detail: this.addAddress,
 						geohash: 'wtw37r7cxep4',
 						phone: this.telenum,
 						phone_bk: this.standbyTelenum,
 						poi: this.addAddress,
 						poi_type: 0
 					});
 					this.$router.go(-1);
 				}
 			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../../../style/mixin';

	.page{
		position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f2f2f2;
        z-index: 202;
        padding-top: 1.95rem;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
	}
	.add-detail{
    	margin-top:.4rem;
    }
    .ui-padding-block{
    	background:#fff;
    	padding-top:.4rem;
    	.add-detail-link{display:block;}
    	.input-new{
    		padding-bottom:.4rem;
    		input{
    			display:block;
    			width:15rem;
    			font-size:.6rem;
    			margin:0 auto;
    			padding:.3rem;
    			background:#f2f2f2;
    			border:1px solid #ddd;
    			@include borderRadius(3px);
    		}
    		.verifies{
				border-color:#ea3106;
    		}
    		p{
				@include sc(.4rem,#ea3106);
				padding-left:.5rem;
				margin-top:.2rem;
    		}
    	}
    	
    }
    .addbutton{
    	margin:.6rem auto;
    	width:15rem;
    	background:#4cd964;
    	@include borderRadius(3px);
    	button{
    		width:100%;
    		@include sc(.6rem,#fff);
    		line-height:1.6rem;
    		background:none;
    		font-weight:700;
    		opacity:.6;
    	}
    	.butopacity{
    		transition: all .4s;
    		opacity:1;
    	}
    }

    .router-slide-enter-active, .router-slide-leave-active{
		transition: all .4s;
	}
	.router-slide-enter, .router-slide-leave-active{
		transform: translate3d(2rem, 0, 0);
		opacity: 0;
	}
</style>
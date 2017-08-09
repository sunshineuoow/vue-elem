<template>
	<div class="page">
		<head-top head-title="编辑地址" go-back="true">
			<span slot="edit" class="edit" @click="editThing">{{editText}}</span>
		</head-top>
		<section class="address">
			<ul class="addressList">
				<li v-for="(item, index) in removeAddress">
					<div>
						<p>{{item.address}}</p>
						<p><span>{{item.phone}}</span><span v-if="item.phonepk">、{{item.phonepk}}</span></p>
					</div>
					<div class="deletesite" v-if="deletesite">
						<span @click="deleteSite(index, item)">x</span>
					</div>
				</li>
			</ul>
			<router-link to="/profile/info/address/add">
				<div class="addsite">
					<span>新增地址</span>
					<span class="addsvg">
						<svg fill="#d8d8d8">
						    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
						</svg>
					</span>
				</div>
			</router-link>
		</section>
		<transition name="router-slide" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import headTop from '../../../../components/header/head'
	import { getAddressList, deleteAddress } from '../../../../service/getData'


	export default {
		data() {
			return {
				deletesite: false,
				editText: '编辑',
				addressList: [],
			}
		},
		mounted() {
			this.initData();
		},
		computed: {
			...mapState([
				'userInfo', 'removeAddress'
			]),
		},
		components: {
			headTop
		},
		methods: {
			...mapActions([
				'saveAddress',
			]),
			initData() {
				if (this.userInfo && this.userInfo.user_id) {
					this.saveAddress();
				}
			},
			editThing() {
				if (this.editText == '编辑') {
					this.editText = '完成';
					this.deletesite = true;
				} else {
					this.editText = '编辑';
					this.deletesite = false;
				}
			},
			async deleteSite(index, item) {
				if (this.userInfo && this.userInfo.user_id) {
					await deleteAddress(this.userInfo.user_id, item_id);
					this.removeAddress.splice(index, 1);
				}
			}
		},
		watch: {
			userInfo: function(value) {
				if (value && value.user_id) {
					this.initData()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../../style/mixin';

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

    .edit{
    	@include ct;
    	@include sc(.7rem, #fff);
    	right: .4rem;
    }

    .address{
    	width: 100%;
    	margin-top: .4rem;
    	border-top: 1px solid #d9d9d9;
    	border-bottom: 1px solid #d9d9d9;
    	.addressList{
    		background-color: #fff;
    		li{
    			border-bottom:1px solid #d9d9d9;
    			padding:.4rem;
    			@include fj(space-between);
    			p{
    				line-height:.9rem;
    				@include sc(.6rem,#333);
    				span{
    					display:inline-block;
    					@include sc(.6rem,#333);
    				}
    			}
    			.deletesite{
    				display:flex;
    				align-items:center;
    				span{
    					display:block;
    					@include sc(.8rem,#999)
    				}
    			}
    		}
    		li:nth-of-type(1){
    			background:#FFF8C3;
    		}
    	}
    	.addsite{
    		@include fj;
    		margin-top: .4rem;
    		padding: .2rem .4rem;
    		border-top: 1px solid #d9d9d9;
    		background-color: #fff;
    		span{
    			display: block;
    			line-height: 1.4rem;
    			@include sc(.7rem, #333);
    		}
    		.addsvg{
    			@include wh(.66667rem, 1.4rem);
    			svg{
    				@include wh(100%, 100%);
    			}
    		}
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
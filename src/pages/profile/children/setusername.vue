<template>
	<div class="page">
		<head-top head-title="修改用户名" go-back="true"></head-top>
		<section class="setname">
			<section class="setname-top">
				<input type="text" placeholder="请输入用户名" :class="{'setname-input': borderColor}" @input="inputThing" v-model="inputValue">
				<div>
					<p v-if="earn">用户名只能修改一次（5-24字符之间）</p>
					<p class="unlikep" v-else>用户名长度在5-24位之间</p>
				</div>
			</section>
			<section class="reset">
				<button :class="{fontopacity:opacityall}" @click="resetName">确认修改</button>
			</section>
		</section>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import headTop from '../../../components/header/head'


	export default {
		data() {
			return {
				earn: true,
				borderColor: false,
				opacityall: false,
				inputValue: '',
				newusername: ''
			}
		},
		computed: {
			...mapState([
				'userInfo',
			])
		},
		components: {
			headTop,
		},
		methods:{
			...mapMutations([
				'RETSET_NAME'
			]),
			inputThing() {
				if (this.inputValue.length < 5 || this.inputValue.length > 24) {
					this.earn = false;
					this.borderColor = true;
					this.opacityall = false;
				} else {
					this.eran = true;
					this.borderColor = false;
					this.opacityall = true;
				}
			},
			resetName() {
				this.RETSET_NAME(this.inputValue);
				this.$router.go(-1);
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

	.setname{
		width: 15.2rem;
		margin: 0 auto;
		.setname-top{
			padding-top: .4rem;
			input{
				display: block;
				width: 15.2rem;
				line-height: 1.2rem;
				padding: .2rem .1rem;
				border: 1px solid #ddd;
				background: none;
				font-size: .7rem;
			}
			.setname-input{
				border-color: #ea3160;
			}
			p{
				width: 100%;
				padding: .4rem 0 1rem;
				@include sc(.4rem, #666);
			}
			.unlikep{
				padding-top: .1rem;
				@include sc(.58rem, #ea3160);
			}
		}
		.reset{
			width: 100%;
			background-color: $blue;
			button{
				display: block;
				width: 100%;
				line-height: 2rem;
				@include sc(.7rem, #fff);
				opacity: .6;
				background: none;
				transition: all 1s;
			}
			.fontopacity{
				transition: all 1s;
				opacity: 1;
			}
		}
	}
</style>
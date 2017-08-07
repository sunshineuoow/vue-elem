<template>
	<div class="alert_container">
		<section class="tip_text_container">
			<div class="tip_icon">
				<span></span>
				<span></span>
			</div>
			<p class="tip_text">{{alertText}}</p>
			<div class="confirm" @click="closeTip">确认</div>
		</section>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				positionY: 0,
				timer: null
			}
		},
		props:['alertText'],
		methods: {
			closeTip() {
				this.$emit('closeTip');
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';

	@keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }

	.alert_container{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 200;
	}
	.tip_text_container{
		@include fj(center);
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		width: 12rem;
		margin-top: -6rem;
		margin-left: -6rem;
     	padding-top: .6rem;
     	border: 1px;
     	border-radius: .25rem;
     	background-color: rgba(255, 255, 255, 1);
     	animation: tipMove .4s ;
     	.tip_icon{
     		@include fj(center);
     		flex-direction: column;
     		align-items: center;
			@include wh(3rem, 3rem);
			border: 0.15rem solid #f8cb86;
			border-radius: 50%;
			span:nth-of-type(1){
				@include wh(.12rem, 1.5rem);
				background-color: #f8cb86;
			}
			span:nth-of-type(2){
				@include wh(.2rem, .2rem);
				margin-top: .2rem;
				border: 1px;
				border-radius: 50%;
				background-color: #f8cb86;
			}
     	}
     	.tip_text{
     		line-height: .9rem;
     		margin-top: .8rem;
     		padding: 0 .4rem;
     		@include sc(.7rem, #333);
     		text-align: center;
     	}
     	.confirm{
     		width: 100%;
     		line-height: 1.8rem;
     		margin-top: .8rem;
     		border: 1px;
     		border-bottom-left-radius: .25rem;
     		border-bottom-right-radius: .25rem;
     		@include sc(.8rem, #fff);
     		font-weight: bold;
     		text-align: center;
     		background-color: #4cd964;
     	}
	}
</style>
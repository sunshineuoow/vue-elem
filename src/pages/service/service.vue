<template>
	<div class="service_page">
		<head-top head-title="服务中心" go-back="true"></head-top>
		<section class="service_connect">
			<a href="https://ecs-im.ele.me/" class="service_left">
				<svg>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#human"></use>
				</svg>	
				<span>在线客服</span>
			</a>
			<a href="tel:10105757" class="service_left">
				<svg>
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#phone"></use>
				</svg>	
				<span>联系我们</span>
			</a>
		</section>
		<section class="hot_questions">
			<h4 class="question_header">热门问题</h4>
			<ul>
				<li class="question_title" v-for="(item, index) in questionTitle" :key="index" @click="toQuestionDetail(item, index)">
					<span>{{item}}</span>
					<svg class="arrow-svg" fill="#999">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
					</svg>
				</li>
			</ul>
		</section>
		<transition name="router-slide" mode="out-in">
			<router-view></router-view>
		</transition>	
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'
	import headTop from '../../components/header/head'
	import { getService } from '../../service/getData'

	export default {
		data() {
			return {
				serviceData: null,
				questionTitle: [],
				questionDetail: [],
			}
		},
		mounted() {
			this.initData();
		},
		components: {
			headTop
		},
		methods: {
			...mapMutations([
				'SAVE_QUESTION',
			]),
			async initData() {
				this.serviceData = await getService();
				Object.keys(this.serviceData).forEach(item => {
					let avoidRepeat = false;
					this.questionTitle.forEach(insertItem => {
						if (insertItem == this.serviceData[item]) {
							avoidRepeat = true;
						}
					})
					//标题和内容分离
					if (item.indexOf('Caption') != -1 && !avoidRepeat) {
						this.questionTitle.push(this.serviceData[item]);
					} else if (!avoidRepeat) {
						this.questionDetail.push(this.serviceData[item]);
					}
				});
			},
			toQuestionDetail(title, index) {
				this.SAVE_QUESTION({title, detail: this.questionDetail[index]});
				this.$router.push('/service/questionDetail')
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';

	.service_page{
		padding-top: 1.95rem;
		background-color: #fff;
		p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
	}
	.service_connect{
		@include fj;
		a{
			@include fj(center);
			flex-direction: column;
			align-items: center;
			flex: 1;
			height: 4rem;
			border-bottom: 1px solid #f5f5f5;
			svg{
				@include wh(1rem, 1rem);
			}
			span{
				margin-top: .4rem;
				@include sc(.6rem, #666);
			}
		}
		.service_left{
			border-right: 1px solid #f5f5f5;
		}
	}
	.hot_questions{
		.question_header{
			line-height: 3rem;
			padding-left: .7rem;
			border-bottom: 1px solid #f5f5f5;
			@include sc(.75rem, #333);
		}
		.question_title{
			@include fj;
			align-items: center;
			line-height: 2rem;
			padding: 0 .7rem;
			border-bottom: 1px solid #f5f5f5;
			span{
				@include sc(.6rem, #666);
			}
			svg{
				@include wh(.6rem, .6rem);
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
<template>
	<div class="detail_page">
		<head-top :head-title="question.title" go-back="true"></head-top>
		<section id="scroll_section" class="scroll_container">
			<section v-html="markdownText" class="markdown"></section>
		</section>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import headTop from '../../../components/header/head'
	import showdown from 'showdown'
	import BScroll from 'better-scroll'

	export default {
		data() {
			return {

			}
		},
		mounted() {
			this.$nextTick(() => {
				new BScroll('#scroll_section', {
					deceleration: 0.001,
					bounce: true,
					swipeTime: 1800,
					click: true
				})
			})
		},
		computed: {
			...mapState([
				'question',
			]),
			markdownText: function() {
				let converter = new showdown.Converter();
				return converter.makeHtml(this.question.detail);
			}
		},
		components: {
			headTop
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/mixin';

	.detail_page{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		padding-top: 1.95rem;
		background-color: #fff;
		z-index: 202;
		p, span{
			font-family: Helvetica Neue,Tahoma,Arial;
		}
	}
	.scroll_container{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding-top: 1.95rem;
		overflow-y: auto;
	}
	.markdown{
		padding: 0 .7rem 2rem;
		@include sc(.65rem, #666);
	}
</style>
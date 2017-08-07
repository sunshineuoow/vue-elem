<template>
	<div class="download_page">
		<head-top head-title="下载" go-back="true"></head-top>
		<section class="download_container">
			<img src="../../images/elmlogo.jpeg" class="logo_img">
			<p>下载饿了么APP</p>
			<div class="determine" @click="download">下载</div>
		</section>
		<alert-tip v-if="showAlert" @closeTip="showAlert = false" :alert-text="alertText"></alert-tip>
	</div>
</template>

<script>
	import headTop from '../../components/header/head'
	import alertTip from '../../components/common/alertTip'

	export default {
		data() {
			return {
				system: null,
				showAlert: false,
				alertText: null,
			}
		},
		created() {
			//判断系统
			let u = navigator.userAgent;
			console.log(u);
			let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
			let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			if (isAndroid) {
				this.system = 'Android';
			} else if (isIOS) {
				this.system = 'IOS';
			} else {
				this.system = 'pc';
			}
		},
		components: {
			headTop,
			alertTip
		},
		methods: {
			download() {
				if (this.system === 'IOS') {
					this.showAlert = true;
					this.alertText = 'IOS用户请前往AppStroe下载';
					return;
				} else {
					try {
						let elemIF = document.createElement('iframe');
						elemIF.src = 'http://cangdu.org/files/elm.apk';
						elemIF.style.display = "none";
						document.appendChild(elemIF);
					} catch (e) {
						alert('下载失败');
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';

	.download_page{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		padding-top: 1.95rem;
		background-color: #fff;
		z-index: 202;
		p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
	}
	.download_container{
		text-align: center;
		.logo_img{
			margin-top: 1rem;
			border-radius: 1rem;
		}
		p{
			margin-bottom: 1rem;
			@include sc(.8rem, #666);
		}
		.determine{
			line-height: 1.8rem;
			margin: .5rem .7rem 0;
			border-radius: .2rem;
			@include sc(.7rem, #fff);
			background-color: #4cd964;
			text-align: center;
		}
	}
</style>
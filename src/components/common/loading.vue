<template>
	<div class="loading_container">
        <div class="loading_img" :style="{backgroundPositionY: -(positionY%7)*2.5 + 'rem'}"></div>
        <svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
        </svg>
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
        mounted() {
            this.timer = setInterval(() => {
                this.positionY++;
            },600);
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
	}
</script>

<style lang="scss" scoped>
	@import '../../style/mixin';
    .loading_container{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        @include wh(2.5rem, 2.5rem);
    }
    .loading_img{
        position: relative;
        @include wh(100%, 100%);
        background: url(../../images/icon_loading.png) 0 0 no-repeat;
        background-size: 2.5rem auto;
        z-index: 11;
        transform: translateY(0);
        animation: load .6s infinite ease-in-out;
    }
    .load_ellipse{
        position: absolute;
        top: 2.2rem;
        left: 0.2rem;
        @include wh(2.6rem, 2rem);
        z-index: 10;
        animation: ellipse .6s infinite ease-in-out;
    }
    @keyframes load {
        0%{
            transform: translateY(0px);
        }
        50%{
            transform: translateY(-50px);
        }
        100%{
            transform: translateY(0px);
        }
    }
    @keyframes ellipse{
        0%{transform: scale(1);}
        50%{transform: scale(0.3);}
        100%{transform: scale(1);}
    }
</style>
<template>
    <div class="food_detail">
        <head-top :head-title="name" go-back="true"></head-top>
        <section class="header_img">
            <img :src="imgBaseUrl + image_path" class="food_img">
            <div class="cover"></div>
        </section>
        <p class="description">{{description}}</p>
        <section class="detail_container">
            <section class="detail_left">
                <p>{{name}}</p>
                <div class="rating_sale">
                    <span>评分</span>
                    <rating-star :rating="rating"></rating-star>
                    <span>{{rating.toFixed(1)}}</span>
                </div>
                <p>
                    <span>月售 {{month_sales}}单</span>
                    <span>售价 &yen;{{food.specfoods[0].price}}</span>
                    <span v-if="food.specfoods.length">起</span>
                </p>
                <p>
                    <span>评论数 {{rating_count}}</span>
                    <span>好评率 {{satisfy_rate}}%</span>
                </p>
            </section>
        </section>
    </div>
</template>

<script>
    import headTop from '../../../components/header/head'
    import { getImgPath } from '../../../components/common/mixin'
    import ratingStar from '../../../components/common/ratingStar'
    import buyCart from '../../../components/common/buyCart'
    import { imgBaseUrl } from '../../../config/env'

    export default {
        data() {
            return {
                image_path: null,
                description: null,
                month_sales: null,
                name: null,
                rating: null,
                rating_count: null,
                satisfy_rate: null,
                food: null,
                shopId: null,
                imgBaseUrl,
            }
        },
        created() {
            this.image_path = this.$route.query.image_path;
            this.description = this.$route.query.description;
            this.month_sales = this.$route.query.month_sales;
            this.name = this.$route.query.name;
            this.rating = this.$route.query.rating;
            this.rating_count = this.$route.query.rating_count;
            this.satisfy_rate = this.$route.query.satisfy_rate;
            this.food = this.$route.query.food;
            this.shopId = this.$route.query.shopId;
            console.log(this.food);
        },
        mixins:[getImgPath],
        components: {
            headTop,
            ratingStar,
            buyCart
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../style/mixin';

    .food_detail{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding-top: 1.95rem;
        background-color: #fff;
        z-index: 12;
        p, span{
            font-family: Helvetica Neue, Tahoma, Arial;
        }
    }
    .header_img{
        position: relative;
        .food_img{
            display: block;
            width: 100%;
        }
        .cover{
            position: absolute;
            top: 0;
            left: 0;
            @include wh(100%, 100%);
        }
    }
    .description{
        line-height: .8rem;
        margin-top: .5rem;
        padding: 0 .4rem;
        bottom: .2rem;
        @include sc(.6rem, #666);
    }
    .detail_container{
        padding: .5rem;
        @include fj;
        align-items: center;
        .detail_left {
            p:nth-of-type(1) {
                margin-bottom: .2rem;
                @include sc(.7rem, #333);
            }
            .rating_sale {
                display: flex;
                align-items: center;
                span:nth-of-type(1) {
                    margin-right: .2rem;
                    @include sc(.6rem, #666);
                }
                span:nth-of-type(2) {
                    margin-left: .2rem;
                    @include sc(.55rem, #f60);
                }
                .rating_container {
                    top: 0;
                }
            }
            p:nth-of-type(2) {
                margin-top: .3rem;
                font-size: 0;
                span:nth-of-type(1){
                    margin-right: .4rem;
                    @include sc(.6rem, #666);
                }
                span:nth-of-type(2), span:nth-of-type(3){
                    margin-right: .2rem;
                    @include sc(.6rem, #f60);
                }
            }
            p:nth-of-type(3){
                span{
                    @include sc(.6rem, #666);
                }
            }
        }
    }
</style>
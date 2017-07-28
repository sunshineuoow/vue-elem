<template>
    <div>
        <section v-if="!showLoading" class="shop_container">
            <nav class="go_back" @click="goBack">
                <svg width="4rem" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255, 255, 255);stroke-width:3" />
                </svg>
            </nav>
            <header class="shop_detail_header" :style="{zIndex: showActivities ? '14' : '10' }">
                <img :src="imgBaseUrl + shopDetailData.image_path" class="header_cover_img" >
                <section class="description_header">
                    <router-link to="/shop/shopDetail" class="description_top">
                        <section class="description_left">
                            <img :src="imgBaseUrl + shopDetailData.image_path">
                        </section>
                        <section class="description_right">
                            <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
                            <p class="description_text">商家配送 / {{shopDetailData.order_lead_time}}分钟送达 / 配送费￥{{shopDetailData.float_delivery_fee}}</p>
                            <p class="description_promotion ellipsis">公告：{{promotionInfo}}</p>
                        </section>
                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
                            <path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
                        </svg>
                    </router-link>
                    <footer class="description_footer" v-if="shopDetailData.activities.length" @click="showActivitiesFun">
                        <p class="ellipsis">
                            <span class="tip_icon" :style="{backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color}">
                                {{shopDetailData.activities[0].icon_name}}
                            </span>
                            <span>{{shopDetailData.activities[0].description}}（APP专享）</span>
                        </p>
                        <p>{{shopDetailData.activities.length}}个活动</p>
                        <!--<svg class="footer_arrow">-->
                            <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>-->
                        <!--</svg>-->
                    </footer>
                </section>
            </header>
            <transition name="fade">
                <section class="activities_details" v-if="showActivities">
                    <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
                    <h3 class="activities_ratingstar">
                        <rating-star :rating="shopDetailData.rating"></rating-star>
                    </h3>
                    <section class="activities_list">
                        <header class="activities_title_style">
                            <span>优惠信息</span>
                        </header>
                        <ul>
                            <li v-for="item in shopDetailData.activities" :key="item.id">
                                <span class="activities_icon" :style="{backgroundColor: '#' + item.icon_color, borderColor: '#' + item.icon_color}">{{item.icon_name}}</span>
                                <span>{{item.name}}（APP专享）</span>
                            </li>
                        </ul>
                    </section>
                    <section class="activities_shopinfo">
                        <header class="activities_title_style">
                            <span>商家公告</span>
                        </header>
                        <p>{{promotionInfo}}</p>
                    </section>
                    <svg width="60" height="60" class="close_activities" @click="showActivitiesFun">
                        <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none"/>
                        <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2"/>
                        <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2"/>
                    </svg>
                </section>
            </transition>
            <section class="change_show_type">
                <div>
                    <span :class="{activity_show: changeShowType == 'food'}" @click="changeShowType='food'">商品</span>
                </div>
                <div>
                    <span :class="{activity_show: changeShowType == 'rating'}" @click="changeShowType='rating'">评价</span>
                </div>
            </section>
            <transition name="fade-choose">
                <section v-show="changeShowType=='food'" class="food_container">
                    <section class="menu_container">
                        <section class="menu_left">
                            <ul>
                                <li v-for="(item, index) in menuList" :key="index">

                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </transition>
        </section>
        <loading v-show="showLoading || loadRatings"></loading>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import { msiteAddress, shopDetails, foodMenu,  } from '../../service/getData'
    import loading from '../../components/common/loading'
    import ratingStar from '../../components/common/ratingStar'
    import { loadMore, getImgPath } from '../../components/common/mixin'
    import { imgBaseUrl } from '../../config/env'

    export default {
        data() {
            return {
                geohash: '',
                shopId: null,
                showLoading: true,
                changeShowType: 'food',
                shopDetailData: null,
                showActivities: false,
                loadRatings: false,
                imgBaseUrl
            }
        },
        created() {
            this.geohash = this.$route.query.geohash;
            this.shopId = this.$route.query.id;
        },
        mounted() {
            this.initData();
        },
        components: {
            loading,
            ratingStar,
        },
        computed: {
            promotionInfo() {
                return this.shopDetailData.promotion_info || "欢迎光临，用餐高峰请提前下单，谢谢";
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_ADDRESS',
            ]),
            async initData() {
                //初始化数据
                if (!this.latitude) {
                    let res = await msiteAddress(this.geohash);
                    this.RECORD_ADDRESS(res);
                }
                this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);
                this.menuList = await foodMenu(this.shopId);
                this.hideLoading();
                console.log(this.shopDetailData);
            },
            showActivitiesFun() {
                this.showActivities = !this.showActivities;
            },
            hideLoading() {
                this.showLoading = false;
            },
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .shop_container{
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        left: 0;
        height: 100%;
    }
    .go_back{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        padding: 0.3rem 0 0 0.6rem;
        z-index: 11;
    }
    .shop_detail_header{
        position: relative;
        overflow: hidden;
        .header_cover_img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 9;
            filter: blur(10px);
        }
        .description_header{
            position: relative;
            width: 100%;
            padding: 1.4rem 0 0.4rem 0.4rem;
            background-color: rgba(119, 103, 137, .43);
            z-index: 10;
            overflow: hidden;
            .description_top{
                display: flex;
                .description_left{
                    margin-right: 0.3rem;
                    img{
                        display: block;
                        @include wh(2.9rem, 2.9rem);
                        border-radius: 0.15rem;
                    }
                }
                .description_right{
                    flex: 1;
                    .description_title{
                        @include sc(.8rem, #fff);
                        width: 100%;
                        margin-bottom: 0.3rem;
                        font-weight: bold;
                    }
                    .description_text{
                        @include sc(.5rem, #fff);
                        margin-bottom: 0.3rem;
                    }
                    .description_promotion{
                        @include sc(.5rem, #fff);
                        width: 11.5rem;
                    }
                }
                .description_arrow{
                    @include ct;
                    right: 0.3rem;
                    z-index: 11;
                }
            }
            .description_footer{
                @include fj;
                margin-top: 0.5rem;
                padding-right: 1rem;
                p{
                    @include sc(.5rem, #fff);
                    span{
                        color: #fff;
                    }
                    .tip_icon{
                        display: inline-block;
                        padding: 0 .04rem;
                        border: 0.025rem solid #fff;
                        border-radius: 0.1rem;
                        font-size: .4rem;
                    }
                }
                .ellipsis{
                    width: 84%;
                }
                .footer_arrow{
                    @include wh(.45rem, .45rem);
                    position: absolute;
                    right: .3rem;
                }
            }
        }
    }
    .activities_details{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 1.125rem;
        background-color: #262626;
        z-index: 200;
        .activities_shoptitle{
            text-align: center;
            @include sc(.8rem, #fff);
        }
        .activities_ratingstar{
            display: flex;
            justify-content: center;
            transform: scale(2.2);
            margin-top: .7rem;
        }
        .activities_list{
            margin: 1.5rem 0 1rem;
            @include sc(.5rem, #fff);
            li{
                margin-bottom: .2rem;
                .activities_icon{
                    display: inline-block;
                    padding: 0 .02rem;
                    border: 0.025rem solid #fff;
                    border-radius: 0.1rem;
                }
                span{
                    color: #fff;
                    line-height: .6rem;
                }
            }
        }
        .activities_shopinfo{
            p{
                line-height: .7rem;
                @include sc(.5rem, #fff);
            }
        }
        .activities_title_style{
            text-align: center;
            margin-bottom: 1rem;
            span{
                @include sc(.5rem, #fff);
                padding: .2rem .4rem;
                border: 0.025rem solid #555;
                border-radius: 0.5rem;
            }
        }
        .close_activities{
            position: absolute;
            bottom: 1rem;
            @include cl;
        }
    }
    .fade-enter-active, .fade-leave-active{
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active{
        opacity: 0;
    }
</style>
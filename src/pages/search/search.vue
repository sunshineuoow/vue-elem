<template>
    <div class="paddingTop search_page">
        <head-top head-title="搜索" go-back="true"></head-top>
        <form class="search_form">
            <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model="searchValue" @input="checkInput">
            <input type="submit" name="submit" class="search_submit" @click.prevent="searchTarget('')">
        </form>
        <section v-if="restaurantList.length">
            <h4 class="title_restaurant">商家</h4>
            <ul class="list_container">
                <router-link :to="{path: '/shop', query:{id: item.id}}" tag="li" v-for="item in restaurantList" :key="item.id" class="list_li">
                    <section class="item_left">
                        <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
                    </section>
                    <section class="item_right">
                        <div class="item_right_text">
                            <p>
                                <span>{{item.name}}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
                                    <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                                    <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"/>
                                    <text x="3.5" y="9" style="fill:#FF6000;font-size:9;font-weight:bold;">支付</text>
                                </svg>
                            </p>
                            <p>月售 {{item.month_sales || item.recent_order_num}} 单</p>
                            <p>{{item.delivery_fee || item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
                        </div>
                        <ul class="item_right_detail">
                            <li v-for="activity in item.activities" :key="activity.id">
                                <span class="activity_icon" :style="{backgroundColor: '#' + activity.icon_color}">{{activity.icon_name}}</span>
                                <span>{{activity.name}}</span>
                                <span class="only_phone">(手机用户专享)</span>
                            </li>
                        </ul>
                    </section>
                </router-link>
            </ul>
        </section>
        <section class="search_history" v-if="searchHistory.length&&showHistory">
            <h4 class="title_restaurant">搜索历史</h4>
            <ul>
                <li v-for="(item, index) in searchHistory" :key="index" class="history_li">
                    <span class="history_text ellipsis" @click="searchTarget(item)">{{item}}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="delete_icon" @click="deleteHistory(index)">
                        <line x1="8" y1="8" x2="18" y2="18" style="stroke:#999;stroke-width:3" />
                        <line x1="18" y1="8" x2="8" y2="18" style="stroke:#999;stroke-width:3" />
                    </svg>
                </li>
            </ul>
            <footer class="clear_history" @click="clearAllHistory">清空搜索历史</footer>
        </section>
        <div class="search_none" v-if="emptyResult">很抱歉！无搜索结果</div>
        <foot-guide></foot-guide>
    </div>
</template>

<script>
    import headTop from '../../components/header/head'
    import footGuide from '../../components/footer/footGuide'
    import { searchRestaurant } from '../../service/getData'
    import { imgBaseUrl } from '../../config/env'
    import { getStore, setStore } from '../../config/mUtils'

    export default {
        data() {
            return {
                geohash: '',
                searchValue: '',
                restaurantList: [],
                imgBaseUrl,
                searchHistory: [],
                showHistory: true,
                emptyResult: false
            }
        },
        mounted() {
            this.geohash = this.$route.params.geohash;

        },
        components: {
            headTop,
            footGuide
        },
        methods: {
            checkInput() {
                if (this.searchValue === ''){
                    this.showHistory = true;
                    this.restaurantList = [];
                    this.emptyResult = false;
                }
            },
            async searchTarget(historyValue) {
                if (historyValue) {
                    this.searchValue = historyValue;
                } else if (!this.searchValue) {
                    return;
                }
                this.showHistory = false;
                this.restaurantList = await searchRestaurant(this.geohash, this.searchValue);
                this.emptyResult = !this.restaurantList.length;
                let history = getStore('searchHistory');
                if (history) {
                    let checkRepeat = false;
                    this.searchHistory = JSON.parse(history);
                    this.searchHistory.forEach(item => {
                        if (item == this.searchValue) {
                            checkRepeat = true;
                        }
                    });
                    if (!checkRepeat) {
                        this.searchHistory.push(this.searchValue);
                    }
                } else {
                    this.searchHistory.push(this.searchValue);
                }
                setStore('searchHistory', this.searchHistory);
            },
            deleteHistory(index) {
                this.searchHistory.splice(index, 1);
                setStore('searchHistory', this.searchHistory);
            },
            clearAllHistory() {
                this.searchHistory = [];
                setStore('searchHistory', this.searchHistory);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .search_page{
        margin-bottom: 2rem;
    }
    .search_form{
        display: flex;
        padding: 0.5rem;
        background-color: #fff;
        input{
            height: 1.5rem;
        }
        .search_input{
            flex: 4;
            padding: 0 0.25rem;
            border: 0.025rem solid $bc;
            border-radius: 0.125rem;
            @include sc(0.65rem, #333);
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .search_submit{
            flex: 1;
            margin-left: .2rem;
            padding: 0 0.25rem;
            border: 0.025rem solid $bc;
            border-radius: 0.125rem;
            background-color: $blue;
            font-weight: bold;
            @include sc(0.65rem, #fff);
        }
    }
    .title_restaurant{
        font-size: 0.6rem;
        font-weight: bold;
        line-height: 2rem;
        text-indent: 0.5rem;
        color: #666;
    }
    .list_container{
        background-color: #fff;
    }
    .list_li{
        display: flex;
        justify-content: center;
        padding: 0.5rem;
        border-bottom: 0.025rem solid $bc;
        .item_left{
            margin-right: 0.25rem;
            .restaurant_img{
                @include wh(1.7rem, 1.7rem);
            }
        }
        .item_right{
            font-size: 0.55rem;
            flex: 1;
            .item_right_text{
                padding-bottom: 0.25rem;
                border-bottom: 0.025rem solid $bc;
                p{
                    line-height: .9rem;
                }
                .pay_icon{
                    margin-bottom: -0.08rem;
                }
            }
            .item_right_detail{
                margin-top: 0.25rem;
                li{
                    font-size: 0;
                    span{
                        display: inline-block;
                        font-size: .5rem;
                        margin-bottom: 0.2rem;
                        vertical-align: middle;
                    }
                    .activity_icon{
                        @include sc(.5rem, #fff);
                        margin-right: 0.125rem;
                        padding: .04rem;
                        border-radius: 0.15rem;
                        font-weight: bold;
                    }
                    .only_phone{
                        color: #ff6000;
                    }
                }
            }
        }
    }
    .search_history{
        .history_li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.3rem;
            border-bottom: 0.025rem solid $bc;
            background-color: #fff;
            @include font(0.7rem, 2rem);
        }
        .history_text{
            display: inline-block;
            width: 80%;
        }
        .delete_icon{
            @include wh(1rem, 1rem);
        }
        .clear_history{
            @include font(.7rem, 2rem);
            font-weight: bold;
            text-align: center;
            color: $blue;
            background-color: #fff;
        }
    }
    .search_none{
        margin: 0.125rem auto 0;
        @include font(0.65rem, 1.75rem);
        text-align: center;
        color: #333;
        background-color: #fff;
    }

</style>
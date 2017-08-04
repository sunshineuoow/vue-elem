<template>
    <div class="food_container">
        <head-top :head-title="headTitle" goBack="true"></head-top>
        <section class="sort_container">
            <div class="sort_item" :class="{choose_type: sortBy == 'food'}">
                <div class="sort_item_container" @click="chooseType('food')">
                    <div class="sort_item_border">
                        <span :class="{category_title: sortBy == 'food'}">{{foodTitle}}</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8"/>
                        </svg>
                    </div>
                </div>
                <transition name="showlist">
                     <div class="category_container sort_detail_type" v-show="sortBy == 'food'">
                        <section class="category_left">
                            <ul>
                                <li class="category_left_li" :class="{category_active: restaurant_category_id == item.id}" v-for="(item, index) in category" :key="index" @click="selectCategoryName(item.id, index)">
                                    <section>
                                        <img :src="getImgPath(item.image_url)" v-if="index" class="category_icon">
                                        <span>{{item.name}}</span>
                                    </section>
                                    <section>
                                        <span class="category_count">{{item.count}}</span>
                                        <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow">
                                            <path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
                                        </svg> 
                                    </section>
                                </li>
                            </ul>
                        </section>
                        <section class="category_right">
                            <ul>
                                <li class="category_right_li" :class="{category_right_chosen: restaurant_category_ids == item.id || (!restaurant_category_ids)&&index == 0}" v-for="(item, index) in categoryDetail" :key="item.id" v-if="index" @click="getCategoryIds(item.id, item.name)">
                                    <span>{{item.name}}</span>
                                    <span v-if="index">{{item.count}}</span>
                                </li>
                            </ul>
                        </section>
                    </div>
                </transition>
            </div>
            <div class="sort_item" :class="{choose_type: sortBy == 'sort'}">
                <div class="sort_item_container" @click="chooseType('sort')">
                    <div class="sort_item_border">
                        <span :class="{category_title:sortBy == 'sort'}">排序</span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8"/>
                        </svg>
                    </div>
                </div>
                <transition name="showlist">
                     <section class="sort_detail_type" v-show="sortBy == 'sort'">
                        <ul class="sort_list_container" @click="sortList($event)">
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                                </svg> 
                                <p data="0" :class="{sort_select: sortByType == 0}">
                                    <span>智能排序</span>
                                    <svg v-if="sortByType == 0">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
                                </svg>
                                <p data="5" :class="{sort_select: sortByType == 5}">
                                    <span>距离最近</span>
                                    <svg v-if="sortByType == 5">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                                </svg>
                                <p data="6" :class="{sort_select: sortByType == 6}">
                                    <span>销量最高</span>
                                    <svg v-if="sortByType == 6">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
                                </svg>
                                <p data="1" :class="{sort_select: sortByType == 1}">
                                    <span>起送价最低</span>
                                    <svg v-if="sortByType == 1">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                                </svg>
                                <p data="2" :class="{sort_select: sortByType == 2}">
                                    <span>配送速度最快</span>
                                    <svg v-if="sortByType == 2">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                            <li class="sort_list_li">
                                <svg>
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
                                </svg>
                                <p data="3" :class="{sort_select: sortByType == 3}">
                                    <span>评分最高</span>
                                    <svg v-if="sortByType == 3">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                </p>
                            </li>
                        </ul>
                    </section>
                </transition>
            </div>
            <div class="sort_item" :class="{ choose_type: sortBy == 'activity' }">
                <div class="sort_item_container" @click="chooseType('activity')">
                    <span :class="{category_title: sortBy == 'activity'}">筛选</span>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                        <polygon points="0,3 10,3 5,8"/>
                    </svg>
                </div>
                <transition name="showlist">
                     <div class="sort_detail_type filter_container" v-show="sortBy == 'activity'">
                        <section style="width:100%;">
                            <header class="filter_header_style">配送方式</header>
                            <ul class="filter_ul">
                                <li class="filter_li" v-for="item in delivery" :key="item.id" @click="selectDeliveryMode(item.id)">
                                    <svg :style="{opacity: (item.id) == 0&&(delivery_mode !== 0) ? 0 : 1}">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="delivery_mode == item.id? '#selected':'#fengniao'"></use>
                                    </svg>
                                    <span :class="{selected_filter: delivery_mode == item.id}">{{item.text}}</span>
                                </li>
                            </ul>
                        </section>
                        <section style="width:100%;">
                            <header class="filter_header_style">商家属性（可以多选）</header>
                            <ul class="filter_ul" style="paddingBottom: 0.5rem;">
                                <li class="filter_li" v-for="(item, index) in activity" :key="item.id" @click="selectSupportIds(index, item.id)">
                                    <svg v-show="support_ids[index].status" class="activity_svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span class="filter_icon" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}" v-show="!support_ids[index].status">{{item.icon_name}}</span>
                                    <span :class="{selected_filter: support_ids[index].status }">{{item.name}}</span>
                                </li>
                            </ul>
                        </section>
                        <footer class="confirm_filter">
                            <div class="filter_button_style clear_all" @click="clearSelect">清空</div>
                            <div class="filter_button_style confirm_select" @click="confirmSelectFn">
                                确定
                                <span v-show="filterNum">({{filterNum}})</span>
                            </div>
                        </footer>
                    </div>
                </transition>
            </div>
        </section>
        <transition name="showCover">
            <div class="back_cover" v-show="sortBy"></div>
        </transition>
        <section class="shop_list_container">
            <shop-list :geohash="geohash" :restaurantCategoryId="restaurant_category_id" :restaurantCategoryIds="restaurant_category_ids" :sortByType="sortByType" :deliveryMode="delivery_mode" :confirmSelect="confirmStatus" :supportIds="support_ids" v-if="latitude" @DidConfrim="clearAll"></shop-list>
        </section>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import headTop from '../../components/header/head'
    import shopList from '../../components/common/shoplist'
    import { getImgPath } from '../../components/common/mixin'
    import { msiteAddress, foodCategory, foodDelivery, foodActivity } from '../../service/getData'

    export default {
        data() {
            return {
                geohash: '',
                headTitle: '',
                foodTitle: '',
                restaurant_category_id: '',
                restaurant_category_ids: '',
                sortBy: '',
                category: null,
                categoryDetail: null,
                sortByType: null,
                delivery: null,
                activity: null,
                delivery_mode: null,
                support_ids: [],
                filterNum: 0,
                confirmStatus: false,
            }
        },
        created() {
            this.initData();
        },
        mixins: [getImgPath],
        components: {
            headTop,
            shopList
        },
        computed: {
            ...mapState([
                'latitude', 'longitude'
            ])
        },
        methods: {
            ...mapMutations([
                'RECORD_ADDRESS'
            ]),
            async initData() {
                this.geohash = this.$route.query.geohash;
                this.headTitle = this.$route.query.title;
                this.foodTitle = this.headTitle;
                this.restaurant_category_id = this.$route.query.restaurant_category_id;
                if (!this.latitude) {
                    let res = await msiteAddress(this.geohash);
                    this.RECORD_ADDRESS(res);
                }
                this.category = await foodCategory(this.latitude, this.longitude);
                this.category.forEach(item => {
                    if (this.restaurant_category_id == item.id) {
                        this.categoryDetail = item.sub_categories;
                    }
                });
                this.delivery = await foodDelivery(this.latitude, this.longitude);
                this.activity = await foodActivity(this.latitude, this.longitude);
                this.activity.forEach((item, index) => {
                    this.support_ids[index] = { status: false, id: item.id };
                });
            },
            async chooseType(type) {
                if (this.sortBy != type) {
                    this.sortBy = type;
                    if (type == 'food') {
                        this.foodTitle = "分类";
                    } else {
                        this.foodTitle = this.headTitle;
                    }
                } else {
                    this.sortBy = '';
                    if (type == 'food') {
                        this.foodTitle = this.headTitle;
                    }
                }
            },
            selectCategoryName(id, index) {
                if (index === 0) {
                    this.restaurant_category_ids = null;
                    this.sortBy = '';
                } else {
                    this.restaurant_category_id = id;
                    this.categoryDetail = this.category[index].sub_categories;
                }
            },
            selectDeliveryMode(mode) {
                if (this.delivery_mode == null) {
                    this.filterNum++;
                    this.delivery_mode = mode;
                } else if (this.delivery_mode == mode) {
                    this.filterNum--;
                    this.delivery_mode = null;
                } else {
                    this.delivery_mode = mode;
                }
            },
            selectSupportIds(index, id) {
                this.support_ids.splice(index, 1, {status: !this.support_ids[index].status, id});
                this.filterNum = this.delivery_mode == null ? 0 : 1;
                this.support_ids.forEach(item => {
                    if (item.status) {
                        this.filterNum++;
                    }
                }) 
            },
            getCategoryIds(id, name) {
                this.restaurant_category_ids = id;
                this.sortBy = '';
                this.foodTitle = this.headTitle = name;
            },
            sortList(event) {
                this.sortByType = event.target.getAttribute('data');
                this.sortBy = ''
            },
            clearAll() {
                this.delivery_mode = null;
            },
            clearSelect() {
                this.support_ids.map(item => item.status = false);
                this.filterNum = 0;
            },
            confirmSelectFn() {
                this.confirmStatus = !this.confirmStatus;
                this.sortBy = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    .food_container{
        padding-top: 3.6rem;
    }

    .sort_container{
        display: flex;
        position: fixed;
        top: 1.95rem;
        right: 0;
        width: 100%;
        border-bottom: 0.025rem solid #f1f1f1;
        box-sizing: border-box;
        background-color: #fff;
        z-index: 13;
        .sort_item{
            @include wh(33.3%, 1.6rem);
            line-height: 1rem;
            @include sc(.55rem, #444);
            text-align: center;
            .sort_item_container{
                position: relative;
                @include wh(100%, 100%);
                padding-top: .3rem;
                box-sizing: border-box;
                background-color: #fff;
                z-index: 14;
                .sort_item_border{
                    height: 1rem;
                    border-right: 0.025rem solid #e4e4e4;
                }
            }
            .sort_icon{
                vertical-align: middle;
                transition: all .3s;
                fill: #666;
            }
        }
        .sort_detail_type{
            display: flex;
            position: absolute;
            top: 1.6rem;
            left: 0;
            width: 100%;
            border-top: 0.025rem solid #e4e4e4;
            background-color: #fff;
        }
        .category_container{
            .category_left{
                flex: 1;
                height: 16rem;
                background-color: #f1f1f1;
                overflow-y: auto;
                .category_left_li{
                    @include fj;
                    padding: 0 0.5rem;
                    span{
                        line-height: 1.8rem;
                        @include sc(.5rem, #666);
                    }
                    .category_count{
                        margin-right: .25rem;
                        padding: 0 .1rem;
                        border: 0.025rem solid #ccc;
                        border-radius: 0.8rem;
                        @include sc(.4rem, #fff);
                        vertical-align: middle;
                        background-color: #ccc;
                    }
                    .category_icon{
                        @include wh(.8rem, .8rem);
                        margin-right: .2rem;
                        vertical-align: middle;
                    }
                    .category_arrow{
                        vertical-align: middle;
                    }
                }
                .category_active{
                    background-color: #fff;
                }
            }
        }
        .category_right{
            flex: 1;
            height: 16rem;
            padding-left: .5rem; 
            background-color: #fff;
            overflow-y: auto;
            .category_right_li{
                @include fj;
                height: 1.8rem;
                line-height: 1.8rem;
                padding-right: .5rem;
                border-bottom: 0.025rem solid #e4e4e4;
                span{
                    color: #666;
                }
            }
            .category_right_chosen{
                span{
                    color: $blue;
                }
            }
        }
        .choose_type{
            .sort_item_container{
                .category_title{
                    color: $blue;
                }
                .sort_icon{
                    transform: rotate(180deg);
                    fill: $blue;
                }
            }
        }
        .sort_list_container{
            width: 100%;
            .sort_list_li{
                display: flex;
                align-items: center;
                height: 2.5rem;
                svg{
                    @include wh(.7rem, .7rem);
                    margin: 0 .3rem 0 .8rem;
                }
                p{
                    @include fj;
                    align-items: center;
                    flex: auto;
                    line-height: 2.5rem;
                    border-bottom: 0.025rem solid #e4e4e4;
                    text-align: left;
                    text-indent: 0.25rem;
                    span{
                        color: #666;
                    }
                }
            }
        }
        .filter_container{
            flex-direction: column;
            aling-items: flex-start;
            min-height: 10.6rem;
            background-color: #f1f1f1;
            .filter_header_style{
                height: 1.5rem;
                line-height: 1.5rem;
                padding-left: .5rem;
                @include sc(.4rem, #333);
                text-align: left;
                background-color: #fff;
            }
            .filter_ul{
                display: flex;
                flex-wrap: wrap;
                padding: 0 0.5rem;
                background-color: #fff;
                .filter_li{
                    display: flex;
                    align-items: center;
                    @include wh(4.7rem, 1.4rem);
                    margin: 0 0.25rem 0.25rem 0;
                    padding: 0 0.25rem;
                    border: 0.025rem solid #eee;
                    border-radius: 0.125rem;
                    svg{
                        @include wh(.8rem, .8rem);
                        margin-right: 0.125rem;
                    }
                    span{
                        @include sc(.4rem, #333);
                    }
                    .filter_icon{
                        @include wh(.8rem, .8rem);
                        line-height: .8rem;
                        margin-right: .25rem;
                        border: 0.025rem solid #e4e4e4;
                        border-radius: 0.15rem;
                        font-size: .5rem;
                        text-align: center;
                    }
                    .activity_svg{
                        margin-right: .25rem;
                    }
                }
            }
            .confirm_filter{
                display: flex;
                width: 100%;
                padding: .3rem .2rem;
                background-color: #f1f1f1;
                .filter_button_style{
                    @include wh(50%, 1.8rem);
                    line-height: 1.8rem;
                    font-size: .8rem;
                    border-radius: .2rem;
                }
                .clear_all{
                    margin-right: .5rem;
                    border: 0.025rem solid #fff;
                    background-color: #fff;
                }
                .confirm_select{
                    border: 0.025rem solid #56d176;
                    background-color: #56d176;
                    color: #fff;
                    span{
                        color: #fff;
                    }
                }
            }
        }
    }
    .back_cover{
        position: fixed;
        @include wh(100%, 100%);
        z-index: 10;
        background-color: rgba(0, 0, 0, .3);
    }
    .shop_list_container{
        .shoplist_container{
            margin-bottom: 0;
        }
    }

    .showlist-enter-active, .showlist-leave-active{
        transition: all .3s;
        transform: translateY(0);
    }
    .showlist-enter, .showlist-leave-active{
        opacity: 0;
        transform: translateY(-100%);
    }
    .showCover-enter-active, .showCover-leave-active{
        transition: opacity .3s;
    }
    .showCover-enter, .showCover-leave-active{
        opacity: 0;
    }
</style>
<template>
    <section class="cart_module">
        <section v-if="!food.specifications.length" class="cart_button">
            <transition name="showReduce">
                <span v-if="foodNum" @click="removeOutCart(food.category_id, food.item_id, food.specfoods[0].food_id, food.specfoods[0].name, food.specfoods[0].price, '', food.specfoods[0].packing_fee, food.specfoods[0].sku_id, food.specfoods[0].stock)">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </span>
            </transition>
            <transition name="fade">
                <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
            </transition>
            <svg class="add_icon" @touchstart="addToCart(food.category_id, food.item_id, food.specfoods[0].food_id, food.specfoods[0].name, food.specfoods[0].price, '', food.specfoods[0].packing_fee, food.specfoods[0].sku_id, food.specfoods[0].stock, $event)">
                <use xmlns:xlink="http://www.w3.org/1999/svg" xlink:href="#cart-add"></use>
            </svg>
        </section>
        <section class="choose_specification" v-else>
            <section class="choose_icon_container">
                <transition name="showReduce">
                    <svg v-if="foodNum" class="specs_reduce_icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                    </svg>
                </transition>
                <transition name="fade">
                    <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
                </transition>
                <span class="show_chooseList" @click="showChooseList(food)">选规格</span>
            </section>
        </section>
    </section>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                showMoveDot: [],
            }
        },
        computed: {
            ...mapState([
                'cartList'
            ]),
            shopCart: function() {
                return Object.assign({}, this.cartList[this.shopId]);
            },
            foodNum: function() {
                let category_id = this.food.category_id;
                let item_id = this.food.item_id;
                if (this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]) {
                    let num = 0;
                    Object.values(this.shopCart[category_id][item_id]).forEach((item, index) => {
                        num += item.num;
                    });
                    return num;
                } else {
                    return 0;
                }
            }
        },
        props: ['food', 'shopId'],
        methods: {
            ...mapMutations([
                'ADD_CART', 'REDUCE_CART',
            ]),
            addToCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, event) {
                this.ADD_CART({shopId: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
                let elLeft = event.target.getBoundingClientRect().left;
                let elBottom = event.target.getBoundingClientRect().bottom;
                this.showMoveDot.push(true);
            },
            removeOutCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
                if (this.foodNum > 0) {
                    this.REDUCE_CART({shopId: this.shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock});
                }
            },
            showChooseList(foodScroll){
                this.$emit('showChooseList', foodScroll);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';
    .cart_module{
        .add_icon{
            position: relative;
            z-index: 199;
        }
        .cart_button{
            display: flex;
            align-items: center;
        }
        svg{
            @include wh(.9rem, .9rem);
            fill: #3190e8;
        }
        .specs_reduce_icon{
            fill: #999;
        }
        .cart_num{
            @include sc(.65rem, #666);
            min-width: 1rem;
            text-align: center;
            font-family: Helvetica Neue,Tahoma;
        }
        .choose_specification{
            .choose_icon_container{
                display: flex;
                align-items: center;
                .show_chooseList{
                    display: block;
                    padding: .1rem .2rem;
                    border: 1px solid $blue;
                    border-radius: 0.2rem;
                    background-color: $blue;
                    @include sc(.55rem, #fff);
                }
            }
        }
    }
    .showReduce-enter-active, .showReduce-leave-active{
        transition: all .3s ease-out;
    }
    .showReduce-enter, .showReduce-leave-active{
        opacity: 0;
        transform: translateX(1rem);
    }
    .fade-enter-active, .fade-leave-active{
        transition: all .3s;
    }
    .fade-enter, .fade-leave-active{
        opacity: 0;
    }
</style>
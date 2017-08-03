<template>
    <div class="food_container">
        <head-top :head-title="headTitle" goBack="true"></head-top>
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
            }
        },
        created() {

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
            ])
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

</style>
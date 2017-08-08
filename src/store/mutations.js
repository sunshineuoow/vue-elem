import {
	RECORD_ADDRESS,
	ADD_CART,
	REDUCE_CART,
	INIT_BUYCART,
	CLEAR_CART,
	RECORD_SHOPDETAIL,
	RECORD_USERINFO,
	GET_USERINFO,
	CONFIRM_REMARK,
	CONFIRM_INVOICE,
	CHOOSE_SEARCH_ADDRESS,
	SAVE_GEOHASH,
	CONFIRM_ADDRESS,
	CHOOSE_ADDRESS,
	NEED_VALIDATION,
	SAVE_CART_ID_SIG,
	SAVE_ORDER_PARAM,
	CHANGE_ORDER_PARAM,
	ORDER_SUCCESS,
	SAVE_SHOPID,
	SAVE_ORDER,
	OUT_LOGIN,
	RETSET_NAME,
	SAVE_AVANDER,
	SAVE_ADDRESS,
	SAVE_ADDDETAIL,
	SAVE_QUESTION,
	ADD_ADDRESS,
	BUY_CART,
} from './mutation-types.js'

import {setStore, getStore} from '../config/mUtils'

import {localapi, proapi} from '../config/env'

export default {
	// 记录当前经纬度
	[RECORD_ADDRESS](state, {
		latitude,
		longitude
	}) {
		state.latitude = latitude;
		state.longitude = longitude;
	},

	[RECORD_SHOPDETAIL](state, detail) {
		state.shopDetail = detail
	},
	//获取用户信息
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.username !== 
			info.username)) {
			return;
		}
		if (!state.login) {
			return;
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
	//保存geohash
	[SAVE_GEOHASH](state, geohash) {
		state.geohash = geohash;
	},
	//加入购物车
	[ADD_CART](state, {
		shopId,
		category_id,
		item_id,
		food_id,
		name,
		price,
		specs,
		packing_fee,
		sku_id,
		stock
	}) {
		let cart = state.cartList;
		let shop = cart[shopId] = (cart[shopId] || {});
		let category = shop[category_id] = (shop[category_id] || {});
		let item = category[item_id] = (category[item_id] || {});
		if (item[food_id]) {
			item[food_id]['num']++;
		} else {
			item[food_id] = {
				"num": 1,
				"id": food_id,
				"name": name,
				"price": price,
				"specs": specs,
				"packing_fee": packing_fee,
				"sku_id": sku_id,
				"stock": stock
			};
		}
		state.cartList = {...cart};
		setStore('buyCart', state.cartList);
	},
	//移出购物车
	[REDUCE_CART](state, {
		shopId,
		category_id,
		item_id,
		food_id,
		price,
		specs
	}) {
		let cart = state.cartList;
		let shop = (cart[shopId] || {});
		let category = (shop[category_id] || {});
		let item = (category[item_id] || {});
		if (item && item[food_id]) {
			if (item[food_id]['num'] > 0) {
				item[food_id]['num']--;
				state.cartList = {...cart};
				setStore('buyCart', state.cartList);
			} else {
				item[food_id] = null;
			}
		}
	},
	//网页初始化时从本地获取购物车信息
	[INIT_BUYCART](state) {
		let initCart = getStore('buyCart');
		if (initCart) {
			state.cartList = JSON.parse(initCart);
		}
	},
	//清空当前商店购物车
	[CLEAR_CART](state, shopId) {
		state.cartList[shopId] = null;
		state.cartList = {...state.cartList};
		setStore('buyCart', state.cartList);
	},
	//记录用户信息
	[RECORD_USERINFO](state, info){
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.user_id);
	},
	//获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) return;
		if (!state.login) return;
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
	},
	//修改用户名
	[RETSET_NAME](state, username) {
		state.userInfo = Object.assign({}, state.userInfo, {username});
		
	},
	//退出登录
	[OUT_LOGIN](state) {
		state.userInfo = {};
		state.login = false;
	},
	//保存图片
	[SAVE_AVANDER](state, imgPath) {
		state.imgPath = imgPath;
	},
	//下单成功
	[ORDER_SUCCESS](state, order) {
		state.cartPrice = null;
		state.orderMessage = order;
	},
	//会员卡价格保存
	[BUY_CART](state, price) {
		state.cartPrice = price;
	},
	//保存问题详情
	[SAVE_QUESTION](state, question) {
		state.question = {...question};
	},
}
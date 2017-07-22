import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

/**
 * 获取首页默认地址
 */

export const cityGuess = () => fetch('/v1/cities', {
	type: 'guess'
});

/**
 * 获取首页热门城市
 */
export const hotcity = () => fetch('/v1/cities', {
	type: 'hot'
});

/**
 * 获取所有城市
 */
export const groupcity = () => fetch('/v1/cities', {
	type: 'group'
})

/**
 * 获取用户信息
 */
export const getUser = () => fetch('/v1/user', {user_id: getStore('user_id')
});

/**
 * 获取地址列表
 */
export const getAddress = (id, sig) => fetch('/v1/carts' + id + '/addresses', {
	sig
});

/**
 * 获取当前所在城市
 */
export const currentcity = number => fetch('/v1/cities/' + number);

/**
 * 获取搜索地址
 */
export const searchplace = (cityid, value) => fetch('/v1/pois', {
	type:'search',
	city_id: cityid,
	keyword: value
})
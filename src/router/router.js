import App from '../App'

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home');
const city = r => require.ensure([], () => r(require('../pages/city/city')), 'city');
const msite = r => require.ensure([], () => r(require('../pages/msite/msite')), 'msite');
const search = r => require.ensure([], () => r(require('../pages/search/search')), 'search');
const shop = r => require.ensure([], () => r(require('../pages/shop/shop')), 'shop');
const foodDetail = r => require.ensure([], () => r(require('../../pages/shop/children/foodDetail')), 'foodDetail');
const shopDetail = r => require.ensure([], () => r(require('../../pages/shop/children/shopDetail')), 'shopDetail');


export default [{
	path: '/',
	component: App,
	children: [
		//地址为空时跳转Home页
		{
			path: '',
			redirect: '/home'
		},
		//城市列表首页
		{
			path: '/home',
			component: home
		},
		//当前选择城市页
		{
			path: '/city/:cityid',
			component: city
		},
		//所有商铺页面表
		{
			path: '/msite',
			component: msite,
			meta: { keepAlive: true },
		},
		//搜索页
		{
			path: '/search/:geohash',
			component: search
		},
		//商铺详情页
		{
			path: '/shop',
			component: shop,
			children: [
				{
					path: 'foodDetail',
					component: foodDetail
				},
				{
					path: 'shopDetail',
					component: shopDetail
				}
			]
		}
	]
}]
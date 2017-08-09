import App from '../App'

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home');
const city = r => require.ensure([], () => r(require('../pages/city/city')), 'city');
const msite = r => require.ensure([], () => r(require('../pages/msite/msite')), 'msite');
const search = r => require.ensure([], () => r(require('../pages/search/search')), 'search');
const shop = r => require.ensure([], () => r(require('../pages/shop/shop')), 'shop');
const foodDetail = r => require.ensure([], () => r(require('../pages/shop/children/foodDetail')), 'foodDetail');
const shopDetail = r => require.ensure([], () => r(require('../pages/shop/children/shopDetail')), 'shopDetail');
const shopSafe = r => require.ensure([], () => r(require('../pages/shop/children/children/shopSafe')), 'shopSafe');
const food = r => require.ensure([], () => r(require('../pages/food/food')), 'food');
const login = r => require.ensure([], () => r(require('../pages/login/login')), 'login');
const profile = r => require.ensure([], () => r(require('../pages/profile/profile')), 'profile');
const info = r => require.ensure([], () => r(require('../pages/profile/children/info')), 'info');
const setusername = r => require.ensure([], () => r(require('../pages/profile/children/setusername')), 'setusername');
const address = r => require.ensure([], () => r(require('../pages/profile/children/children/address')), 'address');
const add = r => require.ensure([], () => r(require('../pages/profile/children/children/children/add')), 'add');
const balance = r => require.ensure([], () => r(require('../pages/balance/balance')), 'balance');
const balanceDetail = r => require.ensure([], () => r(require('../pages/balance/children/balanceDetail')), 'balanceDetail');
const benefit = r => require.ensure([], () => r(require('../pages/benefit/benefit')), 'benefit');
const hbDescription = r => require.ensure([], () => r(require('../pages/benefit/children/hbDescription')), 'hbDescription');
const coupon = r => require.ensure([], () => r(require('../pages/benefit/children/coupon')), 'coupon');
const hbHistory = r => require.ensure([], () => r(require('../pages/benefit/children/hbHistory')), 'hbHistory');
const exchange = r => require.ensure([], () => r(require('../pages/benefit/children/exchange')), 'exchange');
const commend = r => require.ensure([], () => r(require('../pages/benefit/children/commend')), 'commend');
const points = r => require.ensure([], () => r(require('../pages/points/points')), 'points');
const pointsDetail = r => require.ensure([], () => r(require('../pages/points/children/detail')), 'pointsDetail');
const vipcard = r => require.ensure([], () => r(require('../pages/vipcard/vipcard')), 'vipcard');
const vipDescription = r => require.ensure([], () => r(require('../pages/vipcard/children/vipDescription')), 'vipDescription');
const useCart =  r => require.ensure([], () => r(require('../pages/vipcard/children/useCart')), 'useCart');
const invoiceRecord = r => require.ensure([], () => r(require('../pages/vipcard/children/invoiceRecord')), 'invoiceRecord');
const service = r => require.ensure([], () => r(require('../pages/service/service')), 'service');
const questionDetail = r => require.ensure([], () => r(require('../pages/service/children/questionDetail')), 'questionDetail');
const download = r => require.ensure([], () => r(require('../pages/download/download')), 'download');

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
			meta: {
				keepAlive: true
			},
		},
		//特色商铺列表页
		{
			path: '/food',
			component: food
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
			children: [{
				path: 'foodDetail',
				component: foodDetail
			}, {
				path: 'shopDetail',
				component: shopDetail,
				children: [{
					path: 'shopSafe',
					component: shopSafe
				}]
			}]
		},
		//登录注册页
		{
			path: '/login',
			component: login
		},
		//个人信息页
		{
			path: '/profile',
			component: profile,
			children: [
				{
					path: 'info',
					component: info,
					children: [
						{
							path: 'address',
							component: address,
							children: [
								{
									path: 'add',
									component: add
								}
							]
						}
					]
				},
				{
					path: 'setusername',
					component: setusername
				}
			]
		},
		//余额
		{
			path: '/balance',
			component: balance,
			children: [{
				path: 'detail',
				component: balanceDetail
			}]
		},
		//优惠页
		{
			path: '/benefit',
			component: benefit,
			children: [
				{
					path: 'hbDescription',
					component: hbDescription
				},
				{
					path: 'coupon',
					component: coupon
				},
				{
					path: 'hbHistory',
					component: hbHistory
				},
				{
					path: 'exchange',
					component: exchange
				},
				{
					path: 'commend',
					component: commend
				}
			]
		},
		//积分
		{
			path: '/points',
			component: points,
			children: [{
				path: 'detail',
				component: pointsDetail
			}]
		},
		//vip卡页
		{
			path: '/vipcard',
			component: vipcard,
			children:[
				{
					path: 'vipDescription',
					component: vipDescription
				},
				{
					path: 'useCart',
					component: useCart
				},
				{
					path: 'invoiceRecord',
					component: invoiceRecord
				}
			]
		},
		//服务页
		{
			path: '/service',
			component: service,
			children: [{
				path: 'questionDetail',
				component: questionDetail
			},]
		},
		//下载页
		{
			path: '/download',
			component: download,
		}
	]
}]
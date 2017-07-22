import App from '../App'

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../pages/city/city')), 'city')
const msite = r => require.ensure([], () => r(require('../pages/msite/msite')), 'msite')

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
	]
}]
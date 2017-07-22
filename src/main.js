// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store'
import {routerMode} from './config/env'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './config/rem'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper)
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
			return { x: 0, y: to.meta.savedPosition || 0}
		}
	}
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
}).$mount('#app')

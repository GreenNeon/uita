import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import { isEmptyObject, LazyImport } from '../utils/common.js'
import { Logout } from '../utils/net'
import Cookies from 'js-cookie'
import DashboardURL from './Dashboard'
import ErrorURL from './Error'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name:"beranda",
		component: LazyImport('Beranda.vue'),
	},
	{
		path: '/login',
		component: LazyImport('Login.vue'),
	},
	{
		path: '/blog/:id',
		component: LazyImport('Blog.vue'),
	},
	{
		path: '/informasi/siswa',
		component: LazyImport('Orangtua.vue'),
	},
	DashboardURL,
	...ErrorURL
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.afterEach((to, from) => {
	let rModule = from.meta.module
	if (!isEmptyObject(rModule)) {
		if (from.meta.type === 'view' && to.meta.type !== 'edit') store.dispatch(`${rModule}/ClearForm`)
		else if (from.meta.type === 'edit' && to.meta.type !== 'edit') store.dispatch(`${rModule}/ClearForm`)
	}
})

router.beforeEach((to, from, next) => {
	let ContentLoad = to.matched.some(m => m.meta.loading === 'content')
	if (ContentLoad && to.name != from.name) {
		console.warn("loading!!")
		store.dispatch('Base/ToggleLoading', { value: true, page: false })
	}

	let tLogin = to.meta.login || false
	if (to.path === '/logout') Logout()
	else if (to.path === '/login') {
		let token = Cookies.get('millenia_access')
		if (isEmptyObject(token)) next()
		else {
			let role = store.getters['Base/USER'].role
			if(role !== 'OR') next('/dashboard')
			else next('/informasi/siswa')
		}
	}
	else {
		let token = Cookies.get('millenia_access')
		if (isEmptyObject(token) && tLogin) next('/login')
		else next()
	}
})

export default router

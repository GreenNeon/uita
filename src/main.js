import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

import(/* webpackChunkName: "inklinecss" */ "@inkline/inkline/dist/inkline.css")
import(/* webpackChunkName: "formulatecss" */"./assets/formulate.css")
import(/* webpackChunkName: "vselectcss" */ 'vue-select/dist/vue-select.css')
import( /* webpackChunkName: "notycss" */ "./assets/noty.css")
import(/* webpackChunkName: "notythemecss" */"./assets/noty-sunset.css")
import(/* webpackChunkName: "eventcss" */"./assets/event.css")

import Inkline from '@inkline/inkline'
Vue.use(Inkline)

import Vuebar from 'vuebar'
Vue.use(Vuebar)

import Noty from "noty" /* webpackChunkName: "noty" */
Noty.overrideDefaults({
	layout: 'topRight',
	theme: 'sunset',
	timeout: 1800
})

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

import VueFormulate from '@braid/vue-formulate'
import AutoComplete from './components/Form/Autocomplete.vue'
Vue.component('AutoComplete', AutoComplete)
Vue.use(VueFormulate, {
	library: {
		autocomplete: {
			classification: 'text',
			component: 'AutoComplete',
			props: [ 'loading' ]
		}
	},
	locales: {
		en: {
			required ({ name }) {
				return `Data ${name} diperlukan..`
			},
			date () {
				return `Masukan dalam bentuk tanggal..`
			}
		}
	}
})

//* Load cookies
try {
	let token = Cookies.get('millenia_access') || ''
	let user64 = token.split('.')[ 1 ]
	store.dispatch('Base/SetUser', JSON.parse(atob(user64)))
} catch (error) {
	store.dispatch('Base/SetUser', {})
}

//* Global Variable
Vue.prototype.$dashboard_u = '/informasi/siswa'
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

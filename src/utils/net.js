import axios from 'axios'
import Cookies from 'js-cookie'
import Noty from 'noty'
import router from '../router'
import store from '../store'
import { isEmptyObject } from './common'
// const OPT_SEARCH = '_like'
// const OPT_LIMIT = '_limit'
// const OPT_FILTER = '_filter'
// const OPT_FILTER_ORD = '_order'
// const OPT_FILTER_INC = '_includes'
// const OPT_FILTER_SYM = '_symbol'
// const PRT_TEXT = '_text'
// const PRT_COL = '_columns'
// const PRT_TYPE = '_type'

const apicall = axios.create({
	baseURL: 'http://localhost:8000/api/',
	timeout: 3000,
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + Cookies.get('millenia_access'),
		common: {
			Authorization: 'Bearer ' + Cookies.get('millenia_access')
		}
	}
})

function CatchError (error) {
	let retError = {
		data: {
			data: []
		}, code: 'CL001', message: error.message ?? error.request ?? 'Unknown error ...'
	}
	if (error.response) {
		if (error.response.status === 401) {
			SetToken()
			router.push('/login')
		} else {
			new Noty({ text: `Error server, ${error.response.data.message} !!`, type: 'warning' })
		}
		retError = { ...retError, ...error.response.data }
	} else if (error.request) {
		new Noty({ text: `Error pada jaringan internet anda. Harap muat ulang halaman!!`, type: 'warning' })
	} else {
		// Something happened in setting up the request that triggered an Error
		new Noty({ text: `Error browser, ${error.message}!!`, type: 'warning' })
	}
	return retError
}

// function GetToken () {
// 	apicall.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + Cookies.get('millenia_access')
// }
function SetToken (token = null) {
	if (isEmptyObject(token)) {
		store.dispatch('Base/SetUser', {})
		Cookies.remove('millenia_access', { expires: 7, sameSite: 'strict' })
		delete apicall.defaults.headers.common[ 'Authorization' ]
		delete apicall.defaults.headers.Authorization
	}
	else {
		let user64 = token.split('.')[ 1 ]
		store.dispatch('Base/SetUser', JSON.parse(atob(user64)))
		Cookies.set('millenia_access', token, { expires: 7, sameSite: 'strict' })
		apicall.defaults.headers.common[ 'Authorization' ] = 'Bearer ' + Cookies.get('millenia_access')
		apicall.defaults.headers.Authorization = 'Bearer ' + Cookies.get('millenia_access')
	}
}
async function GETTable (route, container) {
	let params = {
		_like: {},
		_filter: {},
		_with: {},
		...container
	}
	if (isEmptyObject(params._like)) delete params._like
	if (isEmptyObject(params._filter)) delete params._filter
	if (isEmptyObject(params._with)) delete params._with
	delete params.total

	return apicall.get(route, {
		params: params,
		responseType: 'json'
	}).then(response => {
		if (response.data.meta) {
			let meta = response.data.meta
			let page = parseInt(meta.current_page)
			if (page > parseInt(meta.last_page)) page = 1
			let newMeta = {
				page: page,
				total: parseInt(meta.total),
				_limit: parseInt(meta.per_page)
			}
			response.data.meta = newMeta
		}
		return response
	}).catch(CatchError)
}

async function GETData (route) {
	return apicall.get(route, {
		responseType: 'json'
	}).then(response => response).catch(CatchError)
}

async function Search (route, { value, column }, _filter = {}, _with = {}) {
	let filter = { ..._filter }
	return apicall.get(route, {
		params: {
			..._with,
			_like: {
				_text: value,
				_columns: [ column ]
			},
			...filter
		},
		responseType: 'json'
	}).then(response => response).catch(CatchError)
}

async function CustomGET (route, params) {
	return apicall.get(route, { baseURL: "", params }).then(response => response).catch(CatchError)
}

async function POSTData (route, container) {
	return apicall.post(route, {
		...container
	}).then(response => response).catch(CatchError)
}

async function PATCHData (route, container) {
	return apicall.patch(route, {
		...container
	}).then(response => response).catch(CatchError)
}

async function DELData (route, data = {}) {
	return apicall.delete(route, { data: data }).then(response => response).catch(CatchError)
}

async function UPFile (route, formData) {
	return apicall.post(route, formData).then(response => response).catch(CatchError)
}

async function Login (form) {
	return apicall.post('/login', form).then((res) => {
		if (res.status < 400) {
			SetToken(res.data.access_token)
		} else {
			SetToken()
		}
		return res
	}).catch((error) => {
		let retError = {
			data: {
				data: []
			}, code: 'CL002', message: error.message ?? error.request ?? 'Unknown error ...'
		}
		if (error.response) {
			retError = {
				...retError, ...error.response.data,
				status: error.response.status
			}
			new Noty({ text: `Error server, ${error.response.data.message} !!`, type: 'warning' })
		} else if (error.request) {
			new Noty({ text: `Error pada jaringan internet anda. Harap muat ulang halaman!!`, type: 'warning' })
		} else {
			// Something happened in setting up the request that triggered an Error
			new Noty({ text: `Error browser, ${error.message}!!`, type: 'warning' })
		}
		return retError
	})
}

async function Logout () {
	return apicall.post('/auth/logout').then((res) => {
		SetToken()
		router.push('/login')
		return res
	}).catch(CatchError)
}

export { GETTable, GETData, POSTData, DELData, PATCHData, Search, UPFile, CustomGET, Login, Logout }
import { GETTable, GETData, POSTData, DELData, PATCHData } from "../../utils/net"
export default {
	actions: {
		SetItems (context) {
			context.commit('SET_LOADING', true)
			context.commit('SET_ITEMS', [])

			GETTable('pegawai', context.state.Meta).then((response) => {
				context.commit('SET_META', response.data.meta ?? [])
				context.commit('SET_ITEMS', response.data.data)
				context.commit('SET_LOADING', false)

			})
		},
		async SetItem (context, id) {
			context.commit('SET_LOADING', true)
			return GETData(`pegawai/${id}`).then((response) => {
				context.commit('SET_FORM', response.data.data)
				context.commit('SET_LOADING', false)
				return true
			})
		},
		SetOptions (context, container = {}) {
			context.commit('SET_META', container)
			context.dispatch('SetItems')
		},
		SetSelected (context, value) {
			let selecteds = context.state.Selecteds
			for (let i = 0; i < context.state.Meta._limit; i++) {
				const element = context.state.Items[ i ]
				let id = selecteds.findIndex(id => id === element.id)
				if (value[ i ]) {
					if (id < 0) selecteds.push(element.id)
				}
				else {
					if (id > -1) selecteds.splice(id, 1)
				}
			}
			context.commit('SET_SELECTEDS', selecteds)
		},
		CancelSelected (context) {
			context.commit('SET_SELECTEDS', [])
		},
		SetForm (context, container) {
			context.commit('SET_FORM', container)
		},
		ClearForm (context) {
			context.commit('CLEAR_FORM')
		},
		async PostForm (context) {
			context.commit('SET_LOADING', true)

			return POSTData('pegawai', context.state.Form).then((response) => {
				context.commit('SET_LOADING', false)
				if (response.status < 400) context.commit('CLEAR_FORM')
				return response
			})
		},
		async PatchForm (context, id) {
			context.commit('SET_LOADING', true)

			return PATCHData(`pegawai/${id}`, context.state.Form).then((response) => {
				context.commit('SET_LOADING', false)
				if (response.status < 400) context.commit('CLEAR_FORM')
				return response
			})
		},
		async DeleteItem (context, id = -1) {
			context.commit('SET_LOADING', true)
			let data = {}
			if (context.state.Selecteds.length > 0) {
				data = { id: context.state.Selecteds }
			}

			return DELData(`pegawai/${id}`, data).then(response => {
				context.commit('SET_LOADING', false)
				if (response.status < 400) {
					let page = context.state.Meta.page
					let isAll = context.getters.GET_SELECTED.every(el => el === true)
					if (page > 1 && isAll) page -= 1
					context.dispatch('SetOptions', {page: page})
					return true
				}
				return false
			})
		},
		GET_CLEAN_FORM (context) {
			let forms = { ...context.state.Form }
			delete forms[ 'gender' ]
			delete forms[ 'id' ]
			delete forms[ 'profile_url' ]
			return (forms)
		}
	},
	getters: {
		IS_LOADING (state) {
			return state.Loading
		},
		GET_OBJ_SELECTED (state) {
			let ids = []
			state.Items.forEach(element => {
				if (state.Selecteds.findIndex(row => row === element.id) > -1) ids.push(element)
			})
			return ids
		},
		GET_SELECTED (state) {
			let ids = []
			state.Items.forEach(element => {
				if (state.Selecteds.findIndex(row => row === element.id) > -1) ids.push(true)
				else ids.push(false)
			})
			return ids
		},
		IS_MULTI_SELECT (state) {
			return (state.Selecteds.length > 0)
		},
		COUNT_SELECTED (state) {
			return state.Selecteds.length
		},
		GET_FORM (state) {
			return state.Form
		}
	}
}
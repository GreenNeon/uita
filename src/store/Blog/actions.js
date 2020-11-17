import { GETTable, GETData, POSTData, DELData, PATCHData } from "../../utils/net"
export default {
	actions: {
		SetItems (context) {
			context.commit('SET_LOADING', true)
			context.commit('SET_ITEMS', [])

			GETTable('blog', context.state.Meta).then((response) => {
				context.commit('SET_META', response.data.meta ?? [])
				context.commit('SET_ITEMS', response.data.data)
				context.commit('SET_LOADING', false)

			})
		},
		async SetItem (context, id) {
			context.commit('SET_LOADING', true)
			return GETData(`blog/${id}`).then((response) => {
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

			return POSTData('blog', context.state.Form).then((response) => {
				context.commit('SET_LOADING', false)
				if (response.status < 400) context.commit('CLEAR_FORM')
				return response
			})
		},
		async PatchForm (context, id) {
			context.commit('SET_LOADING', true)

			return PATCHData(`blog/${id}`, context.state.Form).then((response) => {
				context.commit('SET_LOADING', false)
				if (response.status < 400) context.commit('CLEAR_FORM')
				return response
			})
		},
		async DeleteItem (context, id) {
			context.commit('SET_LOADING', true)
			return DELData(`blog/${id}`).then(response => {
				context.commit('SET_LOADING', false)
				if (response.status < 400) {
					context.dispatch('SetOptions')
					return true
				}
				return false
			})
		},
		GET_CLEAN_FORM (context) {
			let forms = { ...context.state.Form }
			delete forms[ 'foto' ]
			return (forms)
		}
	},
	getters: {
		IS_LOADING (state) {
			return state.Loading
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
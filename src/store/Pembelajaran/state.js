export default {
	state: {
		Items: [],
		Selecteds: [],
		Meta: {
			_limit: 5,
			_like: {
				_text: "",
				_columns: []
			},
			_filter: {
				_order: [],
				_includes: [],
				_symbol: []
			}
		},
		Form: {},
		Update: false,
		Selected: {},
		Loading: false
	},
	mutations: {
		SET_ITEMS (state, value) {
			state.Items = value
		},
		ADD_ITEMS (state, items) {
			let len = items.length
			let len_old = state.Items.length
			let page_old = len_old / len
			let page = state.Meta.page

			if (page < page_old) {
				// ada diantara page sebelumnya
				// slice antara 0 - awal page baru
				let len_before = (len * (page))
				let splited = state.Items.splice(0, len_before)

				splited.splice(len_before - len, len_before)
				splited.push(...items)
				state.Items.unshift(...splited)
			}
			else {
				// ada setelah page 1
				let len_before = (len * (page - 2))
				for (let i = 0; i < len_before; i++) state.Items.push(null)
				state.Items.push(...items)
			}

			for (let i = 0; i < state.Items.length; i++) {
				state.Selecteds.push(false)
			}
		},
		SET_META (state, value) {
			if (value._filter) value._filter = { ...state.Meta._filter, ...value._filter }
			state.Meta = { ...state.Meta, ...value }
		},
		SET_LOADING (state, value) {
			state.Loading = value
		},
		SET_SELECTEDS (state, value) {
			state.Selecteds = value
		},
		SET_FORM (state, value) {
			state.Form = { ...state.Form, ...value }
		},
		CLEAR_FORM (state) {
			state.Form = {
			}
		},
		SET_UPDATED (state, value) {
			state.Update = value
		}
	}
}
export default {
	state: {
		Items: {
			Pembelajaran: [],
			Kelas: []
		},
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
		Form: {
			nilai: 3
		},
		Update: false,
		Selected: {},
		Loading: false
	},
	mutations: {
		SET_ITEMS (state, value) {
			state.Items = { ...state.Items, ...value }
		},
		SET_LOADING (state, value) {
			state.Loading = value
		}
	}
}
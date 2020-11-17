export default {
	actions: {
		ToggleSidebar (context, value) {
			context.commit('SET_SIDEBAR_VIS', value)
		},
		ToggleLoading (context, container) {
			context.commit('SET_LOADING', container)
		},
		ToggleHead (context, value) {
			context.commit('SET_HEAD_VIS', value)
		},
		SetUser (context, value) {
			context.commit('SET_USER', value)
		}
	},
	getters: {
		LOADING_PAGE (state) {
			return state.Loading.Page
		},
		LOADING_CONTENT (state) {
			return state.Loading.Content
		},
		HEAD_VIS (state) {
			return state.HeadVisibility
		},
		USER (state) {
			return state.User
		}
	}
}
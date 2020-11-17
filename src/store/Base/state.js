export default {
	state: {
		SidebarVisibility: false,
		HeadVisibility: true,
		Loading: { Page: false, Content: false },
		User: {}
	},
	mutations: {
		SET_SIDEBAR_VIS (state, value) {
			state.SidebarVisibility = value
		},
		SET_HEAD_VIS (state, value) {
			state.HeadVisibility = value
		},
		SET_USER (state, value) {
			state.User = value
		},
		SET_LOADING (state, container) {
			if (container.page) state.Loading.Page = container.value
			else state.Loading.Content = container.value
		},
	}
}
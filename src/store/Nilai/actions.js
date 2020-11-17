import { GETTable } from "../../utils/net"
export default {
	actions: {
		SetPembelajaran (context) {
			context.commit('SET_LOADING', true)
			context.commit('SET_ITEMS', { Pembelajaran: [] })

			GETTable('pembelajaran', {_limit:'inf', _with: ['indikator']}).then((response) => {
				context.commit('SET_ITEMS', { Pembelajaran: response.data.data })
				context.commit('SET_LOADING', false)
			})
		},
		SetKelas (context) {
			context.commit('SET_LOADING', true)
			context.commit('SET_ITEMS', { Kelas: [] })

			GETTable('kelas', {_limit:'inf'}).then((response) => {
				context.commit('SET_ITEMS', { Kelas: response.data.data })
				context.commit('SET_LOADING', false)
			})
		}
	},
	getters: {
		IS_LOADING (state) {
			return state.Loading
		}
	}
}
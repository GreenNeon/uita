import state from './state'
import actions from './actions'
const Siswa = {
	namespaced: true,
	...state,
	...actions
}
export default Siswa

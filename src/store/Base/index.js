import state from './state'
import actions from './actions'
const Base = {
	namespaced: true,
	...state,
	...actions
}
export default Base

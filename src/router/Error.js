import { LazyImport } from '../utils/common.js'
export default [
	{
		path: '/er_403',
		component: LazyImport('403.vue', 'Errors'),
	},
	{
		path: '/er_404',
		component: LazyImport('404.vue', 'Errors'),
	},
	{
		path: '*',
		component: LazyImport('404.vue', 'Errors'),
	}
]
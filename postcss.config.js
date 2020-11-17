const IN_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
	plugins: [
		IN_PRODUCTION && require('cssnano')({
			preset: 'default',
		})
	],
}

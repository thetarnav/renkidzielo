'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
	lifecycles: {
		beforeCreate: async data => {
			data.views = 0
			data.popularity = 50
			data.dailyViews = [0, 0, 0]
			data.timestamp = Date.now()
			data.year = new Date().getFullYear()
		},
		// beforeUpdate: async (params, data) => {
		//   data.timestamp = data.timestamp || Date.now();
		// },
	},
}

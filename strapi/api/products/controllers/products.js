'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { gql } = require('graphql-request')
const { calcPop } = require('../services/products')

module.exports = {
	/**
	 * Update a record.
	 *
	 * @return {Object}
	 */

	async view(ctx) {
		const { entries } = ctx.request.body

		if (!Array.isArray(entries)) return false

		let serviceArray = []

		entries.forEach(entry =>
			serviceArray.push(strapi.services.products.view(...entry)),
		)

		return Promise.all(serviceArray)
	},
	async calcpop() {
		try {
			await strapi.services.products.calcPop()
			return {
				statusCode: 200,
			}
		} catch (error) {
			console.error(error)
			return {
				statusCode: 422,
				body: String(error),
			}
		}
	},
	async nextday() {
		console.log('--- NEXT DAY ---')
		const client = strapi.config.get('server.gqlClient'),
			query = gql`
				{
					products {
						id
						dailyViews
					}
				}
			`

		if (!client) return

		const { products } = await client.request(query),
			promiseArray = []

		products.forEach(({ id, dailyViews }) => {
			console.log(id, dailyViews)
			dailyViews = dailyViews ?? [0, 0, 0]
			const payload = {
				dailyViews: [0, dailyViews[0], dailyViews[1]],
			}

			promiseArray.push(strapi.query('products').update({ id }, payload))
		})

		try {
			await Promise.all(promiseArray)
			return {
				statusCode: 200,
			}
		} catch (error) {
			console.error(error)
			return {
				statusCode: 422,
				body: String(error),
			}
		}
	},
}

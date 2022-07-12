'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */

const { gql } = require('graphql-request')

module.exports = {
	async view(id, amount = 1) {
		if (!id || typeof amount !== 'number') return false
		const entry = await strapi.query('products').findOne({ id })
		if (!entry) return false
		const { dailyViews, views } = entry,
			[t, y, yy] = dailyViews || [0, 0, 0]

		return await strapi
			.query('products')
			.update(
				{ id },
				{ views: views + amount, dailyViews: [t + amount, y, yy] },
			)
	},
	async calcPop() {
		console.log('---POP COUNT---')
		const client = strapi.config.get('server.gqlClient'),
			query = gql`
				{
					products {
						id
						timestamp
						views
						dailyViews
					}
				}
			`,
			arrayAvg = inputArray =>
				inputArray.reduce((t, n) => n + t) / inputArray.length,
			popularity = (views, age, avgViews, allAvgViews) => {
				const AgeDays = age / 8.64e7,
					newEasing = t => 1 - t * t,
					STEADY = views / AgeDays,
					TREND = Math.max(1, avgViews / allAvgViews || 0),
					NEW = AgeDays < 7 ? newEasing(AgeDays / 7) * 100 : 0

				// logs.push(
				// 	`Days: ${AgeDays}, STEADY: ${STEADY}, TREND: ${TREND}, NEW: ${NEW}, rounded: ${roundNumber(
				// 		STEADY * TREND + NEW,
				// 		2,
				// 	)}`,
				// )
				return roundNumber(STEADY * TREND + NEW, 2)
			}

		if (!client) return

		const { products } = await client.request(query),
			promiseArray = []
		let allLastAvgViews = 0

		products.forEach(({ dailyViews }) => {
			allLastAvgViews += dailyViews ? arrayAvg(dailyViews) : 0
		})

		allLastAvgViews = allLastAvgViews / products.length

		const logs = []

		products.forEach(({ id, timestamp, views, dailyViews }) => {
			dailyViews = dailyViews ?? [0, 0, 0]
			const age = Date.now() - (timestamp || Date.now()),
				lastAvgViews = arrayAvg(dailyViews),
				pop = popularity(views, age, lastAvgViews, allLastAvgViews),
				payload = {
					popularity: pop,
				}

			// logs.push(
			// 	`${id} -> age: ${age}, avgViews: ${lastAvgViews}, pop: ${pop}`,
			// )

			promiseArray.push(strapi.query('products').update({ id }, payload))
		})

		// console.log(logs.join('\n'))

		try {
			await Promise.all(promiseArray)
		} catch (error) {
			console.error(error)
		}
	},
}

function roundNumber(num, scale) {
	if (!('' + num).includes('e')) {
		return +(Math.round(num + 'e+' + scale) + 'e-' + scale)
	} else {
		var arr = ('' + num).split('e')
		var sig = ''
		if (+arr[1] + scale > 0) {
			sig = '+'
		}
		return +(
			Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
			'e-' +
			scale
		)
	}
}

'use strict'

const { default: createStrapi } = require('strapi')

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#bootstrap
 */

const { GraphQLClient } = require('graphql-request')

module.exports = () => {
	const client = new GraphQLClient(
		process.env.NODE_ENV === 'development'
			? 'http://localhost:1337/graphql'
			: 'https://renkidzielo.herokuapp.com/graphql',
	)
	strapi.config.set('server.gqlClient', client, {
		headers: { authorization: `Bearer ${process.env.ADMIN_JWT}` },
	})
}

"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
   async increase(ctx) {
      const { entries } = ctx.request.body;
      if (!Array.isArray(entries) || entries.length <= 1) return false;

      let promiseArray = [];

      createPairs(entries).forEach((pair) =>
         promiseArray.push(increaseOne(pair))
      );

      return Promise.all(promiseArray);

      async function increaseOne(ids) {
         const results = await strapi.query("ties").find({
            _limit: 1,
            _where: [{ products_in: ids[0] }, { products_in: ids[1] }],
         });

         if (results.length > 0) {
            // Update
            const { id, value } = results[0];
            return strapi.query("ties").update({ id }, { value: value + 1 });
         } else {
            // Create
            return strapi.query("ties").create({ value: 1, products: ids });
         }
      }
   },
};

function createPairs(list) {
   const pairs = [];
   for (var i = 0; i < list.length - 1; i++) {
      for (var j = i; j < list.length - 1; j++) {
         pairs.push([list[i], list[j + 1]]);
      }
   }
   return pairs;
}

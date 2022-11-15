'use strict';

const fields = require('anxeb-mongoose').Fields;
const SchemaBuilder = require('../../middleware/schema');

module.exports = {
	Schema : function (params) {
		return new SchemaBuilder(params).build(function (required) {
			return {
				email    : fields.string({ required : required(1), index : true }),
				provider : fields.enum({ required : required(0) }, ['email', 'facebook', 'google', 'twitter', 'apple']),
				password : fields.string({ required : required(2) }),
				state    : fields.enum({ required : required(3) }, ['active', 'inactive', 'unconfirmed', 'removed']),
				date     : fields.number(),
				token    : fields.string(),
			};
		});
	}
};
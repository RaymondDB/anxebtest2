'use strict';

const fields = require('anxeb-mongoose').Fields;
const SchemaBuilder = require('../../middleware/schema');

module.exports = {
	Schema : function (params) {
		return new SchemaBuilder(params).build(function (required) {
			return {
				type   : fields.enum({ required : required(0) }, ['passport', 'license', 'personal', 'company']),
				number : fields.string({ required : required(1) }),
			};
		});
	}
};
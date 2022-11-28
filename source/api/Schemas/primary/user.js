'use strict';

const fields = require('anxeb-mongoose').Fields;
const SchemaBuilder = require('../../middleware/schema');
const LoginSchema = require('../common/login');
const Identity = require('../common/identity');
module.exports ={
    Schema: function(params){
        return new SchemaBuilder(params, 'User').build(function (req) {
    return {
       // id: fields.reference({ required: true }, 'User'),
        name: fields.string({ required: true }),
        last_name: fields.string({ required: true }),
        login: new LoginSchema.Schema({ required: true, static: true  }),
        type: fields.enum({ required: true }, ['admin', 'user', 'staff']),
        date: fields.number(),
        meta: fields.mixed(),
		phone: fields.string(),
        identity: new Identity.Schema({ required: true, static: true }),
    }
        });
}
}

/*module.exports = {
	Schema : function (params) {
		return new SchemaBuilder(params, 'User').build(function (required) {
			return {
				first_names : fields.string({ required : required(0) }),
				last_names  : fields.string({ required : required(1) }),
				identity    : new Identity.Schema({ required : required(2), static : true }),
				type        : fields.enum({ required : required(3) }, ['staff', 'member']),
				login       : new Login.Schema({ required : required(5), static : true }),
				info        : fields.mixed(),
				meta        : fields.mixed(),
				owner       : fields.mixed({ required : false }, {
					type   : fields.enum({ required : true }, ['Tenant']),
					entity : fields.reference({ required : true, dynamic : true }, 'owner.type'),
				}),
			};
		});
	}
};*/
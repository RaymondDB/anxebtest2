'use strict';

const User = require('../Schemas/primary/user');

module.exports = {
	collection : 'Users',
	schema     : new User.Schema(),
	methods    : {
		toClient : function () {
			return {
				id          : this._id,
				name		: this.name,
				last_name  : this.last_name,
				identity    : this.identity,
				type        : this.type,
				login       : { email : this.login.email, provider : this.login.provider, state : this.login.state, date : this.login.date }
			}
		},
		toMin    : function () {
			return {
				id          : this._id,
				first_names : this.first_names,
				last_names  : this.last_names,
				identity    : this.identity,
				type        : this.type,
				login       : { email : this.login.email, provider : this.login.provider, state : this.login.state, date : this.login.date }
			}
		}
	}
};
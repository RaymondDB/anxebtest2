'use strict';

const md5 = require("md5");

module.exports = function (context, user) {
	const _context = context;
	const _user = user;

	return {
		getSecret : async function () {
			if (_user.meta == null || _user.meta.secret == null) {
				_user.meta = _user.meta || {};
				_user.meta.secret = md5(`${_user._id.toString()}${_context.utils.getRandomPassword()}}`.toLowerCase());
				_user.markModified('meta');
				_user.persist();
			}

			return _user.meta.secret;
		}
	}
};
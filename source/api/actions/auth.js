'use strict';
const anxeb = require('anxeb-node');
const md5 = require('md5');
const ObjectId = require('anxeb-mongoose').ObjectId;

module.exports = {
	type    : anxeb.Route.types.action,
	access  : anxeb.Route.access.public,
	timeout : 60000,
	childs  : {
		user     : {
			methods : {
				post : async function (context) {
					let credentials = context.payload;

					let email = credentials.email ? credentials.email.trim() : null;
					if (email === null) {
						context.log.exception.invalid_request.throw();
					}

					let user = await getUserData({
						context : context,
						email   : email
					});

					if (!user) {
						context.log.exception.user_not_found.throw({ silent : true });
					} else {
						let login = user.login;

						let password = credentials.password ? credentials.password.trim() : null;
						let validated = password && password.length && (login.password === md5(password.trim().toLowerCase()));

						if (!validated) {
							context.log.exception.invalid_credentials.throw({ silent : true });
						}

						if (login.state === 'inactive') {
							context.log.exception.inactive_user.throw();
						}

						if (login.state === 'removed') {
							context.log.exception.removed_user.throw();
						}

						sendAuthResponse({
							context : context,
							user    : user
						});
					}
				}
			},
		},
		renew    : {
			access  : anxeb.Route.access.private,
			owners  : '*',
			roles   : '*',
			methods : {
				post : async function (context) {
					let body = context.bearer.auth.body;

					let user = await getUserData({
						context : context,
						id      : ObjectId(body.identity)
					});

					if (user == null) {
						context.log.exception.user_not_found.throw(context);
					}


					if (user.login.state === 'inactive') {
						context.log.exception.inactive_user.throw();
					}

					if (user.login.state === 'removed') {
						context.log.exception.removed_user.throw();
					}

					await sendAuthResponse({
						context : context,
						user    : user
					});
				}
			}
		},
		language : {
			access  : anxeb.Route.access.private,
			owners  : '*',
			roles   : '*',
			methods : {
				post : async function (context) {
					let body = context.bearer.auth.body;

					let user = await getUserData({
						context : context,
						id      : ObjectId(body.identity)
					});

					if (user == null) {
						context.log.exception.user_not_found.throw(context);
					}

					if (user.login.state === 'inactive') {
						context.log.exception.inactive_user.throw();
					}

					if (user.login.state === 'removed') {
						context.log.exception.removed_user.throw();
					}

					if (context.payload.language == null || context.payload.language.length === 2) {
						user.info = user.info || {};
						user.info.language = context.payload.code;
						user.markModified('info');
						user.persist();
						context.ok();
					} else {
						context.log.exception.invalid_request.throw();
					}
				}
			}
		},
		close    : {
			owners  : '*',
			roles   : '*',
			methods : {
				post : async function (context) {
					let body = context.bearer.auth.body;
					let user = await getUserData({
						context : context,
						id      : ObjectId(body.identity)
					});

					if (user.login.token != null) {
						user.login.token = null;
						user.persist();
					}
					context.ok();
				}
			}
		},
		tokenize : {
			access  : anxeb.Route.access.private,
			owners  : '*',
			roles   : '*',
			methods : {
				post : async function (context) {
					let body = context.bearer.auth.body;

					let user = await getUserData({
						context : context,
						id      : ObjectId(body.identity)
					});

					if (user == null) {
						context.log.exception.user_not_found.throw(context);
					}

					if (user.login.state === 'inactive') {
						context.log.exception.inactive_user.throw();
					}

					if (user.login.state === 'removed') {
						context.log.exception.removed_user.throw();
					}

					if (context.payload.token == null || context.payload.token === '') {
						user.login.token = null;
					} else {
						user.login.token = context.payload.token;
					}
					user.persist();
					context.ok();

				}
			}
		},
		remove   : {
			access  : anxeb.Route.access.private,
			owners  : '*',
			roles   : '*',
			methods : {
				post : async function (context) {
					let email = context.payload.email;

					if (email === null) {
						context.log.exception.invalid_request.throw(context);
					}

					let user = await context.data.find.User({
						_id           : ObjectId(context.payload.id),
						'login.email' : email
					});

					if (user == null || !user._id.equals(context.bearer.auth.body.identity)) {
						context.log.exception.user_not_found.throw(context);
					}

					user.login.state = 'removed';
					user.login.token = null;
					await user.persist();

					context.ok();
				}
			}
		}
	},
};

const getUserData = async function (params) {
	let context = params.context;
	let query = {};

	if (params.email != null) {
		query['login.email'] = params.email;
	} else if (params.id != null) {
		query._id = params.id;
	} else {
		return null;
	}

	return await context.data.find.User(query);
}

const sendAuthResponse = async function (params) {
	let context = params.context;
	let user = params.user;

	user.login.date = anxeb.utils.date.utc().unix();
	if (params.changes) {
		params.changes(user);
	}

	let $user = params.user.toClient();

	params.context.data.retrieve.User(user._id || user.id).then(function (user) {
		user.login.date = anxeb.utils.date.utc().unix();
		if (params.changes) {
			params.changes(user);
		}
		user.persist();
	}).catch(function (err) { });

	//TODO: Implementar permits
	let $roles = ['staff_admin'];

	if (context.query.only != null) {
		$roles = $roles.filter((item) => item.startsWith(context.query.only));
	}

	context.send({
		user     : $user,
		roles    : $roles,
		provider : $user.login.provider,
		token    : context.sign({
			user     : {
				id          : $user.id,
				first_names : $user.first_names,
				last_names  : $user.last_names,
				email       : $user.login.email,
				info        : $user.info,
				type        : $user.type,
			},
			identity : $user.id,
			claims   : [{ path : '/anxeb/container/*', method : 'GET' },],
			roles    : $roles,
			type     : $user.type,
		})
	});
}
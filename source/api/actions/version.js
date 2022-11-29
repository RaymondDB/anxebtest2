const anxeb = require('anxeb-node');

module.exports = {
	url: '/',
	access: anxeb.Route.access.public,
	timeout: 60000,
	methods: {
		get: function (context) {
			console.log(context.req.headers.authorization);
			console.log(context.bearer)
			console.log(context.bearer.auth.body.user);
			context.send(context.send("<span style='font-family: Verdana'><b>" + context.service.name + " "
				+ context.service.version + "</b><br>build " + context.service.server.version + "</span>"));
		}
	}
};

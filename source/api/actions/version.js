'use strict';
let anxeb = require('anxeb-node');

module.exports = {
	url     : '/',
	access  : anxeb.Route.access.public,
	timeout : 60000,
	methods : {
		get : function (context) {
			context.send({
				msg: 'Hello World',
				version: '1.0.0',				
				version : anxeb.version
			});
		}
	}
};

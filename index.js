'use strict';
require('dotenv').config();
require('anxeb-node').utils.moment.locale('es');
const Server = require('anxeb-node').Server;

let server = new Server({
	name        : 'Test',
	description : 'Testing',
	remark      : {
		key      : 'Running Environment',
		value    : process.env.NODE_ENV === 'production' ? 'Production Release' : 'Developement',
		asterisk : process.env.NODE_ENV === 'production'
	},
	key         : 'main',
	settings    : {
		root : __dirname,
		log  : {
			identifier : '[server_name]',
			stack      : process.env.NODE_ENV !== 'production',
			file       : '[logs_path]/[server_key]/[year]/[month_name]/[day].log'
		}
	},
	structure   : {
		services : '/services',
		source   : '/source',
		logs     : '/logs',
		keys     : '/keys',
		storage  : '/storage',
		configs  : '/configs'
	},
	extensions  : {
		mongoose : require('anxeb-mongoose')
	}
});

server.start();
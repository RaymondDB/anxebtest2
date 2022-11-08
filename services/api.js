'use strict';
const anxeb = require('anxeb-node');
const env = require(`../env`).api;

module.exports = {
	domain     : `{env.Socket.Host}`,
	name       : 'TestApi',
	version    : `v${require('../package').version}`,
	key        : 'api',
	active     : true,
	settings   : {
		log      : {
			identifier : '[service_name]',
			enabled    : true,
			stack      : process.env.NODE_ENV === 'development',
			file       : '[logs_path]/api/[year]/[month_name]/[day].log',
			events     : ['[source_path]/api/events']
		},
		socket   : env.socket,
		routing  : {
			routes  : '[source_path]/api/actions',
			cors    : env.socket.cors,
			upload  : true,
			parsers : {
				raw  : true,
				json : true,
				url  : true
			},
			context : {
				properties : {
					isStaffUser          : function (context) {
						return context.profile && context.profile.type === 'staff';
					},
					isStaffAdmin         : function (context) {
						return context.isStaffUser && context.profile.roles.some((item) => item === 'staff_admin');
					},
					utils : require('../source/api/middleware/utils'),
				},
				methods    : {
					sequencer : require('../source/api/middleware/sequencer')
					//smtp      : require('../source/api/middleware/smtp')(env.smtp),
				}
			}
		},
		renderer : {
			static : ['[source_path]/api/static']
		},
		storage  : {
			sub_folder : null
		},
		security : env.security,
		i18n     : {
			locales   : ['en', 'es'],
			directory : '[source_path]/api/locales',
			default   : process.env.Log_Lang || 'en',
			header    : 'accept-language'
		}
	},
	extensions : {
		mongoose : {
			connection : env.mongodb,
			models     : ['[source_path]/api/models']
		}
	},
	initialize : function (service, application) { }
};
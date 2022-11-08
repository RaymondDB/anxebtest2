'use strict';
let eventTypes = require('anxeb-node').Event.types;

module.exports = {
	new_password       : {
		message : 'Hola [0]. Tu nueva contraseña es: [1]',
		code    : 5002,
		type    : eventTypes.debug_log
	},
	smtp_email_sent    : {
		message : 'SMTP email to [0] successfully sent',
		code    : 5003,
		type    : eventTypes.debug_log
	},
	smtp_email_sending : {
		message : 'Sending email to [0]',
		code    : 5004,
		type    : eventTypes.debug_log
	}
};
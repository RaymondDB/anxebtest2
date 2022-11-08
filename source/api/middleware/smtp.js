'use strict';
const anxeb = require('anxeb-node');
const nodemailer = require('node4mailer');
const footer = '<br><br>' + 'Taskube' + '<div style="height: 40px; padding-top: 10px; margin-top: 16px; border-top:solid 1px #E6E6E6;"><img src="https://antares.intelipark.net/images/logos/logo-color.png" style="height: 40px"></div>';

module.exports = function (settings) {
	let _transporter = nodemailer.createTransport(settings);

	return function (context, params) {
		let $params = anxeb.utils.data.copy(params);
		$params.html += footer;
		if (!$params.from) {
			$params.from = settings.account;
		}

		return {
			send : function () {
				return new Promise(function (resolve, reject) {
					context.log.debug.smtp_email_sending.args($params.to).print();
					_transporter.sendMail($params, function (err, info) {
						if (err) {
							reject(err);
						} else {
							context.log.debug.smtp_email_sent.args(params.to).print();
							resolve(info);
						}
					});
				});
			}
		}
	};
}
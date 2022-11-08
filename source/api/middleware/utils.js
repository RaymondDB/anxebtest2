'use strict';

const crypto = require("crypto");
const anxeb = require("anxeb-node");

module.exports = function (context) {
	return {
		setDateRangeQuery : function (query) {
			const minutesOffset = context.req.headers['tz-offset'] != null ? parseInt(context.req.headers['tz-offset']) : 0;
			let $year = context.query.year && context.query.year.length > 0 ? parseInt(context.query.year) : null;
			let $month = context.query.month && context.query.month.length > 0 ? parseInt(context.query.month) : null;

			let from;
			let to;

			if ($year != null && $month != null) {
				let period = anxeb.utils.moment([$year, $month - 1]);
				from = anxeb.utils.moment(period).startOf('month');
				to = anxeb.utils.moment(period).endOf('month');
			} else if (context.query.date != null && context.query.date.length > 0) {
				from = anxeb.utils.moment.unix(parseInt(context.query.date)).utcOffset(minutesOffset).startOf('day');
				to = anxeb.utils.moment.unix(parseInt(context.query.date)).utcOffset(minutesOffset).endOf('day');
			} else if (context.query.today === 'true') {
				from = anxeb.utils.moment().utcOffset(minutesOffset).startOf('day');
				to = anxeb.utils.moment().utcOffset(minutesOffset).endOf('day');
			} else if (context.query.recent === 'true') {
				from = anxeb.utils.moment().utcOffset(minutesOffset).add(-24, 'hours');
				to = anxeb.utils.moment().utcOffset(minutesOffset).endOf('day');
			}

			if (from != null && to != null) {
				let fromTick = from.utc().unix();
				let toTick = to.utc().unix();
				query['dates.created'] = { "$gte" : fromTick, "$lt" : toTick };
			}
		},
		storeImages       : function (params) {
			return new Promise(function (resolve, reject) {
				if (params.payload == null) {
					resolve();
					return;
				}

				for (let i = 0; i < params.allow.length; i++) {
					const key = params.allow[i];
					let filename = anxeb.utils.path.join(params.root, params.id.toString(), key + '.base64');
					let fitem = params.payload[key];
					let absPath = context.service.locate.storage(filename);

					if (fitem === null) {
						if (anxeb.utils.file.exists(absPath)) {
							anxeb.utils.fs.unlinkSync(absPath);
						}
					} else if (fitem != null) {
						context.service.storage.save(filename, context.payload.images[key]);
					}
				}
				resolve();
			});
		},
		getRandomNumber   : function (min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},
		getRandomPassword : function () {
			let prefix = String.fromCharCode(this.getRandomNumber(65, 90));
			if (prefix === 'I' || prefix === 'O' || prefix === 'L' || prefix === '0') {
				prefix = 'Z';
			}
			prefix = prefix.toUpperCase();
			return prefix + this.getRandomNumber(100000, 999999).toString();
		},
		buildHash         : function (keys, algorithm) {
			const hasher = crypto.createHash(algorithm || 'sha256');
			for (let i = 0; i < keys.length; i++) {
				hasher.update(keys[i], 'utf8');
			}
			return hasher.digest();
		}
	}
};
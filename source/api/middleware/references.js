'use strict';
let ObjectId = require('anxeb-mongoose').ObjectId;

let lookupReferences = async function (context, query) {
	let childFilter = {
		$filter : {
			input : '$items',
			as    : 'item',
			cond  : context.isTenantUser ? {
				$or : [
					{ $eq : [{ $type : '$$item.facility' }, 'missing'] },
					{ $in : ['$$item.facility', [ObjectId(context.facility), null]] }
				]
			} : {
				$or : [
					{ $eq : [{ '$type' : '$$item.facility' }, 'missing'] },
					{ $eq : ['$$item.facility', null] }
				]
			}
		}
	};

	return await context.data.aggregate.Reference([
		{ $match : query },
		{ $sort : { name : 1 } },
		{ $unwind : { path : '$References', preserveNullAndEmptyArrays : true } }, {
			$lookup : {
				from         : 'References',
				localField   : '_id',
				foreignField : 'parent',
				as           : 'items'
			}
		}, {
			$project : {
				_id      : 0,
				id       : '$_id',
				name     : '$name',
				type     : '$type',
				meta     : '$meta',
				parent   : '$parent',
				root     : '$root',
				facility : '$facility',
				childs   : context.query.childs === 'all' || context.query.childs === 'count' || context.query.childs === 'min' ? { $size : childFilter } : childFilter
			}
		}
	]);
};

module.exports = {
	get : async function (context) {
		let query = {};
		context.access.filter(query).withAvailabeFacilities();

		if (context.params.referenceId) {
			let reference = await context.data.retrieve.Reference(context.params.referenceId, ['root']);
			if (reference) {
				if (context.query.childs === 'items') {
					query.parent = context.params.referenceId;

					let childs = await context.data.list.Reference(query, ['root'], { name : 1 });
					context.send(reference.toClient(childs));
				} else if (context.query.childs === 'all') {
					query.parent = ObjectId(context.params.referenceId);

					let childs = await lookupReferences(context, query);
					context.send(reference.toClient(childs));
				} else {
					context.send(reference.toClient());
				}
			} else {
				context.log.exception.record_not_found.args('labels.reference', context.params.referenceId).throw(context);
			}
		} else {
			if (context.query.branches != null) {
				let $branches = context.query.branches.filter((item) => item != null && item !== 'null');
				let references = await context.data.list.Reference({ _id : { $in : $branches } }, ['root'], { name : 1 });
				let $references = references.toClient();
				context.send($references);
			} else if (context.query.type != null && context.query.childs != null) {
				query.type = context.query.type;
				query.parent = context.query.parent != null ? ObjectId(context.query.parent) : null;

				let references = await lookupReferences(context, query);
				if (context.query.childs === 'min') {
					for (let i = references.length - 1; i >= 0; i--) {
						if (references[i].childs === 0) {
							references.splice(i, 1);
						} else {
							delete references[i].childs;
						}
					}
				}
				context.send(references);
			} else {
				if (context.query.parent || context.query.type) {
					query.parent = context.query.parent != null ? context.query.parent : null;
					if (context.query.type) {
						query.type = context.query.type;
					}
					let references = await context.data.list.Reference(query, ['root'], { name : 1 });
					context.send(references.toClient());
				} else {
					context.log.exception.invalid_request.throw(context);
				}
			}
		}
	},

};
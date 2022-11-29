'use strict';

const fields = require('anxeb-mongoose').Fields;
const SchemaBuilder = require('../../middleware/schema');

module.exports = {
	Schema : function (params) {
		return new SchemaBuilder(params).build(function (required) {
			return {
			seccion: fields.enum({ required: required(0)}, ['A', 'B', 'C', 'D', 'E', 'F', 'G']),
			numero: fields.number({ required: required(1) })
			};
		});
	}
};
/*export interface Curso {
  Seccion: string;
  NumeroO: Number;
}*/

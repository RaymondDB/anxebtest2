'use strict';

const fields = require('anxeb-mongoose').Fields;
const SchemaBuilder = require('../../middleware/schema');

module.exports = {
	Schema : function (params) {
		return new SchemaBuilder(params).build(function (required) {
			return {
				state: fields.string({ required: required(0) }),
				fecha: fields.date({ required: required(1) }),
				voto: fields.number({ required: required(1) })
			};
		});
	}
};
/*
export interface Votacion {
  Estado: string;
  Fecha: string;
  Voto: number;
}
*/
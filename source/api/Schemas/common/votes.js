'use strict';

const fields = require('anxeb-mongoose').Fields;
const SchemaBuilder = require('../../middleware/schema');

module.exports = {
	Schema : function (params) {
		return new SchemaBuilder(params).build(function (required) {
			return {
				State: fields.string({ required: required(0) }),
				Fecha: fields.date({ required: required(1) }),
				Voto: fields.number({ required: required(1) })
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
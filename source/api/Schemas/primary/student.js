'use strict';

const fields = require('anxeb-mongoose').Fields;
const SchemaBuilder = require('../../middleware/schema');
const Votes = require('./../common/votes');
module.exports = {
	Schema: function (params) {
		return new SchemaBuilder(params, 'Student').build(function (required) {
			return {
				//id: fields.reference({ required: true }, 'Students'),
				Matricula: fields.string({ required: true }),
				Curso: {
					Seccion: fields.enum({ required: required(0) }, ['A', 'B', 'C', 'D', 'E', 'F', 'G']),
					Numero: fields.number({ required: required(1) })
				},
				Votes: Votes.Schema({ required: false }),
			}
		});
	}
}
/*
export interface Users {
  Matricula: string;
  Curso: Curso;
  Votacion: Votacion;
}
*/
'use strict';

const fields = require('anxeb-mongoose').Fields;
const SchemaBuilder = require('../../middleware/schema');
const Curso = require('./../common/curso');
const Votes = require('./../common/votes');
module.exports = {
	Schema: function (params) {
		return new SchemaBuilder(params, 'Student').build(function () {
			return {
				//id: fields.reference({ required: true }, 'Students'),
				Matricula: fields.string({ required: true }),
				Curso: Curso.Schema({ required: true }),
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
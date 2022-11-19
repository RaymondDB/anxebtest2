const User = require('../Schemas/primary/students');

module.exports = {
	collection: 'Students',
	schema: new User.Schema(),
	methods: {
		toClient: function () {
			return {
				id: this.id,
				Matricula: this.Matricula,
				Curso: this.Curso,
				Votacion: this.Votacion
			}
		}
	}
};
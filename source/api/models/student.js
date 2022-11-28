const User = require('../Schemas/primary/student');

module.exports = {
	collection: 'Student',
	schema: new User.Schema(),
	methods: {
		toClient: function () {
			return {
				id: this._id,
				Matricula: this.Matricula,
				Curso: this.Curso,
				Votes: this.Votes
			}
		}
	}
};
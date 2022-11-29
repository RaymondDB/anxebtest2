const fields = require('anxeb-mongoose/source/middleware/fields');
const anxeb = require('anxeb-node');

module.exports = {
    url: '/vote',
    access: anxeb.Route.access.public,
    timeout: 60000,
    methods: {
        get: function (context) {
           
        },
        post: async function (context) {
            const Data = context.payload.Student;
           VerifyData(context, Data);
            //insert it on mongo db
            let student = await context.data.upsert.Student();
            student.matricula = Data.matricula;
            student.curso = Data.curso;
            student.votes = Data.votes;
            student.votes.Fecha = anxeb.utils.date.utc().unix();
            await context.data.validate({
                model  : student
            });
            await student.persist();
            context.send(student.toClient());
        },
    }
};
async function VerifyData(context, data){
    //verify structure
    if (!Data.matricula || !Data.curso || !Data.votes) {
        context.log.exception.invalid_request.throw();
    }
    //verify if the matricula is well formated 2019-0000 (the first 4 digits can only be  2019)
    if (!Data.matricula.match(/2019-\d{4}/)) {
        context.log.exception.invalid_request.args( {'matricula': Data.matricula}).include({
            fields: {msg: 'matricula must be in the format 2019-0000',
            name: 'matricula', index: 1, matricula: Data.matricula}

        }).throw();
    }
    //veify if the student exist
    const isRegitered = await context.data.find.Student({ 'matricula': Data.matricula });
    if (isRegitered){
        context.log.exception.selected_name_unavailable.args('matricula').include(
           { fields: [{name: 'matricula', index: 1, matricula: Data.matricula, 
           msg: 'Esta matricula ya ha votado',}]
    }).throw();
    }
    //verify if the course exist A-G
    const Lcurso =['A','B','C','D','E','F','G'];
    if (!Lcurso.includes(Data.curso,Seccion)){
        context.log.exception.invalid_request.args('curso').include(
           { fields: [{name: 'curso.seccion', index: 1, curso: Data.curso.Seccion }]
    }).throw();
    }
    //verify if the vote is well formated
    if (!Data.votes.Fecha || !Data.votes.Candidato || !Data.votes.Seccion){
        context.log.exception.invalid_request.args('votes').include(
              { fields: [{name: 'votes', index: 1, votes: Data.votes }]
    }).throw();
    //check if the vote is a number
    if (isNaN(Data.votes.voto)){
        context.log.exception.invalid_request.args('voto').include(
           { fields: [{name: 'voto', index: 1, voto: Data.votes.voto }]
    }).throw();
    }
}
}
const anxeb = require('anxeb-node');

module.exports = {
    url: '/vote',
    access: anxeb.Route.access.public,
    timeout: 60000,
    methods: {
        post: async function (context) {
            const Data = context.payload.Student;
             VerifyData(context, Data);
            //insert it on mongo db
            let student = await context.data.upsert.Student();
            student.Matricula = Data.Matricula;
            student.Curso = Data.Curso;
            student.Votes = Data.Votes;
            student.Votes.Fecha = anxeb.utils.date.utc().unix();
            await context.data.validate({
                model  : student
            });
            await student.persist();
            context.send(student.toClient());
        },
    }
};
async function VerifyData(context, Data){
    //veify structure
    if (!Data.Matricula || !Data.Curso || !Data.Votes) {
        context.log.exception.invalid_request.throw();
    }
    //verify if the Matricula is well formated 2019-0000 (the first 4 digits can only be  2019)
    if (!Data.Matricula.match(/2019-\d{4}/)) {
        context.log.exception.invalid_request.args( {'Matricula': Data.Matricula}).include({
            fields: {msg: 'Matricula must be in the format 2019-0000',
            name: 'Matricula', index: 1, Matricula: Data.Matricula}

        }).throw();
    }
    //veify if the student exist
    const isRegitered = await context.data.find.Student({ 'Matricula': Data.Matricula });
    if (isRegitered){
        context.log.exception.selected_name_unavailable.args('Matricula').include(
           { fields: [{name: 'Matricula', index: 1, Matricula: Data.Matricula, 
           msg: 'This Matricula has voted',}]
    }).throw();
    }
    //verify if the course exist A-G
    const LCurso =['A','B','C','D','E','F','G'];
    if (!LCurso.includes(Data.Curso.Seccion)){
        context.log.exception.invalid_request.args('Curso').include(
           { fields: [{name: 'Curso.Seccion', index: 1, Curso: Data.Curso.Seccion }]
    }).throw();
    }
    //verify if the vote is well formated
    //check if the vote is a number and if its not, try to convert it to a number
    Data.Votes.Voto=Number(Data.Votes.Voto);
    console.log(Data);
    if (isNaN(Data.Votes.Voto)){
        console.log('is not a number');
        //string to number
        Data.Votes.Voto = parseInt(Data.Votes.Voto);
        console.log(Data.Votes.Vote);
        if (isNaN(Data.Votes.Voto)){
            context.log.exception.invalid_request.args('Vote').include(
                { fields: [{msg:'Vote deberia ser un numero',name: 'Vote', index: 1, Vote: Data.Votes.Voto }]
         }).throw();
        }
    }
}
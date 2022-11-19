const anxeb = require('anxeb-node');

module.exports = {
	url     : '/votes/',
	access  : anxeb.Route.access.public,
	timeout : 60000,
	methods : {
        get : function (context) {},
        post : function (context) {
           const Data= context.payload;
           if (!Data.Matricula || !Data.Curso || !Data.Votacion) {
               ccontext.log.exception.invalid_request.throw();
               context.send.badRequest();
               return;
           }
           //insert it on mongo db
           
        },
	}
};

module.exports = {
	type    : process.env.NODE_ENV === 'production' ? 'production' : 'development',
	api     : {
		socket   : {
			host : process.env.Host,
			port : process.env.Port,
			cors : {
				origin         : ['*'],
				exposedHeaders : ['table-row-count', 'current-location']
			}
		},
		security : {
			keys : {
				private    : '/development.rsa',
				public     : '/development.pem',
				expiration : 80000
			}
		},
		mongodb  : {
			key : 'localhost',
			uri          : `mongodb://root:2005@${process.env.Mongo_Host}:${process.env.Mongo_Port}/${process.env.Mongo_DB}`,
			options      : {
				user                        : process.env.Mongo_User,
				pass                        : process.env.Mongo_Pass,
				authSource                  : process.env.Mongo_AuthSource,
				readPreference              : 'primary',
				retryWrites                 : true,
				autoReconnect               : false,
				useUnifiedTopology          : true,
				keepAlive                   : 2000,
				poolSize                    : 4,
				useFindAndModify            : false
				//tls                         : true,
			//	tlsCertificateKeyFile       : 'keys/taskube.dbs.nodrix.net.pem',
				//sslValidate                 : true,
				//tlsAllowInvalidCertificates : false
			},
			retryTimeout : 2592000
		},
		/*smtp     : {
			account : 'Taskube <info@taskube.net>',
			host    : 'smtp.nodrix.net',
			port    : 465,
			auth    : {
				user : 'info@taskube.net',
				pass : 'a9v8sjd0f984209v8a90s8gjd9s8gn092'
			}
		}*/
	}
}
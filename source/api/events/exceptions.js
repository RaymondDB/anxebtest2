'use strict';
let eventTypes = require('anxeb-node').Event.types;

module.exports = {
	expired_token             : {
		message : 'Tiempo de sesión expirado. Favor volver a ingresar',
		code    : 6013,
		type    : eventTypes.user_exception
	},
	invalid_credentials       : {
		message : 'Correo o contraseña incorrecta',
		code    : 901,
		type    : eventTypes.user_exception
	},
	invalid_email             : {
		message : 'Correo inválido',
		code    : 902,
		type    : eventTypes.user_exception
	},
	invalid_password          : {
		message : 'Contraseña Inválida',
		code    : 903,
		type    : eventTypes.user_exception
	},
	selected_name_unavailable : {
		message : '[0] seleccionado no está disponible',
		code    : 904,
		type    : eventTypes.user_exception
	},
	member_not_found          : {
		message : 'Miembro no encontrado',
		code    : 905,
		type    : eventTypes.user_exception
	},
	member_not_registered     : {
		message : 'Miembro no registrado',
		code    : 906,
		type    : eventTypes.user_exception
	},
	vendor_action_error       : {
		message : "Error interno del enlace [0] usando servidor [1]",
		code    : 906,
		type    : eventTypes.user_exception
	},

	record_not_found               : {
		message : '[0] indicado no existe o su identificador es incorrecto',
		code    : 907,
		type    : eventTypes.user_exception
	},
	inactive_member                : {
		message : 'Miembro inactivo, favor contactar su administrador',
		code    : 908,
		type    : eventTypes.user_exception
	},
	inactive_user                  : {
		message : 'Usuario inactivo, favor contactar su administrador',
		code    : 909,
		type    : eventTypes.user_exception
	},
	user_not_found                 : {
		message : 'Usuario no encontrado',
		code    : 910,
		type    : eventTypes.user_exception
	},
	access_denied                  : {
		message : 'Operación denegada por falta de permisos',
		code    : 911,
		type    : eventTypes.http_error
	},
	no_facility                    : {
		message : 'No existen facilidades en esta área',
		code    : 912,
		type    : eventTypes.http_error
	},
	user_already_permitted         : {
		message : 'Usuario ya tiene acceso a esta entidad',
		code    : 914,
		type    : eventTypes.user_exception
	},
	prospect_account_registered    : {
		message : 'La cuenta [0] ya está tomada, favor utilizar otro correo',
		code    : 916,
		type    : eventTypes.user_exception
	},
	medium_null_value              : {
		message : 'Datos del instrumento no recibidos',
		code    : 917,
		type    : eventTypes.user_exception
	},
	fixed_email                    : {
		message : 'Correo social no puede ser modificado',
		code    : 919,
		type    : eventTypes.user_exception
	},
	invalid_social_account         : {
		message : 'Cuenta social inválida',
		code    : 920,
		type    : eventTypes.user_exception
	},
	smtp_error                     : {
		message : "Error enviando correo. [inner]",
		code    : 922,
		type    : eventTypes.user_exception
	},
	error_processing_payment       : {
		message : "Error procesando pago. [inner]",
		code    : 923,
		type    : eventTypes.user_exception
	},
	medium_not_found               : {
		message : 'Información de instrumento incompleta, favor intentar nuevamente',
		code    : 924,
		type    : eventTypes.user_exception
	},
	gateway_not_alive              : {
		message : "El enlace [0] no responde a la dirección [1]",
		code    : 925,
		type    : eventTypes.user_exception
	},
	gateway_action_error           : {
		message : "Error interno del enlace [0]",
		code    : 926,
		type    : eventTypes.user_exception
	},
	invalid_denominator            : {
		message : "Denominador de monto inválido",
		code    : 927,
		type    : eventTypes.user_exception
	},
	invalid_amount                 : {
		message : "El saldo mostrado ha cambiado, favor actualice su ticket",
		code    : 928,
		type    : eventTypes.user_exception
	},
	error_canceling_payment        : {
		message : "Error cancelando pago. [inner]",
		code    : 929,
		type    : eventTypes.user_exception
	},
	error_validating_ticket        : {
		message : "Error validando ticket",
		code    : 930,
		type    : eventTypes.user_exception
	},
	coupon_registered              : {
		message : 'El cupón [0] ya se encuentra registrado, favor utilizar otro código',
		code    : 931,
		type    : eventTypes.user_exception
	},
	coupon_not_found               : {
		message : 'El cupón con numeración [0] no existe o ha caducado, favor utilizar otro código',
		code    : 932,
		type    : eventTypes.user_exception
	},
	missing_parameter              : {
		message : 'El parámetro [0] es requerido',
		code    : 933,
		type    : eventTypes.user_exception
	},
	application_not_found          : {
		message : 'La aplicación indicada no existe o ha caducado, favor contactar su administrador',
		code    : 934,
		type    : eventTypes.user_exception
	},
	invalid_application_key        : {
		message : 'Llave inválida o incorrecta',
		code    : 935,
		type    : eventTypes.user_exception
	},
	application_vendor_not_defined : {
		message : 'Servidor intermadiario sin definir',
		code    : 936,
		type    : eventTypes.user_exception
	},
	inactive_vendor                : {
		message : 'Servidor intermediario inactivo, favor contactar su administrador',
		code    : 937,
		type    : eventTypes.user_exception
	},
	inactive_application           : {
		message : 'Aplicación inactiva, favor contactar su administrador',
		code    : 938,
		type    : eventTypes.user_exception
	},
	coupon_error                   : {
		message : 'Error interno procesando cupón, favor reintentar',
		code    : 939,
		type    : eventTypes.user_exception
	},
	error_processing_validation    : {
		message : "Error validando ticket.\n\n[inner]",
		code    : 940,
		type    : eventTypes.user_exception
	},
	cashier_profile_not_defined    : {
		message : "Perfil de cajero no definido",
		code    : 941,
		type    : eventTypes.user_exception
	},
	terminal_action_error          : {
		message : "Error interno del enlace [0] usando servidor [1]",
		code    : 942,
		type    : eventTypes.user_exception
	},
	removed_member                 : {
		message : 'Cuenta de miembro inactiva o eliminada',
		code    : 943,
		type    : eventTypes.user_exception
	},
	removed_user                   : {
		message : 'Cuenta de usuario inactiva o eliminada',
		code    : 944,
		type    : eventTypes.user_exception
	},
	report_data_error              : {
		message : 'Error cargando información de reporte',
		code    : 945,
		type    : eventTypes.user_exception
	},
	payment_article_missing        : {
		message : 'Articulo a paga no definido',
		code    : 946,
		type    : eventTypes.user_exception
	},
	error_initializing_payment     : {
		message : "Error inicializando proveedor. [inner]",
		code    : 947,
		type    : eventTypes.user_exception
	},
	invalid_multiplier             : {
		message : "Multiplicador de monto inválido",
		code    : 948,
		type    : eventTypes.user_exception
	},
	invalid_security_pin           : {
		message : "Pin de seguridad inválido",
		code    : 949,
		type    : eventTypes.user_exception
	},
	invalid_payment_method         : {
		message : "Método de pago inválido inválido",
		code    : 950,
		type    : eventTypes.user_exception
	},
	invalid_article_balance        : {
		message : 'Denominador o moneda incorrectos',
		code    : 951,
		type    : eventTypes.user_exception
	},
	migration_error                : {
		message : 'Error ejecutando migración de datos. Favor contactar antares@intelipark.net para asistencia',
		code    : 1200,
		type    : eventTypes.user_exception
	}
};
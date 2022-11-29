const anxeb = require('anxeb-node');
const md5 = require('md5');
const common = require('../middleware/common');
const ObjectId = require('anxeb-mongoose').ObjectId;

module.exports = {
    url: '/users',
    type: anxeb.Route.types.action,
    access: anxeb.Route.access.private,
    //owners: ['staff', 'user'],
  //  roles: ['staff_admin'],
    timeout: 60000,
    methods: {
        get: async function (context) {
            return;
        },
        post: async function (context) {
            let user = context.payload.user;
            let password = $user.login.password ? md5($user.login.password.trim().toLowerCase()) : null;
            if (user.login.email != null) {
                let rep_email = await context.data.find.User({ 'login.email': user.login.email });
                if (rep_email && !rep_email._id.equals(user.id)) {
                    context.log.exception.selected_name_unavailable.args('labels.email').include({
                        fields: [{ name: 'login.email', index: 1 }]
                    }).throw(context);
                    return;
                }
            }
            //regex to validate that the password lenth  is >8 and <24, has a upper case letter, lower case letter and has a number
            if (password && !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/)) {
                context.log.exception.invalid_password.include({
                    fields: [{ name: 'login.password', index: 1 }]
                }).throw(context);
                return;
            }
            let dbuser = await context.data.upsert.User(user.id);
            user.first_names = user.first_names;
            user.last_names = user.last_names;
            user.identity = user.identity;
            user.info = user.info;
            user.login.email = user.login.email ? user.login.email.trim().toLowerCase() : dbuser.login.email;
            user.login.password = password || dbuser.login.password;
            user.login.provider = password != null || !$user.id ? 'email' : dbuser.login.provider;
            user.login.state = (user.login.state ? $user.login.state : dbuser.login.state) || 'active';
           /* if (context.isStaffAdmin) {
                user.owner = user.owner != null && user.owner.type != null && user.owner.entity != null ? user.owner : null;
                user.type = (user.type ? user.type : dbuser.type) || 'staff';
            } else {
                context.log.exception.access_denied.throw(context);
            }*/
            await context.audit(dbuser);
            if (dbuser.isNew) {
                dbuser.created = anxeb.utils.date.utc().unix();
            }
            await user.persist();
            context.send(user.toClient());
        }

    },
    childs: {
        item: {
            url: '/:userId',
            methods: {
                get: async function (context) {
                    let user = await  context.data.retrieve.User(context.params.userId, ['owner.entity']);
                    if (user) {
                        context.send(user.toClient());
                    } else {
                        context.log.exception.record_not_found.args('labels.user', context.params.userId).throw(context);
                    }
                },
                delete: async function (context) {
                    let tenantAdmin = await context.data.find.Tenant({ administrator: context.params.userId });

                    if (tenantAdmin) {
                        context.log.exception.seed_user_blocked.throw(context);
                    }

                    let user = await context.data.retrieve.User(context.params.userId);
                    if (user) {
                        if (context.isTenantAdmin) {
                            if (!user.owner || !user.owner.entity.equals(context.facility)) {
                                context.log.exception.access_denied.throw(context);
                            }
                        }
                        await user.delete();
                        await context.data.delete.Permit({ user: user._id });
                        context.ok();
                    } else {
                        context.log.exception.record_not_found.args('labels.user', context.params.userId).throw(context);
                    }
                }
            }
        }
    }
}
const getUser = async function (params) {
    let context = params.context;
    let query = {};

    if (params.email != null) {
        query['login.email'] = params.email;
    } else if (params.id != null) {
        query._id = params.id;
    } else {
        return null;
    }
    return await context.data.find.User(query);
}

module.exports = {
    url: '/student',
    access: anxeb.Route.access.public,
    timeout: 60000,
    methods: {
    get: function (context) {
    return context.data.find.student();
} } };
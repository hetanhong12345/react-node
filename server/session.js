/**
 * Created by Administrator on 2016/9/13.
 */
var session = {
    id: null,
    username: ''
}
session.set = function (key, val) {
    session[key] = val;
}
session.get = function (key) {
    return session[key] || '';
}
session.clear = function () {
    session.id = null;
    session.username = '';
}
module.exports = session;
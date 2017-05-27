/**
 * Created by mlagusker on 5/27/17.
 */
module.exports = function (db) {
    return {
        requireAuthentication: function (req, res, next) {
            var token = req.get('Auth');

            db.user.findByToken(token).then(function (user) {
                res.user = user;
                next();
            }, function () {
                res.status(401).send();
            });
        }
    };
}
/**
 * Created by mlagusker on 5/21/17.
 */
var bcrypt = require('bcrypt');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function (sequelize, DataTypes) {
    //return sequelize.define('user', {
    var user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        salt: {
            type: DataTypes.STRING
        },
        password_hash: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [7, 100]
            },
            set: function (value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
    }, {
        hooks: {
            beforeValidate: function (user, options) {
                if (typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        },
        classMethods: {
            authenticate: function (body) {
                return new Promise(function (resolve, reject) {
                    if (typeof body.email !== 'string' || typeof body.password !== 'string') {
                        //return res.status(400).send();
                        return reject();
                    }
                    user.findOne({
                        where: {
                            email: body.email
                        }
                    }).then(function (user) {
                        if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                            //return res.status(401).send();
                            return reject();
                        }
                        //res.json(user.toPublicJSON());
                        resolve(user);
                    }, function (e) {
                        //res.status(500).send();
                        reject();
                    });
                });
            }
        },
        instanceMethods: {
            toPublicJSON: function () {
                var json = this.toJSON();
                return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
            },
            generateToken: function (type) {
                if (!_.isString(type)) {
                    return undefined;
                }

                try {
                    var stringData = JSON.stringify({id: this.get('id'), type: type});
                    var encryptedData = cryptojs.AES.encrypt(stringData, 'abc!@#!').toString();
                    var token = jwt.sign({
                        token: encryptedData
                    }, 'qwerty098');

                    return token;
                } catch (e) {
                    return undefined;
                }
            }
        }
    });
    return user;
};
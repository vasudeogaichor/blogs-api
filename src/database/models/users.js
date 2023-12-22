'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        username: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        hashed_password: DataTypes.STRING,
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
    });
};

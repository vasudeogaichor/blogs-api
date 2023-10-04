'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('posts', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
    });
};

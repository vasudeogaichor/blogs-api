'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('blogs', {
        title: DataTypes.STRING,
        content: DataTypes.TEXT
    }, {
        timestamps: true,
        paranoid: true,
        underscored: true,
    });
};

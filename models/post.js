"use strict";

module.exports = (sequelize, DataTypes) => {
    var Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userID: DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        slug: DataTypes.STRING,
        image: DataTypes.STRING,
        metaTitle: DataTypes.STRING,
        metaDescription: DataTypes.STRING,
        isActive: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,   
        }
    );

    return Post;
};
"use strict";

module.exports = (sequelize, DataTypes) => {
    var Comment = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postID: DataTypes.INTEGER,
        userID: DataTypes.INTEGER,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        status: DataTypes.INTEGER,        
        updatedAt: DataTypes.DATE, 
        createdAt: DataTypes.DATE, 
        }
    );

    return Comment;
};
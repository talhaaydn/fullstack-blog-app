'use strict';

module.exports = function(sequelize, DataTypes){
    var User = sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.INTEGER,
            avatar: DataTypes.STRING,
            resetPasswordToken: DataTypes.STRING 
        },
        {
            timestamps: false
        }
    );

    return User;
};
    
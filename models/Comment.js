const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

//comment model, table, object
Comment.init(
    {
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize
    }
);

module.exports = Comment;
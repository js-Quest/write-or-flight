const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Comment model
class Comment extends Model { }

// set up data for table and columns
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_content: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
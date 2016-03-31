/* jshint indent: 2 */
/**
 * @param  {function}
 * @param  {function}
 * @return {model}
 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('saved_searches', {
    internal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'internal_id'
      }
    }
  }, {
    tableName: 'saved_searches',
    freezeTableName: true
  });
};

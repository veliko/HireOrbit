/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kanban_cards', {
    internal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    card_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'indeed_jobs',
        key: 'jobkey'
      }
    },
    notes: {
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
    tableName: 'kanban_cards',
    freezeTableName: true
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('workflow_state', {
    internal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    jobkey_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'indeed_jobs',
        key: 'jobkey'
      }
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
    tableName: 'workflow_state',
    freezeTableName: true
  });
};

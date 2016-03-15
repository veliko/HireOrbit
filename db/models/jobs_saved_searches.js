/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jobs_saved_searches', {
    internal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: 'now()'
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: 'now()'
    },
    jobkey_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'indeed_jobs',
        key: 'jobkey'
      }
    },
    saved_search_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'saved_searches',
        key: 'internal_id'
      }
    }
  }, {
    tableName: 'jobs_saved_searches',
    freezeTableName: true
  });
};

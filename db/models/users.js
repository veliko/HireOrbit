/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
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
    username: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    github_avatar_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    github_html_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    github_access_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    github_refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'users',
    freezeTableName: true
  });
};

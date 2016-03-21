/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    internal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: true
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
    },
    card_positions: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'users',
    freezeTableName: true,
    timestamps: false
  });
};

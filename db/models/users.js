/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    internal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    google_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    google_profile_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    google_image_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    google_access_token: {
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

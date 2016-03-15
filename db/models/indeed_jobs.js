/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('indeed_jobs', {
    internal_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    jobtitle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    company: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    formattedlocation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    source: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
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
    snippet: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    latitude: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    longitude: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    jobkey: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sponsored: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    expired: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    indeedapply: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    formattedlocationfull: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nouniqueurl: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    formattedrelativetime: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    onmousedown: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'indeed_jobs',
    freezeTableName: true
  });
};

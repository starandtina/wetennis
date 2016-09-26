module.exports = function (sequelize, DataTypes) {
  const Times = sequelize.define('Times', {
    date: {
      type: DataTypes.DATE,
      field: 'date'
    },
    type: {
      type: DataTypes.STRING,
      field: 'type'
    },
    userId: {
      type: DataTypes.STRING,
      field: 'Userid'
    },
    location: {
      type: DataTypes.STRING,
      field: 'location'
    },
    match: {
      type: DataTypes.STRING,
      field: 'match'
    },
    us: {
      type: DataTypes.STRING,
      field: 'us'
    },
    permission: DataTypes.INTEGER,
    ourScore: DataTypes.INTEGER,
    opponentScore: DataTypes.INTEGER,
    opponent: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'wtf_Times',
    classMethods: {
      associate: function (models) {
        Times.hasMany(models.TimesPics, {
          foreignKey: 'times_id'
        })
      }
    }
  })

  return Times
}

module.exports = function (sequelize, DataTypes) {
  const Times = sequelize.define('Times', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      field: 'date'
    },
    type: {
      type: DataTypes.STRING,
      field: 'type',
    },
    imgs: {
      type: DataTypes.ARRAY,
      field: 'imgs'
    },
    location: {
      type: DataTypes.STRING,
      field: 'location',
    },
    match: {
      type: DataTypes.STRING,
      field: 'match'
    },
    us: {
      type: DataTypes.STRING,
      field: 'us'
    },
    ourScore: DataTypes.NUMBER,
    opponentScore: DataTypes.NUMBER,
    opponent: DataTypes.STRING,
    message: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'wtf_Times'
  })

  return Times
}

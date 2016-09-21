module.exports = function (sequelize, DataTypes) {
  const TimesPics = sequelize.define('TimesPics', {
    timesId: {
      type: DataTypes.INTEGER,
      field: 'times_id'
    },
    timesImgStr: {
      type: DataTypes.TEXT,
      field: 'times_img_str'
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'wtf_TimesPics',
    classMethods: {
      associate: function (models) {
        TimesPics.belongsTo(models.Times, {
          onDelete: 'CASCADE',
          foreignKey: 'times_id',
          constraints: false,
        })
      }
    }
  })

  return TimesPics
}

module.exports = function (sequelize, DataTypes) {
  const ComPrise = sequelize.define('ComPrise', {
    isGood: {
      type: DataTypes.STRING,
      field: 'IsGood'
    },
    updateDateTime: {
      type: DataTypes.STRING,
      field: 'UpdateTime'
    },
    type: {
      type: DataTypes.STRING,
      field: 'dtype',
      defaultValue: 'News'
    },
    typeSysno: {
      type: DataTypes.STRING,
      field: 'typesysno'
    },
    userId: {
      type: DataTypes.STRING,
      field: 'memsys'
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'wtf_ComPrise',
    classMethods: {
      associate: function (models) {
        ComPrise.belongsTo(models.News, {
          onDelete: 'CASCADE',
          foreignKey: 'typeSysno',
          constraints: false,
        })
      }
    }
  })

  return ComPrise
}

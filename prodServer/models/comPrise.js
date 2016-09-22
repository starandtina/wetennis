module.exports = function (sequelize, DataTypes) {
  const ComPrise = sequelize.define('ComPrise', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      field: 'dtype'
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

module.exports = function (sequelize, DataTypes) {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      field: 'Type'
    },
    typeSysno: {
      type: DataTypes.STRING,
      field: 'TypeSysno'
    },
    updateDate: {
      type: DataTypes.STRING,
      field: 'UpdateDate'
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'wtf_Comments',
    classMethods: {
      associate: function (models) {
        Comment.belongsTo(models.News, {
          onDelete: 'CASCADE',
          foreignKey: 'TypeSysno',
          constraints: false,
        })
      }
    }
  })

  return Comment
}

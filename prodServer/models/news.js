module.exports = function (sequelize, DataTypes) {
  const News = sequelize.define('News', {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      field: 'issueTime'
    },
    type: {
      type: DataTypes.STRING,
      field: 'Type'
    },
    thumbImgUrl: {
      type: DataTypes.STRING,
      field: 'imgurl'
    },
    provider: {
      type: DataTypes.STRING,
      field: 'writer'
    },
    providerIconUrl: {
      type: DataTypes.STRING,
      field: 'smallurl'
    },
    content: {
      type: DataTypes.STRING,
      field: 'NewsContent'
    },
    title: DataTypes.STRING
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'wtf_News',
    classMethods: {
      associate: function (models) {
        News.hasMany(models.Comment, {
          foreignKey: 'typeSysno',
          constraints: false
        })

        News.hasMany(models.ComPrise, {
          foreignKey: 'typeSysno',
          constraints: false
        })
      }
    }
  })

  return News
}

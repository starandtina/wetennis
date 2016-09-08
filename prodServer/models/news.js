module.exports = function (sequelize, DataTypes) {
  return sequelize.define('News', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      field: 'issueTime'
    },
    thumbImgUrl: {
      type: DataTypes.STRING,
      field: 'imgurl'
    },
    provider: {
      type: DataTypes.STRING,
      field: 'writer',
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
    tableName: 'wtf_News'
  })
}

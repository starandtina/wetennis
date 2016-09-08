module.exports = function (sequelize, DataTypes) {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      field: 'Type'
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'wtf_Comments',
    classMethods: {
      associate: function (models) {

      }
    }
  })

  return Comment
}

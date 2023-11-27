'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.User, {foreignKey: 'userId'})
      Appointment.belongsTo(models.Doctor, {foreignKey: 'doctorId'})
    }
  }
  Appointment.init({
    userId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    complaint: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  Appointment.beforeCreate((appointment) => {
    appointment.status = 'Pending'
  })
  return Appointment;
};
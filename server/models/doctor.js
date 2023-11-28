'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helper/bycrpt');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.hasMany(models.Appointment, {foreignKey: 'doctorId'})
      Doctor.hasMany(models.Review, {foreignKey: 'doctorId'})
    }
  }
  Doctor.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    price: DataTypes.INTEGER,
    yearExperience: DataTypes.INTEGER,
    practiceAt: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  Doctor.beforeCreate((doctor) => {
    doctor.password = hash(doctor.password)
  })
  return Doctor;
};
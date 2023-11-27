'use strict';

const { hash } = require('../helper/bycrpt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let dataDoctor = require('../data/doctor.json').map((el) => {
      el.password = hash(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()

      return el
    })
    await queryInterface.bulkInsert('Doctors', dataDoctor, null)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Doctors', null, null)
  }
};

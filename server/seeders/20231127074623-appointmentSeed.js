'use strict';

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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await queryInterface.bulkInsert('Appointments', [
      {
        userId: 1,
        doctorId: 1,
        status: 'paid',
        complaint: 'Pilek, sakit kepala',
        startTime: new Date(today.getTime() - 36 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() - 35 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        doctorId: 2,
        status: 'paid',
        complaint: 'Sakit perut, mual',
        startTime: new Date(today.getTime() - 39 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() - 38 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        doctorId: 3,
        status: 'paid',
        complaint: 'Batuk berat',
        startTime: new Date(today.getTime() - 18 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() - 17 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        doctorId: 5,
        status: 'accepted',
        complaint: 'Sakit tenggorokan',
        startTime: new Date(today.getTime() - 18 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() - 17 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        doctorId: 1,
        status: 'accepted',
        complaint: 'Batuk berat',
        startTime: new Date(today.getTime() - 18 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() - 17 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        doctorId: 2,
        status: 'paid',
        complaint: 'Sedikit sakit perut, mual',
        startTime: new Date(today.getTime() + 9 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() + 10 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        doctorId: 5,
        status: 'paid',
        complaint: 'Mual',
        startTime: new Date(today.getTime() + 31 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() + 32 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        doctorId: 2,
        status: 'accepted',
        complaint: 'Sakit perut',
        startTime: new Date(today.getTime() + 31 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() + 32 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        doctorId: 3,
        status: 'accepted',
        complaint: 'Sakit perut',
        startTime: new Date(today.getTime() + 35 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() + 36 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        doctorId: 4,
        status: 'accepted',
        complaint: 'Sakit kepala',
        startTime: new Date(today.getTime() + 31 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() + 32 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        doctorId: 5,
        status: 'accepted',
        complaint: 'Batuk berat',
        startTime: new Date(today.getTime() + 35 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() + 36 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        doctorId: 4,
        status: 'pending',
        complaint: 'Sakit kepala',
        startTime: new Date(today.getTime() + 56 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() + 57 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        doctorId: 3,
        status: 'pending',
        complaint: 'Sakit kepala',
        startTime: new Date(today.getTime() + 56 * 60 * 60 * 1000), 
        endTime: new Date(today.getTime() + 57 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Appointments', null, null);
  }
};

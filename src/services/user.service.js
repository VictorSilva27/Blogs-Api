const { User } = require('../models/index');

// src/services/employee.service.js

// const { Address, Employee } = require('../models/');

const getByEmail = async (email, password) => {
    // const user = await User.findByEmail();
    // return user;
        const user = await User.findOne({
            where: { email, password },
          });
        return user;
};

// const getById = async (id) => {
//   }
  
  module.exports = {
    getByEmail,
    // getById
  };
const UserService = require('../services/user.service');

const getAll = async (req, res) => {
    try {
      const employee = await UserService.getAll();
      return res.status(200).json(employee);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Ocorreu um erro' });
    }
  };
  
  module.exports = {
    getAll,
    // getById;
  };
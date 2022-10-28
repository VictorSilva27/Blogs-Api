const CategoryService = require('../services/category.service');

const postCategoryController = async (req, res) => {
    const { name } = req.body;
    const result = await CategoryService.InsertCategory(name);
    res.status(201).json(result);
};

const getCategoryController = async (_req, res) => {
    const result = await CategoryService.getAllCategory();
    res.status(200).json(result);
};

module.exports = {
postCategoryController,
getCategoryController,
};
const categoryMaster = require('../models/categoryMaster');

const getCategories = async () => {
  try {
      console.log('Fetching categories')
      const categories = await categoryMaster.find({});
      console.log('Categories fetched:', categories);
      return categories;
  } catch (error) {
      console.error('Error while fetching categories:', error.message);
      throw new Error('Error while fetching categories');
  }
};
module.exports = { getCategories };

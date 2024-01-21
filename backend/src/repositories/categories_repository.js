import { Category } from "../models/index.js";

export default class CategoryRepository {
  static async getCategories() {
    const categories = await Category.findAll({
      order: [["createdAt", "DESC"]],
    });
    return categories;
  }

  static async getCategoryById(id) {
    const category = await Category.findOne({
      where: { id: id },
    });
    return category;
  }

  static async getCategoryByName(name) {
    const category = await Category.findOne({
      where: { name: name },
    });
    return category;
  }

  static async createCategory(toCreateCategory) {
    const newCategory = await Category.create(toCreateCategory);
    return newCategory;
  }

  static async deleteCategory(toDeleteCategory) {
    await toDeleteCategory.destroy();
    return;
  }

  static async updateCategory(toUpdateCategory, newCategoryData) {
    toUpdateCategory = Object.assign(toUpdateCategory, newCategoryData);
    await toUpdateCategory.save();
    return toUpdateCategory;
  }
}

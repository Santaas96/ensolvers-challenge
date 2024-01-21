import CategoryRepository from "../repositories/categories_repository.js";

export default class CategoryService {
  static async getCategories() {
    const categories = await CategoryRepository.getCategories();
    return categories;
  }

  static async postCategory(req) {
    const newCategory = req.body;
    const existingCategory = await CategoryRepository.getCategoryByName(newCategory.name);
    if (existingCategory) {
      return { message: "The category already exist" };
    } else {
      const createdCategory = await CategoryRepository.createCategory(newCategory);
      return createdCategory;
    }
  }

  static async deleteCategory(req) {
    const id = req.params.id;
    const toDeleteCategory = await CategoryRepository.getCategoryById(id);
    if (!toDeleteCategory) {
      return { message: "The category does not exist" };
    } else {
      await CategoryRepository.deleteCategory(toDeleteCategory);
      return { message: "The category was deleted" };
    }
  }

  static async putCategory(req) {
    const newCategoryData = req.body;
    const toUpdateCategory = await CategoryRepository.getCategoryById(
      newCategoryData.id
    );
    if (!toUpdateCategory) {
      return { message: "The category does not exist" };
    } else {
      const updatedCategory = await CategoryRepository.updateCategory(
        toUpdateCategory,
        newCategoryData
      );
      return updatedCategory;
    }
  }
}

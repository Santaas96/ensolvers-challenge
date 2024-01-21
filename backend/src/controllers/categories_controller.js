import { responseHandler } from "../helpers/response-handler.js";
import CategoryService from "../services/categories_service.js";

const getAllCategories = async (req, res, next) => {
  try {
    const response = await CategoryService.getCategories(req);
    responseHandler(res, response);
  } catch (error) {
    return next(error);
  }
};

const postCategory = async (req, res, next) => {
  try {
    const response = await CategoryService.postCategory(req);
    responseHandler(res, response);
  } catch (error) {
    return next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const response = await CategoryService.deleteCategory(req);
    responseHandler(res, response);
  } catch (error) {
    return next(error);
  }
};

const putCategory = async (req, res, next) => {
  try {
    const response = await CategoryService.putCategory(req);
    responseHandler(res, response);
  } catch (error) {
    return next(error);
  }
};

export default {
  getAllCategories,
  postCategory,
  deleteCategory,
  putCategory,
};

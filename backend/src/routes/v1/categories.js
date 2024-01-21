import { Router } from "express";
import categoriesController  from "../../controllers/categories_controller.js";
const router = Router();

router.get("/", categoriesController.getAllCategories);

router.post("/", categoriesController.postCategory);

router.delete("/:id", categoriesController.deleteCategory);

router.put("/", categoriesController.putCategory);

export { router as categoriesRoute };

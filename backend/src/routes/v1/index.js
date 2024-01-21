import { Router } from "express";

// Routes imports
import { categoriesRoute } from "./categories.js";
import { notesRoute } from "./notes.js";

const router = Router();

// Routes
router.use("/categories", categoriesRoute);
router.use("/notes", notesRoute);

export default router;

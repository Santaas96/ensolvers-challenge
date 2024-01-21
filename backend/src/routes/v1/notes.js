import { Router } from "express";
import notesController  from "../../controllers/notes_controller.js";
const router = Router();

router.get("/", notesController.getAllNotes);

router.get("/:id", notesController.getNoteByiId);

router.post("/", notesController.postNote);

router.delete("/:id", notesController.deleteNote);

router.put("/", notesController.putNote);

export { router as notesRoute };
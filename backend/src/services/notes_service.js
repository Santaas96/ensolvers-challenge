import NoteRepository from "../repositories/notes_repository.js";

export default class NoteService {
  static async getNote() {
    const notes = await NoteRepository.getNote();
    return notes;
  }

  static async getNoteByiId(req) {
    const id = req.params.id;
    const note = await NoteRepository.getNoteById(id);
    return note;
  }

  static async postNote(req) {
    const { newNote, categories } = req.body;
    const createdNote = await NoteRepository.createNote(newNote);
    if (categories?.length) {
      const createdNoteWithCategories = await NoteRepository.setCategories(
        createdNote,
        categories
      );
      return createdNoteWithCategories;
    } else {
      return createdNote;
    }
  }

  static async deleteNote(req) {
    const id = req.params.id;
    const toDeleteNote = await NoteRepository.getNoteById(id);
    if (!toDeleteNote) {
      return { message: "The note does not exist" };
    } else {
      await NoteRepository.deleteNote(toDeleteNote);
      return { message: "The note was deleted" };
    }
  }

  static async putNote(req) {
    const { newNote, categories } = req.body;
    const toUpdateNote = await NoteRepository.getNoteById(newNote.id);
    if (!toUpdateNote) {
      return { message: "The note does not exist" };
    } else {
      const updatedNote = await NoteRepository.updateNote(
        toUpdateNote,
        newNote
      );
      const updatedNoteWithCategory = await NoteRepository.setCategories(
        updatedNote,
        categories
      );
      return updatedNoteWithCategory;
    }
  }
}

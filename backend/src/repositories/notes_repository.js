import { Note, Category } from "../models/index.js";

export default class NoteRepository {
  static async getNote() {
    const notes = await Note.findAll({
      include: [Category],
      order: [["createdAt", "DESC"]]
    });
    return notes;
  }

  static async getNoteById(id) {
    const note = await Note.findOne({
      include: [Category],
      where: { id: id },
    });
    return note;
  }

  static async createNote(toCreateNote) {
    const newNote = await Note.create(toCreateNote);
    return newNote;
  }

  static async deleteNote(toDeleteNote) {
    await toDeleteNote.destroy();
    return;
  }

  static async updateNote(toUpdateNote, newNoteData) {
    toUpdateNote = Object.assign(toUpdateNote, newNoteData);
    await toUpdateNote.save();
    return toUpdateNote;
  }

  static async setCategories(note, categories) {
    await note.setCategories(categories);
    let updatesNoteWithCategory = note;
    updatesNoteWithCategory.categories = categories;
    return updatesNoteWithCategory;
  }
}

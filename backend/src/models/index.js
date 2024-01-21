import Note from "./note.js";
import Category from "./category.js";

Note.belongsToMany(Category, {
  through: "notes_categories",
  foreignKey: "note_id",
});
Category.belongsToMany(Note, {
  through: "notes_categories",
  foreignKey: "category_id",
});

export {
  Note,
  Category,
};

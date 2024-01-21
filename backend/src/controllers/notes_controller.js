import { responseHandler } from "../helpers/response-handler.js";
import NoteService from "../services/notes_service.js";

const getAllNotes = async (req, res, next) => {
  try {
    const response = await NoteService.getNote();
    responseHandler(res, response);
  } catch (error) {
    return next(error);
  }
};

const getNoteByiId = async (req, res, next) => {
  try {
    const response = await NoteService.getNoteByiId(req);
    responseHandler(res, response);
  } catch (error) {
    return next(error);
  }
};

const postNote = async (req, res, next) => {
  try {
    const response = await NoteService.postNote(req);
    responseHandler(res, response);
  } catch (error) {
    return next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const response = await NoteService.deleteNote(req);
    responseHandler(res, response);
  } catch (error) {
    return next(error);
  }
};

const putNote = async (req, res, next) => {
  try {
    const response = await NoteService.putNote(req);
    responseHandler(res, response);
  } catch (error) {
    return next(error);
  }
};

export default {
  getAllNotes,
  getNoteByiId,
  postNote,
  deleteNote,
  putNote,
};

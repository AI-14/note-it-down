import { api } from "./apiConfig";
import { CreateNote, DeleteNote, UpdateNote} from "./types";


class NotesServiceAPI {

  static getAllNotes = async (authToken: string | null, priority: string): Promise<any> => {
    let url = priority === 'A' ? 'notes/all' : `notes/all/?priority=${priority}`;

    const response = await api.get(url, {
      headers: {
        "Authorization": `Bearer ${authToken}`,
      },
    });
    return response.data;
  };

  static getNoteById = async (noteId: string, authToken: string | null): Promise<any> => {
    const response = await api.get(`notes/note/${noteId}`, {
      headers: {
        "Authorization": `Bearer ${authToken}`,
      }
    })

    return response.data;
  } 

  static createNote = async ({noteData, authToken}: CreateNote): Promise<any> => {
    const response = await api.post("notes/note/", JSON.stringify(noteData), {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    });
  
    return response.data;
  };

  static updateNote = async ({noteId, updatedNoteData, authToken}: UpdateNote): Promise<any> => {
    const response = await api.put(`notes/note/${noteId}`, JSON.stringify(updatedNoteData), {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    });
  
    return response.data;
  };

  static deleteNote = async ({noteId, authToken}: DeleteNote): Promise<any> => {
    const response = await api.delete(`notes/note/${noteId}`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    });
  
    return response.data;
  };

}

export { NotesServiceAPI };







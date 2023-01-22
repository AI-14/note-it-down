interface UserCredentials {
  email: string;
  password: string;
}

interface UpdateUserCredentials extends UserCredentials {
  authToken: string | null;
}

interface NoteData {
  title: string;
  content: string;
  priority: string;
}

interface CreateNote {
  noteData: NoteData;
  authToken: string | null;
}

interface UpdateNote {
  noteId: string | undefined;
  updatedNoteData: NoteData;
  authToken: string | null;
}

interface DeleteNote {
  noteId: string;
  authToken: string | null;
}

export type { UserCredentials, UpdateUserCredentials, CreateNote, UpdateNote, DeleteNote, NoteData };

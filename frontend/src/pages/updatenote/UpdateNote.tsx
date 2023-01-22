import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ClipLoader } from "react-spinners";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { modules } from "../../utils/reactQuillConfig";
import { NotesServiceAPI } from "../../services/notesService";
import { useUserStore } from "../../stores/userStore";
import { NoteData } from "../../services/types";

export const UpdateNote = (): JSX.Element => {
  const { noteId } = useParams();

  const authToken = useUserStore((state) => state.authToken);

  const { data: noteData, isError } = useQuery(
    ["notebyid", noteId, authToken],
    () => NotesServiceAPI.getNoteById(noteId!, authToken!)
  );

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { mutate: updateNote } = useMutation(NotesServiceAPI.updateNote, {
    onSuccess: (_) => {
      setLoading(false);
      toast.success("Updated successfully.", {
        style: { fontSize: "0.7rem" },
      });
      navigate("/", { replace: true });
    },
    onError: (_) => {
      setLoading(false);
      toast.error("Something went wrong.", {
        style: { fontSize: "0.7rem" },
      });
    },
  });

  useEffect(() => {
    setTitle(noteData?.note.title);
    setContent(noteData?.note.content);
    setPriority(noteData?.note.priority);

    return () => {
      setTitle("");
      setContent("");
      setPriority("");
    };
  }, [noteData]);

  const handleTitleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onPriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriority(e.target.value);
  };

  const handleUpdateAndSaveOnClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (priority === "" || title === "") {
      toast.error("Please fill all the fields.", {
        style: { fontSize: "0.7rem" },
      });
    } else {
      setLoading(true);

      let updatedNoteData: NoteData = {
        title: title,
        content: content,
        priority: priority,
      };

      updateNote({ noteId, updatedNoteData, authToken });
    }
  };

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>OOPS. An error occured! Something went wrong</h1>
      </div>
    );
  }

  return (
    <div className=" bg-white dark:bg-slate-800 dark:shadow-md dark:shadow-gray-700 max-w-[720px] w-[98%] flex flex-col gap-20 p-4 mt-2 rounded-xl shadow-md shadow-gray-400">
      <div className="flex flex-col items-between gap-y-8 h-full p-2 ">
        {/** Title */}
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleOnChange}
          className="border-[1px] text-sm w-full border-gray-300 p-2 rounded-md bg-transparent dark:text-slate-200"
        />

        {/** Priority options */}
        <div className="flex justify-center gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="high" className="text-red-500 font-semibold">
              High
            </label>
            <input
              type="radio"
              name="High"
              id="high"
              value={"H"}
              checked={priority === "H"}
              onChange={onPriorityChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="medium" className="text-yellow-500 font-semibold">
              Medium
            </label>
            <input
              type="radio"
              name="Medium"
              id="medium"
              value={"M"}
              checked={priority === "M"}
              onChange={onPriorityChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="low" className="text-green-500 font-semibold">
              Low
            </label>
            <input
              type="radio"
              name="Low"
              id="low"
              value={"L"}
              checked={priority === "L"}
              onChange={onPriorityChange}
            />
          </div>
        </div>

        {/** Editor */}
        <ReactQuill
          theme="snow"
          modules={modules}
          onChange={setContent}
          className="w-full dark:text-slate-200"
          value={content}
          preserveWhitespace
        />
      </div>
      <button
        onClick={handleUpdateAndSaveOnClick}
        className="bg-primary w-full rounded-xl font-semibold p-2 hover:bg-primaryaccent flex justify-center"
      >
        {loading ? (
          <ClipLoader
            color="#000000"
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "Update & Save"
        )}
      </button>
    </div>
  );
};

import React, { useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { useQuery } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

import { HTMLToPDFService } from "../../services/htmlToPdfService";
import { NotesServiceAPI } from "../../services/notesService";
import { useUserStore } from "../../stores/userStore";

export const ViewNote = (): JSX.Element => {
  const { noteId } = useParams();
  const refForPdf = useRef<any>(null);

  const authToken = useUserStore((state) => state.authToken);

  const { data: noteData, isError } = useQuery(
    ["notebyid", noteId, authToken],
    () => NotesServiceAPI.getNoteById(noteId!, authToken!)
  );

  const priorityColorMap = {
    L: "bg-green-500",
    M: "bg-yellow-500",
    H: "bg-red-500",
  };

  const handleDownloadNoteOnClick = (): void => {
    HTMLToPDFService.export(noteData?.note.title, refForPdf);
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
      <div className="flex flex-col items-center gap-y-4 h-full p-2">
        {/** Title */}
        <h2 className="text-center dark:text-slate-200">
          {noteData?.note.title}
        </h2>

        {/** Date & priority */}
        <div className="flex flex-row items-center justify-center p-1">
          <p className="text-[0.5rem] italic p-1 dark:text-slate-200">
            {noteData?.note["updated_at"].substring(0, 10)}
          </p>
          <div
            className={`w-2 h-2 rounded-xl ml-1 ${
              priorityColorMap[noteData?.note.priority]
            }`}
          ></div>
        </div>

        {/** Read only editor */}
        <div ref={refForPdf} className="w-full bg-slate-800">
          <ReactQuill
            modules={{ toolbar: false }}
            value={noteData?.note.content}
            readOnly
            className="w-full dark:text-slate-200"
            preserveWhitespace
          />
        </div>

        <div
          onClick={handleDownloadNoteOnClick}
          className="hover:bg-green-400 rounded-full p-1 cursor-pointer"
        >
          <FiDownload size={20} />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { NotesServiceAPI } from "../../../services/notesService";
import { useUserStore } from "../../../stores/userStore";

export const NoteCard = ({noteId, title, slugTitle, content, updatedAt, priority}): JSX.Element => {
  const authToken = useUserStore((state) => state.authToken);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { mutate: deleteNote } = useMutation(NotesServiceAPI.deleteNote, {
    onSuccess: (_) => {
      queryClient.invalidateQueries(["allNotes", authToken]);
    },
    onError: (_) => {
      toast.error("Something went wrong.", {
        style: { fontSize: "0.7rem" },
      });
    },
  });

  const priorityColorMap = {
    L: "bg-green-500",
    M: "bg-yellow-500",
    H: "bg-red-500",
  };

  const handleViewNoteOnClick = (): void => {
    navigate(`/viewnote/${noteId}/${slugTitle}`);
  }

  const handleEditNoteOnClick = (): void => {
    navigate(`/updatenote/${noteId}/`);
  };

  const handleDeleteNoteOnClick = (): void => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote({ noteId, authToken });
    }
  };

  return (
    <div className="bg-yellow-100 w-full flex flex-col items-center rounded-md p-2">
      <h2 onClick={handleViewNoteOnClick} className="font-semibold w-full text-center p-2 overflow-ellipsis overflow-hidden whitespace-nowrap cursor-pointer">
        {title}
      </h2>
      <p
        dangerouslySetInnerHTML={{ __html: content.substring(0, 100) + "..." }}
        className="text-[0.6rem] p-2 overflow-ellipsis overflow-hidden w-full text-justify whitespace-nowrap"
      ></p>

      <div className="flex flex-row pt-1 w-full justify-between">
        {/** Date & priority */}
        <div className="flex flex-row items-center justify-center p-1">
          <p className="text-[0.5rem] italic p-1">
            {updatedAt.substring(0, 10)}
          </p>
          <div
            className={`w-2 h-2 rounded-xl ml-1 ${priorityColorMap[priority]}`}
          ></div>
        </div>

        {/** Options/buttons */}
        <div className="flex flex-row gap-2 p-1 text-[0.5rem]">
          <div
            onClick={handleEditNoteOnClick}
            className="hover:bg-yellow-500 rounded-full p-1 cursor-pointer"
          >
            <AiOutlineEdit size={20} />
          </div>
          <div
            onClick={handleDeleteNoteOnClick}
            className="hover:bg-red-400 rounded-full p-1 cursor-pointer"
          >
            <AiOutlineDelete size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

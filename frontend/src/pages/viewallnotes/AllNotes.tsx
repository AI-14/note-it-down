import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { GrAddCircle } from "react-icons/gr";

import { NotesServiceAPI } from "../../services/notesService";
import { useUserStore } from "../../stores/userStore";
import { NoteCard } from "./components/NoteCard";

export const AllNotes = (): JSX.Element => {
  const authToken = useUserStore((state) => state.authToken);
  const navigate = useNavigate();

  const [filterPriority, setFilterPriority] = useState<string>("A");

  const { data: allnotes, isError } = useQuery(
    ["allNotes", authToken, filterPriority],
    () => NotesServiceAPI.getAllNotes(authToken!, filterPriority)
  );

  const onPriorityChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setFilterPriority(e.target.value);
  };

  const handleAddNoteOnClick = (): void => {
    navigate("/createnote/");
  };

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h1>OOPS. An error occured! Something went wrong</h1>
      </div>
    );
  }

  return (
    <div className=" bg-white dark:bg-slate-800 dark:shadow-md dark:shadow-gray-700 max-w-[720px] w-[98%] flex flex-col items-center gap-y-8 p-4 mt-2 rounded-xl shadow-md shadow-gray-400">
      <div className="flex justify-between items-center w-full border-b-[1px] border-b-gray-500 p-2 dark:text-slate-200">
        <p>Total: {allnotes?.total_notes}</p>
        <div
          onClick={handleAddNoteOnClick}
          className="text-sm bg-primary hover:bg-primaryaccent p-2 rounded-full cursor-pointer"
        >
          <GrAddCircle />
        </div>
      </div>

      {/** Priority filter options  */}
      <div>
        <div className="flex justify-center gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="high" className="text-blue-500 font-semibold">
              All
            </label>
            <input
              type="radio"
              name="All"
              id="all"
              value={"A"}
              checked={filterPriority === "A"}
              onChange={onPriorityChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="high" className="text-red-500 font-semibold">
              High
            </label>
            <input
              type="radio"
              name="High"
              id="high"
              value={"H"}
              checked={filterPriority === "H"}
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
              checked={filterPriority === "M"}
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
              checked={filterPriority === "L"}
              onChange={onPriorityChange}
            />
          </div>
        </div>
      </div>

      {/** Showing all note cards */}
      {allnotes?.notes.map((note) => (
        <NoteCard
          key={note.id}
          noteId={note.id}
          title={note.title}
          slugTitle={note.slug}
          content={note.content}
          updatedAt={note.updated_at}
          priority={note.priority}
        />
      ))}
    </div>
  );
};

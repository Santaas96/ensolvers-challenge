import React from "react";
import NoteForm from "./NoteForm";
import { SERVER_URL } from "../../config";
import { toast } from "sonner";

const NoteCard = ({ info, categories, getNotes }) => {
  const onDelete = async () => {
    const promise = () =>
      new Promise((resolve) => {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
        fetch(`${SERVER_URL}/notes/${info.id}`, options)
          .then((data) => data.json())
          .then((res) => resolve(res));
      });

    toast.promise(promise, {
      loading: "Deleting Note, please wait until completion.",
      success: (data) => {
        return `Success deleting Note!`;
      },
      error: "Something went wrong, try again later.",
    });

    setTimeout(() => {
      getNotes();
    }, 2000);
  };

  const onArchive = async () => {
    const promise = () =>
      new Promise((resolve) => {
        const body = {
          newNote: { archived: !info.archived, id: info.id },
          categories: info.categories ? info.categories.map((c) => c.id) : [],
        };
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(body),
        };
        fetch(`${SERVER_URL}/notes`, options)
          .then((data) => data.json())
          .then((res) => resolve(res));
      });

    toast.promise(promise, {
      loading: "Updating Note, please wait until completion.",
      success: (data) => {
        return "Success updating Note!";
      },
      error: "Something went wrong, try again later.",
    });

    setTimeout(() => {
      getNotes();
    }, 2000);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg py-2 px-3 flex flex-col w-full gap-1">
        <div className="flex gap-1 flex-wrap">
          {info.categories?.map((cat) => (
            <span
              key={cat.id}
              className="text-xs bg-indigo-800 text-w rounded-full px-2 py-1"
            >
              {cat.name?.toUpperCase()}
            </span>
          ))}
        </div>
        <div className="text-gray-700 flex justify-between">
          <span className="pr-2">{info.description}</span>
          <div className="flex items-end flex-col justify-start">
            <NoteForm
              title={"Update Note"}
              initial={info}
              categories={categories}
              getNotes={getNotes}
            >
              <span className="cursor-pointer text-[#646cff]">Edit</span>
            </NoteForm>
            {!info.archived ? (
              <span className="text-[#fa0] cursor-pointer" onClick={onArchive}>
                Archive
              </span>
            ) : (
              <span
                className="text-[#37be49] cursor-pointer"
                onClick={onArchive}
              >
                Unarchive
              </span>
            )}

            <span className="text-[#f00] cursor-pointer" onClick={onDelete}>
              Delete
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;

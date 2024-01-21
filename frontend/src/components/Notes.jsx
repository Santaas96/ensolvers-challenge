import { useState } from "react";
import NoteCard from "./NoteCard";

const Notes = ({ info, categories, getNotes, isSelected }) => {
  const [selectedCat, setSelectedCat] = useState("");

  if (!isSelected) {
    info = info.filter((i) => !i.archived);
  }

  if (selectedCat) {
    info = info.filter((i) => {
      let filtered = false;
      i.categories.map((c) => {
        if (c.id === selectedCat && !filtered) {
          filtered = true;
        }
      });
      return filtered;
    });
  }

  return (
    <>
      <div className="mt-2 flex flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <h4 className="text-slate-400">Category Filters</h4>
          {selectedCat ? (
            <span
              className="pt-1 text-xs text-w rounded-full px-1.5 py-0.5 border-[#ff0000b8] text-[#ff0000b8] cursor-pointer"
              onClick={() => setSelectedCat("")}
            >
              Clear Filters
            </span>
          ) : null}
        </div>
        <div className="flex gap-1 mt-1 mb-2 flex-wrap">
          {categories.map((c) => {
            return (
              <span
                key={c.id}
                className={`text-[10px] text-w rounded-full px-2 py-1 border-1 border-yellow-500 ${
                  c.id === selectedCat
                    ? "text-slate-800 bg-yellow-500"
                    : "text-yellow-500 bg-slate-800"
                } cursor-pointer`}
                onClick={() => setSelectedCat(c.id)}
              >
                {c.name?.toUpperCase()}
              </span>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3 my-3 overflow-auto md:h-[73vh] xl:h-[75vh]">
        {info.map((i) => {
          return (
            <NoteCard
              key={i.id}
              info={i}
              categories={categories}
              getNotes={getNotes}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;

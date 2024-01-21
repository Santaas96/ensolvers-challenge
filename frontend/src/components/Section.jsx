import React from "react";
import { SERVER_URL } from "../../config";
import { useState, useEffect } from "react";
import Notes from "./Notes";
import Categories from "./Categories";
import NoteForm from "./NoteForm";
import CategoriesForm from "./CategoriesForm";
import { Toaster } from "sonner";
import { Checkbox } from "@nextui-org/react";

const Section = ({ menu }) => {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const getNotes = async () => {
    if (!notes || menu === "notes") {
      setLoading(true);
      const info = await fetch(`${SERVER_URL}/notes`);
      const parsedInfo = await info.json();
      setNotes(parsedInfo.data);
      setLoading(false);
    }
  };

  const getCategories = async () => {
    if (!categories || menu === "categories") {
      setLoading(true);
      const cat = await fetch(`${SERVER_URL}/categories`);
      const info = await cat.json();
      setCategories(info.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      getNotes();
      getCategories();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, [menu]);

  return (
    <section className="flex-1 mx-8">
      <Toaster position="bottom-center" richColors />
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <h2 className="text-4xl pb-1">{menu.toUpperCase()}</h2>
            {categories ? (
              menu === "notes" ? (
                <NoteForm
                  title={"New Note"}
                  initial={{}}
                  categories={categories}
                  getNotes={getNotes}
                >
                  <div className="font-medium text-center px-2 pb-0.5 text-xl rounded-lg text-[#646cff] cursor-pointer border border-[#646cff]">
                    NEW
                  </div>
                </NoteForm>
              ) : (
                <CategoriesForm
                  title={"New Category"}
                  initial={{}}
                  getCategories={getCategories}
                >
                  <div className="font-medium text-center px-2 pb-0.5 text-xl rounded-lg text-[#646cff] cursor-pointer border border-[#646cff]">
                    NEW
                  </div>
                </CategoriesForm>
              )
            ) : null}
          </div>
          {menu === "notes" ? (
            <div>
              <Checkbox
                color="warning"
                isSelected={isSelected}
                onValueChange={setIsSelected}
              >
                <span className="text-slate-300">Show archived</span>
              </Checkbox>
            </div>
          ) : null}
        </div>
        <div className="flex-1 w-full">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <svg
                style={{
                  shapeRendering: "auto",
                }}
                width="50px"
                height="50px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  stroke="#bf78f5"
                  strokeWidth="10"
                  r="35"
                  strokeDasharray="164.93361431346415 56.97787143782138"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                  ></animateTransform>
                </circle>
              </svg>
            </div>
          ) : categories && notes ? (
            menu === "notes" ? (
              <Notes
                info={notes}
                categories={categories}
                getNotes={getNotes}
                isSelected={isSelected}
              />
            ) : (
              <Categories info={categories} getCategories={getCategories} />
            )
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Section;

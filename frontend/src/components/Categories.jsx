import React from "react";
import CategoriesCard from "./CategoriesCard";

const Categories = ({ info, getCategories }) => {
  return (
    <>
      <div className="flex flex-col gap-3 my-3 overflow-auto h-[83.5vh]">
        {info.map((i) => (
          <CategoriesCard key={i.id} info={i} getCategories={getCategories}/>
        ))}
      </div>
    </>
  );
};

export default Categories;

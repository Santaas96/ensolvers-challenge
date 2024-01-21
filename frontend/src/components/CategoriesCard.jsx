import React from "react";
import CategoriesForm from "./CategoriesForm";
import { SERVER_URL } from "../../config";
import { toast } from "sonner";

const CategoriesCard = ({ info, getCategories }) => {
  const onDelete = async () => {
    const promise = () =>
      new Promise((resolve) => {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        };
        fetch(`${SERVER_URL}/categories/${info.id}`, options)
          .then((data) => data.json())
          .then((res) => resolve(res));
      });

    toast.promise(promise, {
      loading: "Deleting Category, please wait until completion.",
      success: (data) => {
        return `Success deleting Category!`;
      },
      error: "Something went wrong, try again later.",
    });

    setTimeout(() => {
      getCategories();
    }, 2000);
  };

  return (
    <div className="text-gray-700 flex justify-between bg-white shadow-md rounded-lg py-2 px-3">
      <span className="pr-2">{info.name?.toUpperCase()}</span>
      <div className="flex items-end flex-col justify-start">
        <span className="text-[#f00] cursor-pointer" onClick={onDelete}>
          Delete
        </span>
        <CategoriesForm
          title={"Update Category"}
          initial={info}
          getCategories={getCategories}
        >
          <span className="cursor-pointer text-[#646cff]">Edit</span>
        </CategoriesForm>
      </div>
    </div>
  );
};

export default CategoriesCard;

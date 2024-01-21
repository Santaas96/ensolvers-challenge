import React from 'react';
import reactLogo from "../assets/react.svg";

const Aside = ({setMenu}) => {
  return (
    <>
      <aside className="w-[300px] border-r-2 border-[#646cff59] h-full">
        <div className="flex items-center gap-3">
          <img src={reactLogo} className="logo react h-16" alt="React logo" />
          <h1 className="text-[22px]">Ensolvers NotePad</h1>
        </div>
        <div className="text-lg mt-10 flex">
          <div className="flex flex-col gap-4">
            <h3
              onClick={() => setMenu("notes")}
              className="hover:underline cursor-pointer"
            >
              Notes
            </h3>
            <h3
              onClick={() => setMenu("categories")}
              className="hover:underline cursor-pointer"
            >
              Categories
            </h3>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Aside;

import React from 'react';
import reactLogo from "../assets/react.svg";

const Aside = ({setMenu}) => {
  return (
    <>
      <aside className="md:w-[300px] md:border-r-2 border-[#646cff59] md:h-full">
        <div className="flex items-center gap-3">
          <img src={reactLogo} className="logo react h-16" alt="React logo" />
          <h1 className="text-[22px]">Ensolvers NotePad</h1>
        </div>
        <div className="md:mt-10 mt-4 flex">
          <div className="flex md:flex-col gap-6 justify-end w-full">
            <h3
              onClick={() => setMenu("notes")}
              className="hover:underline cursor-pointer text-2xl text-cyan-200"
            >
              Notes
            </h3>
            <h3
              onClick={() => setMenu("categories")}
              className="hover:underline cursor-pointer text-2xl text-cyan-200"
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

import { useState } from "react";
import "./App.css";
import Aside from "./components/Aside";
import Section from "./components/Section";

function App() {
  const [menu, setMenu] = useState("notes");

  return (
    <>
      <div className="w-full h-full flex md:flex-row flex-col md:border-r-2 border-[#646cff59]">
        <Aside setMenu={setMenu} />
        <Section menu={menu} />
      </div>
    </>
  );
}

export default App;

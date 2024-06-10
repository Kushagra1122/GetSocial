import React from "react";
import Home from "../pages/Home";
import Menus from "./Menus";
import { useTheme } from "../context/Theme";



const Sidebar = () => {
const [theme] = useTheme();

  return (
    <div>
      <div>
        <aside
          className={`fixed top-0 left-0 h-screen 
            w-56 `}
        >
          <div
            className="h-full px-3 py-4 overflow-y-auto bg-gray-50 border-e border-black"
            id={theme}
          >
            <div className="text-center text-2xl ">
              Get Social
            
              <Menus />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;

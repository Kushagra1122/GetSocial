import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { FiPlusSquare } from "react-icons/fi";
import { useAuth } from "../context/auth";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";
import { useTheme } from "../context/Theme";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";
function Menus() {
    const[auth,setAuth]=useAuth('')
    const [open, setOpen] = useState(false);
const navigate=useNavigate()
 const [theme, setTheme] = useTheme();
 const handleTheme = () => {
   setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
 };
 
    const handleOpen = () => {
      setOpen(!open);
    };
     const logout = () => {
       setAuth({
         ...auth,
         user: null,
         token: "",
       });

    
       localStorage.removeItem("auth");

       toast.success("You have logged out ");
       navigate("/login");
     };
  return (
    <div className="cursor-pointer flex flex-col items-center my-10 ">
      <div className=" cursor-pointer flex flex-col gap-10 items-center justify-center ">
        <div className="flex text-lg gap-2 items-end ">
          <AiOutlineHome size={30} />
          <span>Home</span>
        </div>
        <div className="flex text-lg gap-2 items-end ">
          <IoSearch size={30} />
          <span>Search</span>
        </div>
        <div className="flex text-lg gap-2 items-end ">
          <LuSend size={30} />
          <span>Message</span>
        </div>
        <div className="flex text-lg gap-2 items-end ">
          <FiPlusSquare size={30} />
          <span>Create</span>
        </div>
        <Link to="/profile" className="flex text-lg gap-2 items-end ">
          {auth?.user?.profile === "" ? (
          
              <CgProfile size={30}/>
          
          ) : (
            <div>
              <img src={`${auth?.user?.profile}`} alt="profile" />
            </div>
          )}
          <span>Profile</span>
        </Link>
        <div>
          {open ? (
            <div className=" cursor-pointer flex flex-col gap-10  border border-black p-10 rounded-xl " id={theme}>
              <div className="flex text-lg gap-2 items-end ">
                <CiSettings size={30} />
                <span>Setting</span>
              </div>
              <div onClick={handleTheme}>
                {theme === "light" ? (
                  <div className="flex text-lg gap-2 items-end ">
                    <BsFillMoonStarsFill size={30} />
                    <span>dark</span>
                  </div>
                ) : (
                  <div className="flex text-lg gap-2 items-end ">
                    <BsFillSunFill size={30} />
                    <span>light</span>
                  </div>
                )}
              </div>
              <div className="flex text-lg gap-2 items-end " onClick={logout}>
                <BiLogOut size={30} />
                <span>Logout</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div
          className={`flex text-lg gap-2 items-end ${open ? "" : "mt-60"} `}
          onClick={handleOpen}
        >
          {open ? (
            <AiOutlineMenuFold size={30} className=" cursor-pointer" />
          ) : (
            <GiHamburgerMenu size={30} className=" cursor-pointer" />
          )}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default Menus;

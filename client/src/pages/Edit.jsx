import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import { useTheme } from '../context/Theme';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Edit = () => {
     const [auth, setAuth] = useAuth();
  const [name, setname] = useState(`${auth?.user?.name}`);
  const [username, setusername] = useState(auth.user?.username);

    const [about, setabout] = useState(`${auth?.user?.about}`);
     const [theme] = useTheme();
  return (
    <div id={theme}>
      <Sidebar />
      <div className="ml-72 h-screen flex flex-col gap-5 justify-center items-center">
        <div className="flex flex-col items-center">
          {auth?.user?.profile === "" ? (
            <div className=" border border-black rounded-full h-40 w-40 bg-gray-200 flex items-center justify-center my-5 mx-20">
              <img
                src="images/noProfile.png"
                className="h-28 w-28"
                alt="profile"
              />
            </div>
          ) : (
            <div>
              <img src={`${auth?.user?.profile}`} alt="profile" />
            </div>
          )}
          <button className="w-60 h-10  rounded-full border border-black bg-blue-400 hover:bg-white  ">
            change photo
          </button>
        </div>
        <form>
          <div className="flex flex-col items-center ">
            <input
              className="w-72  h-10 p-5 rounded-xl border border-black bg-gray-400 "
              type="text"
              placeholder="Name"
              required="required"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-center m-5">
            <input
              className="w-72  h-10 p-5 rounded-xl border border-black bg-gray-400 "
              type="text"
              placeholder="Username"
              required="required"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="flex flex-col  m-5">
            <textarea
              className="w-72 input  h-10 p-5 rounded-xl border border-black bg-gray-400 "
              type="text"
              placeholder="About"
              required="required"
              value={about}
              onChange={(e) => setabout(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center ">
            <button className=" px-4 py-2 rounded-full border border-black bg-blue-400 hover:bg-white  ">
              Update
            </button>
            <button className=" px-4 py-2 rounded-full border border-black bg-blue-400 hover:bg-white  ">
              Change password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit

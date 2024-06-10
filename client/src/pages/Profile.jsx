import React from 'react'
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/auth';
import { FaCamera } from "react-icons/fa";
import { useTheme } from '../context/Theme';
import { Link } from 'react-router-dom';

const Profile = () => {
     const [auth, setAuth] = useAuth("");
     const [theme] = useTheme();
  return (
    <div id={theme}>
      <Sidebar />
      <div className="ml-72">
        <div className="flex">
          {auth?.user?.profile === "" ? (
            <div className=" border border-black rounded-full h-40 w-40 bg-gray-200 flex items-center justify-center my-20 mx-20">
             
              <img src='images/noProfile.png' className="h-28 w-28" alt="profile" />
            </div>
          ) : (
            <div>
              <img src={`${auth?.user?.profile}`} alt="profile" />
            </div>
          )}
          <div className="flex flex-col mx-16 gap-5">
            <div className="text-xl mt-16 mb-2 flex items-center">
              <span>{auth?.user?.username}</span>

              <Link to="/edit" className=" mx-10 bg-gray-400  rounded-xl px-5 py-1 hover:bg-gray-500">
                Edit profile
              </Link>
            </div>
            <div className="flex gap-10 text-lg">
              <span>{auth?.user?.posts.length} posts</span>
              <span>{auth?.user?.followers.length} followers</span>
              <span>{auth?.user?.following.length} following</span>
            </div>
            <div>
              <span>{auth?.user?.name}</span>
            </div>
            <div>
              <span>{auth?.user?.about}</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className=" ml-44 text-xl h-screen width flex justify-center ">
        Posts
      </div>
    </div>
  );
}

export default Profile

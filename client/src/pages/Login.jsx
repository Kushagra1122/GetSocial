import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Login = () => {
 
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
const navigate = useNavigate();
const [auth, setAuth] = useAuth();
useEffect(() => {
  if (auth.user !== null) {
    navigate("/");
  }
});

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         
          email,
         
          password,
        }),
      });

      console.log(response);
      const res = await response.json();
      console.log(res);
      if (response.ok) {
        toast.success(res.message);
        navigate(`/otp/${res.id}`);
      
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gradient-to-bl from-blue-700 via-pink-500 to-yellow-400">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-white  w-80 rounded-xl shadow-lg shadow-black p-5 ">
          <div className="flex flex-col gap-5 items-center m-5 ">
            <span className="text-2xl">Welcome Back</span>
            <span className="text-sm text-center">
              Enter your credintials to get logged in
            </span>
          </div>

          <form onSubmit={onSubmitHandler}>
            <div className="flex flex-col items-center m-5">
              <input
                className="w-72  h-10 p-5 rounded-xl border border-black bg-pink-100 "
                type="text"
                placeholder="Email"
                required="required"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center m-5">
              <input
                className="w-72 input input-bordered h-10 p-5 rounded-xl border border-black bg-pink-100 "
                type="password"
                placeholder="Password"
                required="required"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center m-5">
              <button className="w-72 h-10  rounded-full border border-black bg-pink-400 hover:bg-white  ">
                Login
              </button>
            </div>
            <div className="flex flex-col items-center m-5">
              <Link
                to="/signup"
                className="text-blue-700 cursor-pointer hover:underline"
              >
                Don't have a account ?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login

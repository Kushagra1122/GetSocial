import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Otp = () => {
    const[otp,setotp]=useState("")
  const { id } = useParams();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    if (auth.user !== null) {
      navigate("/");
    }
  });
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
          const response = await fetch(`http://localhost:3000/api/auth/otp/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
             otp
            }),
          });

          console.log(response);
          const res = await response.json();
          console.log(res);
          if (response.ok) {
             setAuth({
               ...auth,
               user: res.user,
               token: res.token,
             });
             localStorage.setItem("auth", JSON.stringify(res));
             toast.success("login successfull");
            navigate(`/`);
         
            setotp("");
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          console.log(error);
        }
    }
  return (
    <div className="bg-gradient-to-bl from-blue-700 via-pink-500 to-yellow-400">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-white  w-80 rounded-xl shadow-lg shadow-black p-5">
          <header className= " text-center mb-8">
            <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
            <p className="text-[15px] text-slate-500">
              Enter the 6-digit verification code that was sent Email.
            </p>
          </header>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center m-5">
              <input
                className="w-72  h-10 p-5 rounded-xl border border-black bg-pink-100 "
                type="text"
                placeholder="otp"
                required="required"
          maxLength={6}
          value={otp}
          onChange={(e)=>setotp(e.target.value)}
              />
            </div>
            <div className="max-w-[260px] mx-auto mt-4">
              <button
                type="submit"
                className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
              >
                Verify Account
              </button>
            </div>
          </form>
          <div className="text-sm text-slate-500 mt-4">
            Didn't receive code?{" "}
            <a
              className="font-medium text-indigo-500 hover:text-indigo-600"
              href="#0"
            >
              Resend
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp

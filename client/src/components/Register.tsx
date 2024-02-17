import Axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register({}) {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("manager");

  function handleToastDismiss(id) {
    toast.dismiss(id);
    navigate("/login");
  }

  function handleRegister(e) {
    e.preventDefault();

    Axios.post("http://localhost:3001/api/register", {
      postUsername: username,
      postPassword: password,
      postRole: role,
    }).then((response) => {
      console.log(response);
    });

    toast((t) => (
      <span className="text-green-700">
        Username <b>{username}</b> is registered!
        <button
          onClick={() => handleToastDismiss(t.id)}
          className="text-slate-900 bg-slate-100 rounded-md px-4 py-2 ml-2"
        >
          Log in
        </button>
      </span>
    ));
  }

  return (
    <div className="w-screen flex justify-center">
      <form
        onSubmit={handleRegister}
        className="flex flex-col w-[400px] justify-center items-center bg-slate-50 p-8 rounded-2xl mt-5"
      >
        <h1 className="font-bold text-2xl mt-3 mb-7">Sign Up</h1>
        <label
          htmlFor="username"
          className="font-semibold text-md text-slate-700"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="border-2 border-gray-400 rounded-md px-5 py-1 my-3 w-[100%]"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label
          htmlFor="password"
          className="font-semibold text-md text-slate-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 border-gray-400 rounded-md px-5 py-1 my-3 w-[100%]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="role" className="font-semibold text-md text-slate-700">
          Role
        </label>
        <select
          name="role"
          id="role"
          className="border-2 border-gray-400 rounded-md px-5 py-1 my-3 w-[100%]"
          onChange={(e) => setRole(e.target.value)}
          value={role}
        >
          <option value="manager" >Manager</option>
          <option value="receptionist">Receptionist</option>
        </select>
        <button
          type="submit"
          className="bg-slate-200 px-9 py-3 rounded-lg mt-4 w-[100%] hover:bg-slate-300 transition-all "
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

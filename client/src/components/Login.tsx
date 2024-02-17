import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({}) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [sessionUsername, setSessionUsername] = useState("");
  const [sessionRole, setSessionRole] = useState("");

  Axios.defaults.withCredentials = true;

  function handleLogin(e) {
    e.preventDefault();

    Axios.post("http://localhost:3001/api/login", {
      postUsername: username,
      postPassword: password,
    }).then((response) => {
      console.log(response);
      if (response.data.success) {
        setLoggedIn(true);
        setResponseMessage("Hello, " + username + " you are logged in!");
      } else if (response.data.status == 401) {
        setResponseMessage("Username or password is incorrect!");
      } else if (response.data.status == 402) {
        setResponseMessage("Username doesn't exist!");
      }
    });
  }

  function handleLogOut() {
    Axios.post("http://localhost:3001/api/login/destroy").then((response) => {
      console.log(response);
      if (response.data.success) {
        setLoggedIn(false);
        setResponseMessage("You are logged out!");
      }
    });
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/api/plate/getRole").then((response) => {
      console.log(response);
      setLoggedIn(response.data.loggedIn);
      setSessionRole(response.data.role);
      setSessionUsername(response.data.username);
    });
  }, [responseMessage]);

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      {!loggedIn && (<form
        onSubmit={handleLogin}
        className="flex flex-col w-[400px] justify-center items-center bg-slate-50 p-8 rounded-2xl mt-5"
      >
        <h1 className="font-bold text-2xl mt-3 mb-7">Login</h1>
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
        <button
          type="submit"
          className="bg-slate-200 px-9 py-3 rounded-lg mt-4 w-[100%] hover:bg-slate-300 transition-all "
        >
          Log in
        </button>
      </form>)}

      <h2
        className={`mt-3 font-semibold text-2xl ${
          loggedIn ? "text-green-600" : "text-red-600"
        }`}
      >
        {responseMessage}
        {loggedIn && (
          <p>
            Hello, {sessionUsername}, you are logged in as a {sessionRole}.
          </p>
        )}
      </h2>

      <button
        onClick={handleLogOut}
        className="px-10 py-3 bg-red-950/80 rounded-lg text-white text-lg m-7 hover:bg-red-950/60 transition-all"
      >
        Log Out
      </button>
    </div>
  );
}

export default Login;

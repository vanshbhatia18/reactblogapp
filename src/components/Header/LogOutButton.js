import React from "react";
import { useDispatch } from "react-redux";
import AuthService from "../../appwrite/auth.js";
import { logout } from "../../store/AuthSlice.js";

function LogOutButton() {
  const dispach = useDispatch();
  const logoutHandler = () => {
    AuthService.logout().then(() => {
      dispach(logout());
    });
  };

  return (
    <div>
      <button
        onClick={logoutHandler}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      ></button>
    </div>
  );
}

export default LogOutButton;

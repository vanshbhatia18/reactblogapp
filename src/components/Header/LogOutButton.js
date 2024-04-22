import React from "react";
import {  useDispatch } from "react-redux";
import {AuthService } from "../../appwrite/auth.js";
import  { logout } from "../../store/AuthSlice.js";

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
        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      ></button>
    </div>
  );
}

export default LogOutButton;

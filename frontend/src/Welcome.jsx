import React from "react";
import { Link } from "react-router-dom";
import bgImg from "../src/assets/bgImg.png";

const Welcome = () => {
  return (
    <div className="flex items-center justify-around">
      <div className="flex flex-col gap-4">
        <div className="text-4xl font-bold leading-6 text-white">
          Welcome To Smart City Portal
        </div>
        <div className="flex mt-5 items-center gap-4">
          <Link to={"/register"}>
            <div className="bg-purple-900 px-4 py-3 rounded-lg text-white text-base font-bold hover:bg-transparent hover:border-2 hover:border-purple-900">
              Sign Up
            </div>
          </Link>
          <Link to={"/login"}>
            <div className="bg-purple-900 px-4 py-3 rounded-lg text-white text-base font-bold hover:bg-transparent hover:border-2 hover:border-purple-900">
              Login
            </div>
          </Link>
        </div>
      </div>
      <img src={bgImg} className="w-1/2 " alt="" />
    </div>
  );
};

export default Welcome;

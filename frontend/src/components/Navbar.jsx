import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-pink-700 shadow-md">
      <div className="max-w-screen-lg mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-semibold">
          Smart City
        </Link>
        <div className="flex gap-4">
          {/* <Link
            to="/complaints"
            className="text-white hover:text-purple-200 transition-colors"
          >
            Forum
          </Link>
          <Link
            to="/addcomplaint"
            className="text-white hover:text-purple-200 transition-colors"
          >
            Raise a Complaint
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

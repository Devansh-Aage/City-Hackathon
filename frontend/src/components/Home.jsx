import React from "react";
import { useNavigate, Link } from "react-router-dom";
import ComplaintList from "./ComplaintList";
import ComplaintForm from "./ComplaintForm";

const Home = ({ user }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToMapPage = () => {
    navigate("/map");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-fuchsia-800 via-fuchsia-600 to-pink-700">
      <div className="w-full p-4 sticky top-0 bg-pink-700 shadow-md">
        <div className="max-w-screen-lg mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-semibold">
            Smart City
          </Link>
          {user && (
            <div className="flex items-center gap-4 bg-purple-50 rounded-lg p-2">
              <div className="text-base font-semibold">{user?.name}</div>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-5 w-full max-w-screen-lg">
        <button
          onClick={goToMapPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition-colors"
        >
          Go to Map
        </button>
        {!user?.isAdmin && <ComplaintForm user={user} />}
        <ComplaintList user={user} />
      </div>
    </div>
  );
};

export default Home;

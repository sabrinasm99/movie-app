import React from "react";
import movie from "../../../assets/movie.svg";
import styles from "./styles/index.module.css";
import { useCreateGuestSession, useRequestToken } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const requestToken = useRequestToken();
  const { refetch: refetchGuestSession } = useCreateGuestSession();
  const navigate = useNavigate();

  const handleLoginWithTMDB = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    requestToken.mutate();
  };

  const handleContinueAsGuest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    refetchGuestSession();
    navigate("/");
  };

  return (
    <div className="flex grow">
      <div className="hidden md:flex md:w-1/2 xl:w-3/5 bg-blue-900 justify-center items-center">
        <img src={movie} alt="movie" className="w-4/5" />
      </div>
      <div className="w-full md:w-1/2 xl:w-2/5 flex bg-gray-50">
        <div className="m-auto w-2/3">
          <h3 className="text-2xl text-center text-blue-900 font-medium">
            Welcome to Movie App!
          </h3>
          <button
            className={styles["btn-submit"]}
            onClick={handleLoginWithTMDB}
          >
            LOGIN WITH TMDB
          </button>
          <div className="flex items-center my-3">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            className={styles["btn-guest"]}
            onClick={handleContinueAsGuest}
          >
            CONTINUE AS GUEST
          </button>
        </div>
      </div>
    </div>
  );
}

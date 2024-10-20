import { useEffect, useState } from "react";
import styles from "./styles/Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useGetAccountDetails } from "../../profile/api";
import { useSessionStore } from "../../../store/useSessionStore";
import { useLogout } from "../../auth/api";

export default function Header() {
  const [sticky, setSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const sessionId = useSessionStore((state: any) => state.sessionId);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const logoutMutation = useLogout();
  const { data: account, isLoading, isError, refetch } = useGetAccountDetails();

  const trackScroll = () => {
    if (typeof window === "undefined") {
      return;
    } else {
      setSticky(window.scrollY >= 80);
    }
  };

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    setOpenDropdown(!openDropdown);
  };

  const handleViewProfile = () => {
    if (pathname !== "/profile") navigate("/profile");
    setOpenDropdown(!openDropdown);
  };

  useEffect(() => {
    document.addEventListener("scroll", trackScroll);

    return () => {
      document.removeEventListener("scroll", trackScroll);
    };
  }, []);

  useEffect(() => {
    refetch();
  }, [sessionId]);

  return (
    <div className={sticky ? styles["header-sticky"] : styles["header"]}>
      <div className="w-4/5 mx-auto flex">
        <h1
          className="text-3xl text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          Movie App
        </h1>
        {!isLoading && !isError && sessionId && (
          <div className="ml-auto block sm:flex items-center text-white">
            <p className="mr-1 text-lg text-right sm:text-left">Hello,</p>
            <div className="relative">
              <div
                onClick={handleDropdown}
                className="flex px-1 hover:border-gray-200 hover:border rounded-md cursor-pointer border border-blue-900"
              >
                <p className="text-lg">{account.username}</p>
                <div className="ml-1 flex items-center">
                  <FaAngleDown className="text-lg" />
                </div>
              </div>
              {openDropdown && (
                <>
                  <div className="z-10 absolute top-9 right-0 bg-white border border-gray-200 rounded-md ">
                    <p
                      onClick={handleViewProfile}
                      className="text-gray-700 cursor-pointer px-5 border-b border-gray-200 py-1 font-medium hover:bg-gray-200"
                    >
                      View Profile
                    </p>
                    <p
                      onClick={handleLogout}
                      className="text-red-500 cursor-pointer px-5 py-1 font-medium hover:bg-gray-200"
                    >
                      Logout
                    </p>
                  </div>
                  <div
                    onClick={() => setOpenDropdown(!openDropdown)}
                    className="fixed top-0 left-0 h-full w-full"
                  />
                </>
              )}
            </div>
          </div>
        )}
        {(isError || !sessionId) && (
          <div className="ml-auto flex items-center tracking-wide font-medium text-lg">
            <button
              className={styles["btn-login"]}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

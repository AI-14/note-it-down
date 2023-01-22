import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserEdit } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { TiUserDeleteOutline } from "react-icons/ti";
import { useMutation } from "react-query";

import { useUserStore } from "../../../stores/userStore";
import { UserServiceAPI } from "../../../services/userService";

export const CommonHeader = (): JSX.Element => {
  const userState = useUserStore((state) => state);
  const navigate = useNavigate();

  const { mutate: deleteUser } = useMutation(UserServiceAPI.deleteUser, {
    onSuccess: (_) => {
      localStorage.removeItem("userId");
      localStorage.removeItem("authToken");
      localStorage.removeItem("email");

      userState.setId("");
      userState.setEmail("");
      userState.setAuthToken("");
      userState.setIsAuthenticated(false);

      toast.success("User deleted successfully.", {
        style: { fontSize: "0.7rem" },
      });
      navigate("/signup", { replace: true });
    },
    onError: (_) => {
      toast.error("Something went wrong.", {
        style: { fontSize: "0.7rem" },
      });
    },
  });

  const handleLogoutOnClick = (): void => {
    localStorage.removeItem("userId");
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");

    userState.setId("");
    userState.setEmail("");
    userState.setAuthToken("");
    userState.setIsAuthenticated(false);

    toast.success("Logout successful.", {
      style: { fontSize: "0.7rem" },
    });

    navigate("/login", { replace: true });
  };

  const handleUserEditOnClick = (): void => {
    navigate("/updatecredentials");
  };

  const handleDeleteUserAccountOnClick = (): void => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteUser(userState.authToken);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 dark:shadow-md dark:shadow-gray-700 max-w-[720px] w-[98%] h-[7rem] flex flex-col p-4 justify-between items-center mt-2 rounded-xl shadow-md shadow-gray-400">
      <h1 className="text-md sm:text-xl w-[85%] text-center overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-slate-200">
        <Link to="/" replace className="text-yellow-400 italic font-bold">
          NoteItDown
        </Link>
        {" : "}
        {userState.email}
      </h1>
      <div className="flex justify-evenly gap-2">
        <div
          onClick={handleUserEditOnClick}
          className="bg-primary hover:bg-primaryaccent p-1 rounded-full flex justify-center"
        >
          <FaUserEdit size={20} />
        </div>

        <div
          onClick={handleLogoutOnClick}
          className="p-1 rounded-full bg-yellow-300 hover:bg-yellow-500 flex justify-center"
        >
          <TbLogout size={20} />
        </div>

        <div
          onClick={handleDeleteUserAccountOnClick}
          className="p-1 rounded-full bg-red-400 hover:bg-red-500 flex justify-center"
        >
          <TiUserDeleteOutline size={20} />
        </div>
      </div>
    </div>
  );
};

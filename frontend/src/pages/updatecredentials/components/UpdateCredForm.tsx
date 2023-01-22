import React, { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import validator from "validator";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

import { UpdateUserCredentials } from "../../../services/types";
import { UserServiceAPI } from "../../../services/userService";
import { useUserStore } from "../../../stores/userStore";

export const UpdateCredForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [, setPassword2] = useState<string>("");

  const [emailError, setEmailError] = useState<boolean>(true);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");

  const [passwordError, setPasswordError] = useState<boolean>(true);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>("");

  const [password2Error, setPassword2Error] = useState<boolean>(true);
  const [password2ErrorMsg, setPassword2ErrorMsg] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const userState = useUserStore((state) => state);

  const navigate = useNavigate();

  const { mutate: updateCreds } = useMutation(
    UserServiceAPI.updateUserCredentials,
    {
      onSuccess: (_) => {
        setLoading(false);
        toast.success("Credentials updated successful", {
          style: { fontSize: "0.7rem" },
        });

        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.removeItem("authToken");

        userState.setId("");
        userState.setEmail("");
        userState.setAuthToken("");
        userState.setIsAuthenticated(false);

        navigate("/login", { replace: true });
      },
      onError: (error: any) => {
        setLoading(false);
        if (error.response?.data) {
          toast.error("Email already exists.", {
            style: { fontSize: "0.7rem" },
          });
        } else {
          toast.error("Something went wrong. Please try again.", {
            style: { fontSize: "0.7rem" },
          });
        }
      },
    }
  );

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length === 0) {
      setEmailError(true);
      setEmailErrorMsg("Email should not be an empty.");
    } else if (!validator.isEmail(e.target.value)) {
      setEmailError(true);
      setEmailErrorMsg("Please enter a valid email.");
    } else {
      setEmail(e.target.value);
      setEmailError(false);
      setEmailErrorMsg("");
    }
  };

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length === 0) {
      setPasswordError(true);
      setPasswordErrorMsg("Password should not be empty.");
    } else if (e.target.value.length < 6 || e.target.value.length > 12) {
      setPasswordError(true);
      setPasswordErrorMsg(
        "Password must be in between 6-12 characters (inclusive)."
      );
    } else {
      setPassword(e.target.value);
      setPasswordError(false);
      setPasswordErrorMsg("");
    }
  };

  const validatePassword2 = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword2(e.target.value);
    if (e.target.value.length === 0) {
      setPassword2Error(true);
      setPassword2ErrorMsg("Password should not be empty.");
    } else if (e.target.value !== password) {
      setPassword2Error(true);
      setPassword2ErrorMsg("Passwords do not match.");
    } else {
      setPassword(e.target.value);
      setPassword2Error(false);
      setPassword2ErrorMsg("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    let updatedUserCreds: UpdateUserCredentials = {
      email: email,
      password: password,
      authToken: userState.authToken,
    };

    updateCreds(updatedUserCreds);
  };

  return (
    <form onSubmit={handleFormSubmit} className="w-full">
      {/** Email field */}
      <div className="flex flex-col items-start p-2">
        <label className="text-md font-[500] dark:text-slate-200">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Type your email"
          onChange={validateEmail}
          className="border-[1.5px] text-sm w-full border-gray-300 p-2 rounded-md bg-transparent dark:text-slate-200"
        />
        {emailError && (
          <p className=" text-red-500 text-[0.6rem]">{emailErrorMsg}</p>
        )}
      </div>

      {/** Password field */}
      <div className="flex flex-col items-start p-2">
        <label className="text-md font-[500] dark:text-slate-200">
          New Password
        </label>
        <input
          type="password"
          name="password"
          onChange={validatePassword}
          placeholder="Type your password"
          className="border-[1.5px] text-sm w-full border-gray-300 p-2 rounded-md bg-transparent dark:text-slate-200"
        />
        {passwordError && (
          <p className=" text-red-500 text-[0.6rem]">{passwordErrorMsg}</p>
        )}
      </div>

      {/** Password2 field */}
      <div className="flex flex-col items-start p-2">
        <label className="text-md font-[500] dark:text-slate-200">
          Confirm new password
        </label>
        <input
          type="password"
          name="password2"
          onChange={validatePassword2}
          placeholder="Confirm your password"
          className="border-[1.5px] text-sm w-full border-gray-300 p-2 rounded-md bg-transparent dark:text-slate-200"
        />
        {password2Error && (
          <p className=" text-red-500 text-[0.6rem]">{password2ErrorMsg}</p>
        )}
      </div>

      <div className="flex flex-col items-between p-2">
        <button
          type="submit"
          className="bg-primary w-full rounded-xl font-semibold p-2 hover:bg-primaryaccent flex justify-center"
          disabled={emailError || passwordError || password2Error}
        >
          {loading ? (
            <ClipLoader
              color="#000000"
              loading={loading}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Update Credentials"
          )}
        </button>
      </div>
    </form>
  );
};

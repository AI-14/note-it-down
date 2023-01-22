import React, { useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import jwtDecode from "jwt-decode";

import { UserServiceAPI } from "../../../services/userService";
import { useUserStore } from "../../../stores/userStore";
import { UserCredentials } from "../../../services/types";

export const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [setId, setEm, setAuthToken, setIsAuthenticated] = useUserStore(
    (state) => [
      state.setId,
      state.setEmail,
      state.setAuthToken,
      state.setIsAuthenticated,
    ]
  );

  const navigate = useNavigate();

  const { mutate: loginUser } = useMutation(UserServiceAPI.loginUser, {
    onSuccess: (data) => {
      let authToken: string = data.access;
      let decodedAuthToken: any = jwtDecode(authToken);

      localStorage.setItem("userId", decodedAuthToken.user_id);
      localStorage.setItem("email", decodedAuthToken.email);
      localStorage.setItem("authToken", authToken);

      setId(decodedAuthToken.user_id);
      setEm(decodedAuthToken.email);
      setAuthToken(authToken);
      setIsAuthenticated(true);
      setLoading(false);

      toast.success("Login successful.", {
        style: { fontSize: "0.7rem" },
      });
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      setLoading(false);

      if (error.response?.data) {
        toast.error("User does not exist.", {
          style: { fontSize: "0.7rem" },
        });
      } else {
        toast.error("Something went wrong.", {
          style: { fontSize: "0.7rem" },
        });
      }
    },
  });

  const handleEmailOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      toast.error("Please fill all the fields.", {
        style: { fontSize: "0.7rem" },
      });
    } else {
      setLoading(true);

      let loginData: UserCredentials = {
        email: email,
        password: password,
      };

      loginUser(loginData);
    }
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
          onChange={handleEmailOnChange}
          className="border-[1.5px] text-sm w-full border-gray-300 p-2 rounded-md bg-transparent dark:text-slate-200"
        />
      </div>

      {/** Password field */}
      <div className="flex flex-col items-start p-2">
        <label className="text-md font-[500] dark:text-slate-200">Password</label>
        <input
          type="password"
          name="password"
          onChange={handlePasswordOnChange}
          placeholder="Type your password"
          className="border-[1.5px] text-sm w-full border-gray-300 p-2 rounded-md bg-transparent dark:text-slate-200"
        />
      </div>

      <div className="flex flex-col items-between p-2">
        <button
          type="submit"
          className="bg-primary w-full rounded-xl font-semibold p-2 hover:bg-primaryaccent flex justify-center"
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
            "Login"
          )}
        </button>
        <div className="text-[0.7rem] p-2 flex justify-center gap-2">
          <p className="text-[0.7rem] dark:text-slate-200">Don't have an account?</p>
          <Link to="/signup" className="text-primaryaccent font-semibold">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  );
};

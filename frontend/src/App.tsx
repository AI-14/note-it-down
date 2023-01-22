import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import { Route, Routes, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CreateNote } from "./pages/createnote/CreateNote";
import { Error404NotFound } from "./pages/error404/Error404NotFound";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import { UpdateCredentials } from "./pages/updatecredentials/UpdateCredentials";
import { UpdateNote } from "./pages/updatenote/UpdateNote";
import { AllNotes } from "./pages/viewallnotes/AllNotes";
import { ViewNote } from "./pages/viewanote/ViewNote";
import { useUserStore } from "./stores/userStore";

const queryClient = new QueryClient();

function App() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" autoClose={1500} />
      <Routes>
        <Route path="login/" element={<Login />} />
        <Route path="signup/" element={<Signup />} />

        <Route
          path="/"
          element={
            isAuthenticated ? <Home /> : <Navigate to="login/" replace />
          }
        >
          <Route path="/" element={<AllNotes />} />
          <Route path="updatecredentials/" element={<UpdateCredentials />} />
          <Route path="viewnote/:noteId/:slugTitle" element={<ViewNote />} />
          <Route path="createnote/" element={<CreateNote />} />
          <Route path="updatenote/:noteId/" element={<UpdateNote />} />
        </Route>

        <Route path="*" element={<Error404NotFound />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

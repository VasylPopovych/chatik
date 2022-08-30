import { useState, useContext, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ChatPage from "./pages/chatPage/ChatPage";
import AuthPage from "./pages/authPage/AuthPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";

const Router = () => {
  const { firebaseAuth, store } = useContext(Context);
  const [user] = useAuthState(firebaseAuth);

  if (user || localStorage.logedAsGuest) {
    return (
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/auth" element={<Navigate to="/" replace={true} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace={true} />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;

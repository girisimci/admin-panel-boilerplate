import LoginCard from "@/components/auth/login-card";
import React from "react";

const login = () => {
  return <LoginCard />;
};
login.getLayout = (page) => page;

export default login;

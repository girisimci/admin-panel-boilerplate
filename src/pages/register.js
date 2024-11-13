import RegisterCard from "@/components/auth/register-card";
import React from "react";

const Register = () => {
  return <RegisterCard />;
};
Register.getLayout = (page) => page;

export default Register;

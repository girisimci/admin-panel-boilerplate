import LoginForm from "@/components/auth/login-form";

const login = () => {
  return <LoginForm />;
};
login.getLayout = (page) => page;

export default login;

import RegisterForm from "@/components/auth/register-form";

const Register = () => {
  return <RegisterForm />;
};
Register.getLayout = (page) => page;

export default Register;

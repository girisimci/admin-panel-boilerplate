import AuthForm from "./auth-form";


const LoginForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData)); // Handle login logic
  };

  return (
    <AuthForm
      title="Sign In"
      inputs={[
        { name: "email", type: "email", placeholder: "Email Address", required: true },
        { name: "password", type: "password", placeholder: "Password", required: true },
      ]}
      onSubmit={handleSubmit}
      linkText="Don't have an account? Sign Up"
      linkHref="/register"
      buttonText="Sign In"
    />
  );
};

export default LoginForm;

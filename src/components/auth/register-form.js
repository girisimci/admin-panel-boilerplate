import AuthForm from "./auth-form";


const RegisterForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(Object.fromEntries(formData)); // Handle registration logic
  };

  return (
    <AuthForm
      title="Sign Up"
      inputs={[
        { name: "name", type: "text", placeholder: "Full Name", required: true },
        { name: "email", type: "email", placeholder: "Email Address", required: true },
        { name: "password", type: "password", placeholder: "Password", required: true },
      ]}
      onSubmit={handleSubmit}
      linkText="Already have an account? Sign In"
      linkHref="/login"
      buttonText="Sign Up"
    />
  );
};

export default RegisterForm;

import Link from "next/link";
import Input from "../commons/input";

const AuthForm = ({
  title,
  inputs,
  onSubmit,
  linkText,
  linkHref,
  buttonText,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white border rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center">{title}</h2>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm flex flex-col gap-4">
            {inputs.map((input, index) => (
              <div key={index}>
                <Input
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  className="w-full px-3 py-2 border rounded"
                  required={input.required}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                className="font-medium text-gray-500 hover:text-gray-700"
                href={linkHref}
              >
                {linkText}
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

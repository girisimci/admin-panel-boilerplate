import Link from "next/link";
import Input from "../commons/input";

const RegisterCard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white border rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center">Sign Up</h2>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm flex flex-col gap-4">
            <div>
              <Input
                name="name"
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email address"
              />
            </div>
            <div>
              <Input
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                className="font-medium text-gray-500 hover:text-gray-700"
                href="/login"
              >
                Already have an account? Sign In
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCard;

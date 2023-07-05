import { Footer } from "../../components/footer/Footer";

export const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <h1 className="text-2xl font-serif font-bold antialiased p-1">Login</h1>
        <form className="w-96">
          <label className="block mt-8 font-sans antialiased p-1">Email</label>
          <input
            className="block bg-slate-200 w-full border-2 border-slate-400 rounded p-2 focus:outline-none focus:border-indigo-500"
            required
            type="text"
            placeholder="example@gmail.com"
          />
          <label className="block mt-4 font-sans antialiased p-1">
            Password
          </label>
          <input
            className="block bg-slate-200 w-full border-2 border-slate-400 rounded p-2 focus:outline-none focus:border-indigo-500"
            required
            type="password"
            placeholder="****************"
          />
          <input
            className="block mt-4 text-white bg-indigo-500 w-full cursor-pointer rounded p-2 transition-opacity hover:opacity-70"
            type="button"
            value="Login"
          />
        </form>
        <div className="mt-3">
          Doesn't have account?
          <a
            className="ml-1 text-blue-500 transition-opacity hover:opacity-70"
            href="/register"
          >
            Create your account here.
          </a>
        </div>
        <div className="mt-2">
          Forgot your password?
          <a
            className="ml-1 mt-2 text-blue-500 transition-opacity hover:opacity-70"
            href="/login"
          >
            Click here.
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
};

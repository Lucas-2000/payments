import React from "react";
import { Footer } from "../../components/footer/Footer";
import { useViaCepApi } from "../../hooks/useViaCepApi";

export const Register = () => {
  const { data } = useViaCepApi("09371390");

  console.log(data);

  return (
    <div className="flex items-center justify-center mt-4 mb-4">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold antialiased p-1">
            Register
          </h1>
          <a
            className="text-blue-500 transition-opacity hover:opacity-70"
            href="/login"
          >
            Back
          </a>
        </div>
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
          <label className="block mt-4 font-sans antialiased p-1">
            Re type Password
          </label>
          <input
            className="block bg-slate-200 w-full border-2 border-slate-400 rounded p-2 focus:outline-none focus:border-indigo-500"
            required
            type="password"
            placeholder="****************"
          />
          <label className="block mt-4 font-sans antialiased p-1">
            First name
          </label>
          <input
            className="block bg-slate-200 w-full border-2 border-slate-400 rounded p-2 focus:outline-none focus:border-indigo-500"
            required
            type="text"
            placeholder="John"
          />
          <label className="block mt-4 font-sans antialiased p-1">
            Last name
          </label>
          <input
            className="block bg-slate-200 w-full border-2 border-slate-400 rounded p-2 focus:outline-none focus:border-indigo-500"
            required
            type="text"
            placeholder="Doe"
          />
          <label className="block mt-4 font-sans antialiased p-1">
            Birth Date
          </label>
          <input
            className="block bg-slate-200 w-full border-2 border-slate-400 rounded p-2 focus:outline-none focus:border-indigo-500"
            required
            type="date"
            value="2000-01-01"
          />
          <label className="block mt-4 font-sans antialiased p-1">CEP</label>
          <input
            className="block bg-slate-200 w-full border-2 border-slate-400 rounded p-2 focus:outline-none focus:border-indigo-500"
            required
            type="text"
            placeholder="00000000"
          />
          <label className="block mt-4 font-sans antialiased p-1">
            Address
          </label>
          <input
            className="block bg-slate-200 w-full border-2 border-slate-400 rounded p-2 cursor-not-allowed focus:outline-none focus:border-indigo-500"
            required
            disabled
            type="text"
          />
          <label className="block mt-4 font-sans antialiased p-1">City</label>
          <input
            className="block bg-slate-200 w-full border-2 border-slate-400 rounded p-2 cursor-not-allowed focus:outline-none focus:border-indigo-500"
            required
            disabled
            type="text"
          />
          <label className="block mt-4 font-sans antialiased p-1">UF</label>
          <input
            className="block bg-slate-200 w-full border-2 border-slate-400 rounded p-2 cursor-not-allowed focus:outline-none focus:border-indigo-500"
            required
            disabled
            type="text"
          />
          <input
            className="block mt-4 text-white bg-indigo-500 w-full cursor-pointer rounded p-2 transition-opacity hover:opacity-70"
            type="button"
            value="Login"
          />
        </form>
        <Footer />
      </div>
    </div>
  );
};

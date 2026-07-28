import React from "react";

function Navbar() {
  return (
    <div className="relative text-white">
      <div className="flex items-center justify-between m-8">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,#EC4899,#4F46E5)]">
            Linkly
          </h1>
        </div>
        <div className="flex gap-3 text-sm">
          <button className="rounded-full flex items-center justify-center border p-5 h-2 bg-slate-800">
            Login
          </button>
          <button className="rounded-full flex items-center justify-center border-none p-5 h-2 bg-blue-600 ">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

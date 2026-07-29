import React from "react";
import {Link} from 'lucide-react';

function Hero() {
  return (
    <>
    <section className="flex items-center justify-center pt-24">
      <div className="text-center max-w-4xl px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent">
          Shorten Your Looooong Links :)
        </h1>

        <p className="mt-6 text-gray-400 text-sm md:text-base leading-7 max-w-xl mx-auto">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>
      </div>
      
    </section>
     <div className="flex justify-center mt-10">
      <div className="flex items-center bg-[#151b2b] border-2 border-[#2d3550] rounded-full p-1 w-[700px] h-16 shadow-[0_0_20px_rgba(59,130,246,0.2)]">

        <div className="pl-5 text-gray-400">
          <Link size={20} />
        </div>

        <input
          type="text"
          placeholder="Enter the link here"
          className="flex-1 bg-transparent px-4 text-white placeholder-gray-400 outline-none"
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 h-full rounded-full transition-all duration-300">
          Shorten Now!
        </button>

      </div>
    </div>
    </>
  );
}

export default Hero;
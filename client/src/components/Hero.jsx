import React from "react";

function Hero() {
  return (
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
  );
}

export default Hero;
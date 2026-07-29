import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import useLinks from "./hooks/useLinks";
import LinkTable from "./components/LinkTable";

function App() {
  const { links, copiedId, addLink, copyLink } = useLinks();

  return (
    <div className="bg-[#0A0F19] min-h-screen">
      <Navbar />
      <Hero onNewLink={addLink} />
      <div className="mt-16 px-6 pb-20">
        <LinkTable links={links} copiedId={copiedId} onCopy={copyLink} />
      </div>
    </div>
  );
}

export default App;
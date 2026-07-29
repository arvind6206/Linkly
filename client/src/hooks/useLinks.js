// hooks/useLinks.js
import { useState, useEffect } from "react";
import api from "../api/axios";

function formatLink(link) {
  let favicon = "";
  try {
    favicon = `https://www.google.com/s2/favicons?domain=${new URL(link.originalUrl).hostname}&sz=64`;
  } catch {
    favicon = ""; // fallback if originalUrl is somehow malformed
  }

  return {
    id: link._id,
    shortUrl: `linkly.com/${link.shortCode}`,
    originalUrl: link.originalUrl,
    favicon,
    qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${encodeURIComponent(link.originalUrl)}`,
    clicks: link.clicks ?? 0,
    status: link.isActive ? "Active" : "Inactive",
    date: new Date(link.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  };
}

export default function useLinks() {
  const [links, setLinks] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const res = await api.get("/links");
        setLinks(res.data.map(formatLink)); // 👈 transform every link on fetch
      } catch (err) {
        console.error("Failed to load links:", err);
      }
    }
    fetchLinks();
  }, []);

  function addLink(newLink) {
    setLinks((prev) => [formatLink(newLink), ...prev]); // 👈 transform on add too
  }

  function copyLink(id, shortUrl) {
    navigator.clipboard.writeText(shortUrl).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return { links, copiedId, addLink, copyLink };
}
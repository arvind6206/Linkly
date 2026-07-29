import React from "react";
import { Copy, Check, Link2 } from "lucide-react";

const GRID_COLS = "grid-cols-[1.2fr_2fr_0.6fr_0.6fr_0.8fr_0.9fr]";

function StatusBadge({ status }) {
  const isActive = status === "Active";
  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-medium ${isActive ? "text-green-400" : "text-yellow-500"}`}>
        {status}
      </span>
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isActive ? "bg-green-400/20" : "bg-yellow-500/20"
        }`}
      >
        <Link2 size={12} className={isActive ? "text-green-400" : "text-yellow-500"} />
      </span>
    </div>
  );
}

function LinkRow({ link, onCopy, copiedId }) {
  return (
    <div className={`grid ${GRID_COLS} items-center gap-4 px-6 py-4 border-t border-[#1f2537]`}>
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-sm text-gray-300 truncate">{link.shortUrl}</span>
        <button
          onClick={() => onCopy(link.id, link.shortUrl)}
          className="w-6 h-6 rounded-full bg-[#232a3d] flex items-center justify-center shrink-0 hover:bg-[#2c3448]"
        >
          {copiedId === link.id ? (
            <Check size={12} className="text-green-400" />
          ) : (
            <Copy size={12} className="text-gray-400" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-2 min-w-0">
        {link.favicon && (
          <img
            src={link.favicon}
            alt=""
            className="w-6 h-6 rounded-md shrink-0 object-cover"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
        <span className="text-sm text-gray-300 truncate">{link.originalUrl}</span>
      </div>

      <div className="flex justify-center">
        <img src={link.qrCode} alt="" className="w-8 h-8 opacity-80" />
      </div>

      <div className="text-sm text-gray-300 text-center">{link.clicks}</div>

      <StatusBadge status={link.status} />

      <div className="text-sm text-gray-400 text-right">{link.date}</div>
    </div>
  );
}

export default function LinkTable({ links = [], copiedId, onCopy }) {
  return (
    <div className="bg-[#12172a] border border-[#1f2537] rounded-2xl overflow-hidden max-w-5xl mx-auto">
      <div className={`grid ${GRID_COLS} gap-4 px-6 py-4 text-xs font-semibold tracking-wide text-gray-400`}>
        <div>Short Link</div>
        <div>Original Link</div>
        <div className="text-center">QR Code</div>
        <div className="text-center">Clicks</div>
        <div>Status</div>
        <div className="text-right">Date</div>
      </div>

      {links.length === 0 ? (
        <div className="px-6 py-10 text-center text-sm text-gray-500 border-t border-[#1f2537]">
          No links yet — shorten one above to see it here.
        </div>
      ) : (
        links.map((link) => <LinkRow key={link.id} link={link} onCopy={onCopy} copiedId={copiedId} />)
      )}
    </div>
  );
}
import React from 'react'
import {Copy, Check, Link2} from 'lucide-react'

const statusStyles = {
    Active: {
        color: "text-green-400",
        dot: "bg-green-400/20",
        icon: "text-green-400"
    },
    Inactive: {
        color: "text-yellow-500",
        dot: "bg-yellow-500/20",
        icon: "text-yellow-500"
    }

}

function StatusBadge({status}){
    const s = statusStyles[status] || statusStyles.Active

    return (
        <div className='flex items-center gap-2'>
            <span className={`text-sm font-medium ${s.color}`}>{status}</span>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center ${s.dot}`}>
                <Link2 size={12} className={s.icon}/>
            </span>

        </div>
    )
}

function LinkRow({link, onCopy, copiedId, faded = false}){
    return (
        <div className={`flex items-center gap-4 px-6 py-4 border-t border-[#1f2537]
        ${faded ? "opacity-30 pointer-events-none select-none" : ""}`}>

            <div className='flex items-center gap-2 w-56 shrink-0'>
                <span className='text-sm text-gray-300 truncate'>{link.shortUrl}</span>
                <button onClick={() => onCopy(link.id, link.shortUrl)}
                className='w-6 h-6 rounded-full bg-[#232a3d] flex items-center justify-center
                shrink-0 hover:bg-[#2c3448] transition-colors'
                >
                    {copiedId === link.id ? (
                        <Check size={12} className='text-green-400'/>
                    ) : (
                        <Copy size={12} className='text-gray-400'/>
                    )}

                </button>

            </div>

            {/*original link*/}

            <div className='flex items-center gap-2 flex-1 min-w-0'>
                <img
                src={link.favicon}
                alt=""
                className='w-6 h-6 rounded-md shrink-0 object-cover'
                />

                <span className='text-sm text-gray-300 truncate'>{link.originalUrl}</span>

            </div>

            {/*qr code*/}
            <div className='w-14 shrink-0 flex-justify-center'>
                <img
                src={link.qrCode}
                alt="WR code"
                className='w-8 h-8 opacity-80'
                />

            </div>

            <div className='w-16 shrink-0 text-sm text-gray-300 text-center'>
                {link.clicks}
            </div>

            <div className='w-28 shrink-0'>
                {link.status}
            </div>

            <div className='w-24 shrink-0 text-sm text-gray-400 text-right'>
                {link.date}
            </div>

        </div>
    )
}

export default function LinkTable({links = [], copiedId, onCopy}) {
    const visitableLinks = links.slice(0, 5)
    const teaserLink = links[5]

  return (
    <div className='bg-[#121712a] border border-[#1f2537] rounded-2xl overflow-hidden max-w-5xl mx-auto'>
        <div className='flex items-center gap-4 px-6 py-4 text-xs font-semibold tracking-wide text-gray-400'>
            <div className='w-56 shrink-0'>Short Link
            </div>
            <div className='flex-1'>Original Link</div>
            <div className='w-14 shrink-0 text-center'>QR Code</div>
            <div className='w-16 shrink-0 text-center'>
                Clicks
            </div>
            <div className='w-28 shrink-0'>Status</div>
            <div className='w-24 shrink-0 text-right'>Date</div>

        </div>

        {visitableLinks.map((link) => (
            <LinkRow key={LinkTable.id} link={link} onCopy={onCopy} copiedId={copiedId}/>
        ))}

        {teaserLink && (
            <div className='relative'
            >
                <LinkRow link={teaserLink} onCopy={onCopy} copiedId={copiedId} faded/>
                <div className='absolute inset-0 flex items-center justify-center bg-[#12172a]/60'>
                <p className='text-sm text-gray-300'>
                    <span className='text-blue-400 underline cursor-pointer hover: text-blue-300'>
                        Register Now
                    </span>{" "}
                    to enjoy Unlimited History

                </p>
                </div>

            </div>
        )

        }
      
    </div>
  )
}


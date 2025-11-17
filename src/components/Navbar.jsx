import { useState } from 'react'
import { Menu, X, Calendar, GalleryVerticalEnd, Info, ShoppingBag, PhoneCall, Volume2, VolumeX } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Navbar({ soundEnabled, onToggleSound }) {
  const [open, setOpen] = useState(false)

  const links = [
    { to: '#about', label: 'About', icon: Info },
    { to: '#gallery', label: 'Portfolio', icon: GalleryVerticalEnd },
    { to: '#booking', label: 'Booking', icon: Calendar },
    { to: '#shop', label: 'Shop', icon: ShoppingBag },
    { to: '#contact', label: 'Contact', icon: PhoneCall },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="backdrop-blur-md/40 bg-black/50 border border-zinc-800 rounded-2xl px-4 py-3 flex items-center justify-between shadow-[0_0_30px_rgba(255,215,0,0.08)]">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-300 ring-2 ring-yellow-600/30" />
            <span className="text-lg tracking-widest font-semibold text-yellow-400">AUREA INK</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {links.map(({ to, label, icon: Icon }) => (
              <a key={to} href={to} className="group px-3 py-2 rounded-xl text-sm text-zinc-200 hover:text-yellow-300 transition-colors relative">
                <Icon size={18} className="inline-block mr-1 text-yellow-500/60 group-hover:text-yellow-400" />
                {label}
                <span className="absolute inset-x-2 -bottom-1 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
              </a>
            ))}
            <button onClick={onToggleSound} className="ml-2 px-2 py-2 rounded-xl text-zinc-200 hover:text-yellow-300">
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>

          <button onClick={() => setOpen(v => !v)} className="md:hidden text-zinc-200">{open ? <X /> : <Menu />}</button>
        </div>

        {open && (
          <div className="md:hidden mt-2 backdrop-blur bg-black/60 border border-zinc-800 rounded-2xl p-3">
            {links.map(({ to, label, icon: Icon }) => (
              <a key={to} href={to} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-3 rounded-xl text-sm text-zinc-200 hover:text-yellow-300">
                <Icon size={18} className="text-yellow-500/70" /> {label}
              </a>
            ))}
            <button onClick={onToggleSound} className="w-full mt-2 px-3 py-3 rounded-xl text-left text-zinc-200 hover:text-yellow-300">
              {soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

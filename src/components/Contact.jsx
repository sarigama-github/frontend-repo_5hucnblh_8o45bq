import { useState } from 'react'
import { MapPin, Instagram, Facebook, Mail } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch(`${baseUrl}/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) { setStatus('Thank you — we will reply soon.'); setForm({ name:'', email:'', message:'' }) }
      else setStatus(data.detail || 'Something went wrong')
    } catch (e) { setStatus(e.message) }
  }

  return (
    <section id="contact" className="relative bg-black text-zinc-100 py-24">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 tracking-widest mb-4">Visit us</h2>
          <p className="text-zinc-300">Aurea Ink Studio — 101 Forest Lane, Ember City</p>
          <div className="mt-4 rounded-2xl overflow-hidden border border-yellow-500/20">
            <iframe title="map" src="https://www.openstreetmap.org/export/embed.html?bbox=-0.13%2C51.5%2C-0.11%2C51.51&layer=mapnik" className="w-full h-64"></iframe>
          </div>
          <div className="flex items-center gap-4 mt-4 text-yellow-400">
            <a href="#" aria-label="Instagram" className="hover:scale-110 transition"><Instagram /></a>
            <a href="#" aria-label="Facebook" className="hover:scale-110 transition"><Facebook /></a>
            <a href="mailto:hello@aureaink.example" aria-label="Mail" className="hover:scale-110 transition"><Mail /></a>
          </div>
        </div>

        <form onSubmit={submit} className="bg-gradient-to-br from-zinc-950 to-black p-6 rounded-2xl border border-yellow-500/20 shadow-[0_0_60px_rgba(255,215,0,0.06)]">
          <h3 className="text-xl font-semibold text-yellow-300 mb-4">Send us a note</h3>
          <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" className="w-full mb-3 bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-600/60" />
          <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email address" className="w-full mb-3 bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-600/60" />
          <textarea required rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Message" className="w-full mb-3 bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-600/60" />
          <button className="px-6 py-3 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-black font-semibold shadow-[0_0_30px_rgba(255,215,0,0.35)] hover:brightness-110">Send</button>
          {status && <p className="text-sm text-yellow-300 mt-3">{status}</p>}
        </form>
      </div>
    </section>
  )
}

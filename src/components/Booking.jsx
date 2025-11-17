import { useState } from 'react'

export default function Booking() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'Custom Design', date: '', time: '', notes: '' })
  const [status, setStatus] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch(`${baseUrl}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('Request received. We will confirm via email.')
        setForm({ name: '', email: '', phone: '', service: 'Custom Design', date: '', time: '', notes: '' })
      } else {
        setStatus(data.detail || 'Something went wrong')
      }
    } catch (err) {
      setStatus(err.message)
    }
  }

  return (
    <section id="booking" className="relative bg-black text-zinc-100 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 tracking-widest mb-8">Book an appointment</h2>
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-6 bg-gradient-to-br from-zinc-950 to-black p-6 rounded-2xl border border-yellow-500/20 shadow-[0_0_60px_rgba(255,215,0,0.06)]">
          <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" className="bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-600/60" />
          <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email address" className="bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-600/60" />
          <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone (optional)" className="bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-600/60" />

          <select value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className="bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-600/60">
            <option>Custom Design</option>
            <option>Minimal Linework</option>
            <option>Illustrative Nature</option>
            <option>Geometric / Sacred</option>
          </select>

          <input required type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-600/60" />
          <input required type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} className="bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-600/60" />

          <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Tell us about your idea" rows={4} className="md:col-span-2 bg-black/60 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-600/60" />

          <div className="md:col-span-2 flex items-center justify-between">
            <p className="text-sm text-zinc-400">We usually reply within 24 hours.</p>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-black font-semibold shadow-[0_0_30px_rgba(255,215,0,0.35)] hover:brightness-110">Request slot</button>
          </div>

          {status && <p className="md:col-span-2 text-sm text-yellow-300">{status}</p>}
        </form>
      </div>
    </section>
  )
}

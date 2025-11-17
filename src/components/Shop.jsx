import { useEffect, useState } from 'react'

export default function Shop() {
  const [items, setItems] = useState([])

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/products`).then(r=>r.json()).then(setItems).catch(()=>{})
  }, [])

  return (
    <section id="shop" className="relative bg-gradient-to-b from-black to-zinc-950 text-zinc-100 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 tracking-widest mb-8">Shop</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(it => (
            <div key={it.id} className="bg-zinc-950/80 border border-yellow-500/20 rounded-2xl overflow-hidden">
              <div className="h-40 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.18),transparent_60%)]" />
              <div className="p-4">
                <h3 className="font-semibold text-yellow-300">{it.title}</h3>
                <p className="text-sm text-zinc-400 mt-1">{it.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-yellow-400">${it.price.toFixed(2)}</span>
                  <button className="px-3 py-1 rounded-lg bg-yellow-600 text-black text-sm font-semibold">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

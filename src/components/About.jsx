import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="relative bg-black text-zinc-100 py-24">
      <div className="absolute inset-0 pointer-events-none bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-lighten" />
      <div className="container mx-auto px-6 relative">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-yellow-400 tracking-widest"
        >
          Art that breathes with nature
        </motion.h2>

        <div className="mt-8 grid md:grid-cols-2 gap-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-zinc-300 leading-relaxed"
          >
            Our studio merges modern technique with the quiet intelligence of the forest — textures of bark, arcs of branch and bone, light as it filters through leaves. We craft every piece as a living symbol: elegant, minimal, and deeply personal.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-2xl overflow-hidden border border-yellow-500/20 shadow-[0_0_60px_rgba(255,215,0,0.08)]"
          >
            <img src="https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop" alt="Artist at work" className="w-full h-64 object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import About from './components/About'
import Gallery3D from './components/Gallery3D'
import Booking from './components/Booking'
import Shop from './components/Shop'
import Contact from './components/Contact'

function useAmbient() {
  const audioRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!audioRef.current) return
    if (enabled) {
      audioRef.current.volume = 0.25
      audioRef.current.play().catch(()=>{})
    } else {
      audioRef.current.pause()
    }
  }, [enabled])

  return { audioRef, enabled, setEnabled }
}

function Footer() {
  return (
    <footer className="bg-black text-zinc-400 py-10 text-center border-t border-yellow-500/10">
      <p className="tracking-widest text-xs">© {new Date().getFullYear()} Aurea Ink Studio · All rights reserved</p>
    </footer>
  )
}

export default function App() {
  const ambient = useAmbient()

  return (
    <div className="min-h-screen bg-black selection:bg-yellow-500 selection:text-black">
      <Navbar soundEnabled={ambient.enabled} onToggleSound={() => ambient.setEnabled(v=>!v)} />
      <Hero3D />
      <About />
      <Gallery3D />
      <Booking />
      <Shop />
      <Contact />
      <Footer />

      <audio ref={ambient.audioRef} loop src="https://cdn.pixabay.com/audio/2021/11/16/audio_7f1eb8a8a5.mp3" />
    </div>
  )
}

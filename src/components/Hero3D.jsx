import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Stars } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function GoldenSwirl() {
  const points = useMemo(() => {
    const pts = []
    const turns = 4
    const steps = 600
    for (let i = 0; i < steps; i++) {
      const t = i / steps
      const angle = turns * Math.PI * 2 * t
      const radius = THREE.MathUtils.lerp(0.1, 2.2, t)
      const x = Math.cos(angle) * radius
      const y = THREE.MathUtils.lerp(1.2, -1.2, t)
      const z = Math.sin(angle) * radius
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }, [])

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  const tubeGeom = useMemo(() => new THREE.TubeGeometry(curve, 900, 0.06, 16, false), [curve])

  return (
    <mesh geometry={tubeGeom}>
      <meshStandardMaterial
        color={new THREE.Color('hsl(45, 90%, 60%)')}
        emissive={new THREE.Color('hsl(45, 80%, 35%)')}
        emissiveIntensity={0.8}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  )
}

function FloatingSigils() {
  const group = useRef()
  const sigilGeo = useMemo(() => new THREE.IcosahedronGeometry(0.18, 0), [])
  const items = new Array(18).fill(0).map((_, i) => ({
    pos: [THREE.MathUtils.randFloatSpread(6), THREE.MathUtils.randFloatSpread(2), THREE.MathUtils.randFloatSpread(6)],
    rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
    speed: 0.6 + Math.random() * 0.8
  }))
  return (
    <group ref={group}>
      {items.map((it, idx) => (
        <Float key={idx} speed={it.speed} floatingRange={[0.1, 0.35]}>
          <mesh position={it.pos} rotation={it.rot} geometry={sigilGeo}>
            <meshStandardMaterial color={'#F6C453'} emissive={'#845A0B'} emissiveIntensity={0.6} metalness={0.9} roughness={0.2} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="relative h-[90vh] w-full bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={[0x000000]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} color={'#FFD95A'} />
        <pointLight position={[-5, -3, -5]} intensity={1.2} color={'#A67C00'} />
        <GoldenSwirl />
        <FloatingSigils />
        <Stars radius={30} depth={40} count={3000} factor={2} saturation={0} fade speed={1} />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black" />
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest text-yellow-400 drop-shadow-[0_0_30px_rgba(255,215,0,0.35)]">AUREA INK STUDIO</h1>
        <p className="mt-4 text-zinc-300 max-w-xl mx-auto">Luxury custom tattooing shaped by nature. Gold-lit minimalism, organic textures, and immersive 3D calm.</p>
      </div>
    </div>
  )
}

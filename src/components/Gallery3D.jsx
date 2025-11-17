import { Canvas } from '@react-three/fiber'
import { Environment, PresentationControls, ContactShadows, Float, Html } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

function Arm() {
  const geometry = useMemo(() => new THREE.CapsuleGeometry(0.6, 2.2, 12, 24), [])
  return (
    <mesh geometry={geometry} rotation={[Math.PI / 2.2, 0.2, 0]} position={[0, 0.6, 0]}>
      <meshPhysicalMaterial color={'#111'} roughness={0.6} metalness={0.2} clearcoat={0.2} />
    </mesh>
  )
}

function TattooDecal({ pos = [0, 0, 0], color = '#D4AF37' }) {
  const geometry = useMemo(() => new THREE.TorusKnotGeometry(0.25, 0.08, 80, 12), [])
  return (
    <mesh geometry={geometry} position={pos}>
      <meshStandardMaterial color={color} emissive={'#7a5a00'} emissiveIntensity={0.5} metalness={0.9} roughness={0.2} />
    </mesh>
  )
}

export default function Gallery3D() {
  return (
    <section id="gallery" className="relative bg-gradient-to-b from-black to-zinc-950 text-zinc-100 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 tracking-widest mb-8">Portfolio</h2>
        <div className="rounded-2xl overflow-hidden border border-yellow-500/20">
          <div className="h-[60vh] bg-black">
            <Canvas camera={{ position: [0, 1.2, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 3, 2]} intensity={2} color={'#FFD95A'} />
              <PresentationControls global polar={[0, Math.PI / 6]} azimuth={[-Math.PI / 6, Math.PI / 6]}>
                <Float speed={0.6}>
                  <group>
                    <Arm />
                    <TattooDecal pos={[0.3, 0.8, 0.3]} />
                    <TattooDecal pos={[-0.2, -0.3, -0.2]} color={'#CBA135'} />
                  </group>
                </Float>
              </PresentationControls>
              <Environment preset="city" />
              <ContactShadows position={[0, -0.9, 0]} opacity={0.4} blur={2} />
            </Canvas>
          </div>
          <div className="bg-zinc-950 p-6 text-zinc-300 text-sm">
            Rotate the model to explore placements. All designs are original and inspired by organic forms — rings of growth, river currents, celestial geometry.
          </div>
        </div>
      </div>
    </section>
  )
}

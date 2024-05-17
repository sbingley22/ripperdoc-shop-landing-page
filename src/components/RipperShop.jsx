/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import Controls from './Controls'
import { Environment } from "@react-three/drei"
import Model from "./Model"

const RipperShop = () => {
  const container = useRef()
  const canvasRef = useRef()

  const [viewMode, setViewMode] = useState("default")

  // Disable mobile touch defaults
  useEffect(() => {
    document.body.addEventListener('touchmove', function(e) {
      e.preventDefault()
    }, { passive: false })

    return () => {
      document.body.removeEventListener('touchmove', function(e) {
        e.preventDefault()
      }, { passive: false })
    }
  }, [])

  return (
    <div className="container" ref={container}>
      <Canvas ref={canvasRef} shadows camera={{position: [4,1.5,4]}}>
        <Suspense>

          <Controls viewMode={viewMode} />

          <Environment
            preset="city"
            background={false}
            backgroundIntensity={.1}
            environmentIntensity={.2}
            ground={false}

          />
          <directionalLight 
            intensity={1.9} 
            position={[0,25,-25]} 
            color={"#FFAAAA"} 
            castShadow 
          />
          <spotLight
            intensity={21}
            position={[-0.01,2.5,0]}
            castShadow
            color={"#EE99EE"}
          />

          <Model />

        </Suspense>
      </Canvas>
    </div>
  )
}

export default RipperShop

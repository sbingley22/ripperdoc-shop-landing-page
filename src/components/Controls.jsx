/* eslint-disable react/prop-types */
import { OrbitControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Vector3 } from "three"

const Controls = ({ viewMode }) => {
  const { camera } = useThree()
  const orbitRef = useRef()

  useEffect(() => {
    //console.log(orbitRef.current)
    
    if (viewMode == "default") {
      orbitRef.current.target.set(0, 1.5, 0)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, camera])

  return (
    <>
      <OrbitControls
        ref={orbitRef}
        position={[3,2,3]}
        makeDefault
        minPolarAngle={Math.PI/4}
        maxPolarAngle={Math.PI/2.0}
        minDistance={5}
        maxDistance={6}
        enablePan={false}
      />
    </>
  )
}

export default Controls

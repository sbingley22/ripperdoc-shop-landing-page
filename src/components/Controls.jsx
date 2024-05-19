/* eslint-disable react/prop-types */
import { OrbitControls } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Vector3, Quaternion, Euler } from "three"

const targetPosition = new Vector3()
const targetQuaternion = new Quaternion()
const targetEuler = new Euler(0, Math.PI/1, 0)
const targetOrbit = new Vector3

const Controls = ({ viewMode, isMobile }) => {
  const { camera } = useThree()
  const orbitRef = useRef()
  const lerping = useRef(false)
  const targetLerping = useRef(false)

  useEffect(() => {
    //console.log(orbitRef.current)
    targetLerping.current = false
    lerping.current = false
    
    if (viewMode == "default") {
      orbitRef.current.enabled = true
      targetLerping.current = true
      targetOrbit.set(0, 1.5, 0)
      //orbitRef.current.target.set(0, 1.5, 0)
    } else if (viewMode == "roof") {
      orbitRef.current.enabled = true
      targetLerping.current = true
      targetOrbit.set(-1, 3.5, -1)
    } else if (viewMode == "about") {
      orbitRef.current.enabled = false
      lerping.current = true
      targetPosition.set(0.3, 1.0, isMobile?-3.6:-3.5)
      targetQuaternion.setFromEuler(targetEuler.set(0, Math.PI, 0))
    } else if (viewMode == "surgery") {
      orbitRef.current.enabled = false
      lerping.current = true
      targetPosition.set(1.2, 1.8, -0.05)
      targetQuaternion.setFromEuler(targetEuler.set(-0.8, Math.PI/2.1, 0.0, 'YXZ'))
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, camera])

  useFrame(() => {
    if (lerping.current) {
      const alpha = 0.02
      camera.position.lerp(targetPosition, alpha)
      camera.quaternion.slerp(targetQuaternion, alpha)
      if (camera.position.distanceTo(targetPosition) < 0.01 && camera.quaternion.angleTo(targetQuaternion) < 0.01) {
        lerping.current = false
      }
    }

    if (targetLerping.current) {
      const alpha = 0.02
      orbitRef.current.target.lerp(targetOrbit, alpha)
      if (orbitRef.current.target.distanceTo(targetOrbit) < 0.01) targetLerping.current = false
    }

  })

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

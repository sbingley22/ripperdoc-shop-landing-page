/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from "@react-three/drei"
import glbFile from '../assets/scene.glb?url'
import { useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Vector3, Euler } from "three"

const direction = new Vector3()
const rotation = new Euler()

const Model = () => {
  const { scene, nodes, animations } = useGLTF(glbFile)
  const { actions, mixer } = useAnimations(animations, scene)
  
  const [animV, setAnimV] = useState("v idle")
  const [animBeca, setAnimBeca] = useState("beca idle")
  const [animLucy, setAnimLucy] = useState("lucy idle")
  const [animDavid, setAnimDavid] = useState("david idle")
  const [animMaine, setAnimMaine] = useState("maine idle")
  const [animKiwi, setAnimKiwi] = useState("kiwi idle")

  const { camera } = useThree()
  const eyeRef = useRef(null)
  const moonRef = useRef(null)
  const boomboxRef = useRef(null)

  // Update Animations
  useEffect(() => {
    actions[animV].reset().fadeIn(0.2).play()
    return () => actions[animV].fadeOut(0.2)
  }, [animV, actions])
  useEffect(() => {
    actions[animBeca].reset().fadeIn(0.2).play()
    return () => actions[animBeca].fadeOut(0.2)
  }, [animBeca, actions])
  useEffect(() => {
    actions[animLucy].reset().fadeIn(0.2).play()
    return () => actions[animLucy].fadeOut(0.2)
  }, [animLucy, actions])
  useEffect(() => {
    actions[animDavid].reset().fadeIn(0.2).play()
    return () => actions[animDavid].fadeOut(0.2)
  }, [animDavid, actions])
  useEffect(() => {
    actions[animMaine].reset().fadeIn(0.2).play()
    return () => actions[animMaine].fadeOut(0.2)
  }, [animMaine, actions])
  useEffect(() => {
    actions[animKiwi].reset().fadeIn(0.2).play()
    return () => actions[animKiwi].fadeOut(0.2)
  }, [animKiwi, actions])

  useEffect(() => {
    console.log(nodes)

    const hiddenObjects = [
      "Parted002", "PigTails001", "Tied_Back", "Wavy", "CyberArms001", "KOptics"
    ]

    const neonSigns = [
      "text-about", "text-contact", "text-karoshis", "text-leg-sale", "text-ripperdoc", "text-services", "text-visit"
    ]

    Object.keys(nodes).forEach( nodeName => {
      const node = nodes[nodeName]

      if (hiddenObjects.includes(nodeName)) {
        node.visible = false
      }

      if (neonSigns.includes(nodeName)){
        node.material.emissiveIntensity = 1
        node.castShadow = true
      }

      if (nodeName == "ground") {
        const cv = 0.1
        node.material.color.set(cv,cv,cv)
      } else if (nodeName == "cybernetic_legs" || nodeName == "cybernetic_arms") {
        node.material.emissiveMap = node.material.map.clone()
        node.material.emissive.set(1,0,0)
        node.material.emissiveIntensity = 0.5
      } else if (nodeName == "CyberArms001") {
        //node.visible = true
        node.material.emissiveMap = node.material.map.clone()
        node.material.emissive.set(1,0.2,0)
        node.material.emissiveIntensity = 0.9
      } else if (nodeName == "boombox") {
        boomboxRef.current = node
      } else if (nodeName == "cyber_eyball") {
        eyeRef.current = node
      } else if (nodeName == "moon") {
        moonRef.current = node
      }

      if (node.type == "SkinnedMesh" || node.type == "Mesh") {
        node.frustumCulled = false
        node.castShadow = true
        node.receiveShadow = true
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((state, delta) => {
    if (moonRef.current) {
      moonRef.current.rotation.y += delta / 2
    }

    if (eyeRef.current) {
      //console.log(eyeRef.current)
      //eyeRef.current = null
      
      direction.subVectors(camera.position, eyeRef.current.position).normalize()
      rotation.setFromVector3(direction)
      eyeRef.current.rotation.y = -rotation.z
    }
  })

  return (
    <>
      <primitive object={scene} dispose={null} />      
    </>
  )
}

export default Model

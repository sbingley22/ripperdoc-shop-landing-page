/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from "@react-three/drei"
import glbFile from '../assets/scene.glb?url'
import { useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Vector2, Vector3, Euler, Raycaster } from "three"

const direction = new Vector3()
const rotation = new Euler()

const Model = ({ setViewMode, setViewHtml, setSong, setMute }) => {
  const { scene, nodes, animations } = useGLTF(glbFile)
  const { actions, mixer } = useAnimations(animations, scene)
  
  const [animV, setAnimV] = useState("v idle")
  const [animBeca, setAnimBeca] = useState("beca idle")
  const [animLucy, setAnimLucy] = useState("lucy idle")
  const [animDavid, setAnimDavid] = useState("david idle")
  const [animMaine, setAnimMaine] = useState("maine idle")
  const [animKiwi, setAnimKiwi] = useState("kiwi idle")
  
  const eyeRef = useRef(null)
  const moonRef = useRef(null)
  const boomboxRef = useRef(null)

  const { camera } = useThree()
  const raycaster = useRef(new Raycaster())
  const mouse = useRef(new Vector2())
  const mouseDown = useRef(false)
  const mouseDownTime = useRef(0)

  // Raycasting from cursor
  useEffect(() => {
    const handleMouseMove = (event, clicked) => {
      // Return if user is rotating camera as this function slows app down
      if (mouseDown.current || mouseDownTime.current > 0.2) return
      //console.log(mouseDownTime.current)

      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Update the raycaster with the camera and mouse positions
      raycaster.current.setFromCamera(mouse.current, camera)

      // Get intersections with objects in the scene
      const intersects = raycaster.current.intersectObjects(scene.children)

      if (intersects.length > 0) {
        handleRayHit(intersects, clicked)
      }
    }

    const handleMouseDown = () => mouseDown.current = true
    const handleMouseUp = () => mouseDown.current = false

    window.addEventListener('mousemove', (e)=>handleMouseMove(e, false))
    window.addEventListener('click', (e)=>handleMouseMove(e, true))
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, scene])

  const handleRayHit = (intersects, clicked = false) => {
    //console.log('Hit:', intersects[0].object.name, 'Parent:', intersects[0].object.parent.name)
    const maineWave = ["Jacket001", "MaineBody"]
    const kiwi = ["Dress", "kiwi"]
    const v = ["rig005", "VBody"]
    const rebecca = ["rig", "rebecca"]
    const david = ["DavidBody", "rig004"]
    const lucy = ["JacketFem", "lucy"]
    const services = ["board-services", "text-services"]
    const contact = ["board-contact", "text-contact"]
    const visit = ["board-visit", "text-visit"]
    const about = ["board-about", "text-about"]

    let pointer = false
    const firstHit = intersects[0].object
    let parent = null
    if (firstHit.parent) parent = firstHit.parent.name

    if (maineWave.includes(firstHit.name)) {
      pointer = true
      if (clicked) {
        setAnimMaine("maine wave")
        setViewHtml("maine")
        setViewMode("default")
      }
    } else if (kiwi.includes(firstHit.name) || kiwi.includes(parent)) {
      pointer = true
      if (clicked) {
        setViewHtml("kiwi")
        setViewMode("default")
      }
    } else if (v.includes(parent)) {
      pointer = true
      if (clicked) {
        if (animV == "v idle") {
          setViewHtml("v")
          setViewMode("surgery")
          setAnimV("v idle to chair")
        }
        
      }
    } else if (rebecca.includes(parent)) {
      pointer = true
      if (clicked) {
        setViewHtml("rebecca")
        setViewMode("roof")
      }
    } else if (david.includes(parent)) {
      pointer = true
      if (clicked) {
        setViewHtml("david")
        setViewMode("roof")
      }
    } else if (lucy.includes(parent) || lucy.includes(firstHit.name)) {
      pointer = true
      if (clicked) {
        setViewHtml("lucy")
        setViewMode("roof")
      }
    } else if (services.includes(firstHit.name)) {
      pointer = true
      if (clicked) {
        console.log("html")
      }
    } else if (contact.includes(firstHit.name)) {
      pointer = true
      if (clicked) {
        console.log("html")
      }
    } else if (visit.includes(firstHit.name)) {
      pointer = true
      if (clicked) {
        console.log("html")
      }
    } else if (about.includes(firstHit.name)) {
      pointer = true
      if (clicked) {
        setViewMode("about")
      }
    } else if (firstHit.name == "boombox") {
      pointer = true
      if (clicked) {
        setViewMode("roof")
        setMute(false)
        //setSong(prev => prev + 1 > 2 ? 0 : prev + 1)
        setSong(prev => {
          const newIndex = prev + 1 > 2 ? 0 : prev + 1;
          if (prev + 1 > 2) {
              setAnimBeca("beca idle")
          } else {
            setAnimBeca("beca dance")
          }
          return newIndex;
        })
      }
    }

    if (pointer) {
      document.body.style.cursor = "pointer"
    }
    else {
      document.body.style.cursor = "default"
    }
  }

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

  // Mixer
  useEffect(()=>{
    const oneShots = [
      "maine wave", "v idle to chair", "v chair to idle"
    ]

    oneShots.forEach( (shot) => {
      actions[shot].repetitions = 1
      actions[shot].clampWhenFinished = true
    })

    mixer.addEventListener('finished', () => {
      if (animMaine == "maine wave") setAnimMaine("maine idle")
        if (animV == "v idle to chair") setAnimV("v chair")
        else if (animV == "v chair to idle") setAnimV("v idle")
    })

    return () => mixer.removeEventListener('finished')

  }, [actions, mixer, animMaine])

  // Initial setup
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
        node.receiveShadow = true
      } else if (nodeName == "cybernetic_legs" || nodeName == "cybernetic_arms") {
        node.material.emissiveMap = node.material.map.clone()
        node.material.emissive.set(.1,0,0)
        node.material.emissiveIntensity = 0.1
      } else if (nodeName == "CyberArms001") {
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
        //node.receiveShadow = true
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((state, delta) => {
    if (mouseDown.current) {
      mouseDownTime.current += delta
    } else {
      mouseDownTime.current = 0
    }

    if (moonRef.current) {
      moonRef.current.rotation.z += delta / 2
    }

    if (eyeRef.current) {
      //console.log(eyeRef.current)
      //eyeRef.current = null
      
      direction.subVectors(camera.position, eyeRef.current.position).normalize()
      rotation.setFromVector3(direction)
      eyeRef.current.rotation.y = -rotation.z
      eyeRef.current.rotation.z = rotation.y
    }
  })

  return (
    <>
      <primitive object={scene} dispose={null} />      
    </>
  )
}

export default Model

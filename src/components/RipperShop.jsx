/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef, useState } from "react"
import Controls from './Controls'
import { Environment } from "@react-three/drei"
import Model from "./Model"
import ServicesPage from "./ServicesPage"
import ContactPage from "./ContactPage"
import VisitPage from "./VisitPage"

const RipperShop = () => {
  const container = useRef()
  const canvasRef = useRef()

  const [viewMode, setViewMode] = useState("default")
  const [viewHtml, setViewHtml] = useState(null)
  const [vOutfit, setVOutfit] = useState({
    hair: "Wavy Punk",
    optics: false,
    jacket: true,
    cyberArms: false
  })

  const [song, setSong] = useState(0)
  const [mute, setMute] = useState(true)
  const bgmCityRef = useRef()
  const bgmResistRef = useRef()
  const bgmHouseRef = useRef()

  useEffect(() => {
    const volume = 0.4
    bgmCityRef.current.currentTime = 0
    bgmCityRef.current.volume = 1
    bgmCityRef.current.pause()
    bgmResistRef.current.currentTime = 0
    bgmResistRef.current.volume = volume
    bgmResistRef.current.pause()
    bgmHouseRef.current.currentTime = 0
    bgmHouseRef.current.volume = volume
    bgmHouseRef.current.pause()

    if (mute) return

    if (song == 0) bgmCityRef.current.play()
    else if (song == 1) bgmResistRef.current.play()
    else if (song == 2) bgmHouseRef.current.play()

  }, [mute, song])

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

  const returnClicked = () => {
    setViewMode("default")
    setViewHtml(null)
  }

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setVOutfit(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="container" ref={container}>
      <Canvas ref={canvasRef} shadows camera={{position: [4,1.5,4]}}>
        <Suspense>

          <Controls viewMode={viewMode} />

          <Environment
            preset="city"
            background={false}
            backgroundIntensity={.15}
            environmentIntensity={.35}
            ground={false}

          />
          <directionalLight 
            intensity={1.9} 
            position={[25,25,-15]} 
            color={"#FFAAAA"} 
            castShadow 
          />
          <spotLight
            intensity={21}
            position={[-0.01,2.5,0]}
            castShadow
            color={"#EE99EE"}
          />

          <Model 
            viewMode={viewMode}
            setViewMode={setViewMode} 
            setViewHtml={setViewHtml} 
            setSong={setSong}
            setMute={setMute}
            vOutfit={vOutfit}
          />

        </Suspense>
      </Canvas>

      {(viewMode != "default") &&
        <button className="hud-return" onClick={returnClicked}>{"<"}</button>
      }

      <button className="hud-speaker" onClick={()=>setMute(!mute)}>
        {!mute && <img src="./speaker.png" alt="audio" />}
        {mute && <img src="./mute.png" alt="mute" />}
      </button>

      {viewHtml && <div className="hud-html">
        <button onClick={()=>setViewHtml(null)}>RETURN</button>

        {viewHtml == "services" && <ServicesPage /> }
        {viewHtml == "contact" && <ContactPage /> }
        {viewHtml == "visit" && <VisitPage /> }
        
        {viewHtml == "v" &&
          <div className="hud-html-content small">
            <div>
              <label htmlFor="hair">Hair: </label>
              <select name="hair" id="hair" value={vOutfit.hair} onChange={handleInputChange}>
                <option value="Wavy Punk">Wavy Punk</option>
                <option value="Wavy">Wavy</option>
                <option value="Tied Back">Tied Back</option>
                <option value="Pig Tails">Pig Tails</option>
                <option value="Parted">Parted</option>
              </select>
            </div>
            <div>
              <label htmlFor="optics">Optics: </label>
              <input
                type="checkbox"
                name="optics"
                id="optics"
                checked={vOutfit.optics}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="jacket">Jacket: </label>
              <input
                type="checkbox"
                name="jacket"
                id="jacket"
                checked={vOutfit.jacket}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="cyberArms">Cyber Arms: </label>
              <input
                type="checkbox"
                name="cyberArms"
                id="cyberArms"
                checked={vOutfit.cyberArms}
                onChange={handleInputChange}
              />
            </div>
          </div>
        }

        {viewHtml == "maine" &&
          <div className="hud-html-content">
            <h4>Edgerunner: Maine</h4>
            <img src="./maine.webp" alt="maine" className="profile-pic" />
            <p>Maine used to be a military soldier before he became a mercenary. Now a veteran edgerunner in Night City, Maine dreams of "making it big", although he values his friendships with his crew more than his glory.</p>
            <p>A regular at the Ripper Docs, Maine is always looking to "Chrome Up!"</p>
          </div>
        }
        {viewHtml == "kiwi" &&
          <div className="hud-html-content">
            <h4>Edgerunner: Kiwi</h4>
            <img src="./kiwi.webp" alt="kiwi" className="profile-pic" />
            <p>A member of Maine's crew of mercenaries, Kiwi is an enigmatic and snarky netrunner with a detachable cybernetic jaw mask who acts as a mentor to Lucy. She acts as a replacement for Sasha, who is killed on an infiltration mission an unknown amount of time before the events of Edgerunners.</p>
            <p>She is generally distant, as her personal philosophy is to "never trust a soul in Night City," though she favors Lucy over others and can be seen communicating with her on a more intimate level. As a netrunner, she mostly plays an intel role.</p>
            <p>She recently got her new cybernetic jaw installed at this ripper doc.</p>
          </div>
        }
        {viewHtml == "david" &&
          <div className="hud-html-content">
            <h4>Edgerunner: David</h4>
            <img src="./david.webp" alt="david" className="profile-pic" />
            <p>David will do anything for his crew and is not afraid of chrome either. Sporting a military grade sandevistan has uses his speed to outclass other mercs. His tolerance for cybernetic is f-ing nuts but even he has his limits.</p>
            <p>Living for other peoples dreams Davids current goal is to get enough money to take lucy to the moon.</p>
            <p>This ripper docs favorite client. He's here every week getting something added or tweaked.</p>
          </div>
        }
        {viewHtml == "lucy" &&
          <div className="hud-html-content">
            <h4>Edgerunner: Lucy</h4>
            <img src="./lucy.webp" alt="lucy" className="profile-pic" />
            <p>Lucy is a mysterious netrunner from Night City. She is quite introverted and doesn't like to talk much about her past. Although she seems unconcerned, she won't hesitate to kill a person in a heartbeat if they tick her off. Lucy also considers Night City a prison, and dreams of one day leaving it for the Moon.</p>
            <p>She will protect David with her life but fears David most of all needs protecting from himself.</p>
            <p>Lucy mostly stops by to pick up meds for David. She doesn't sport much chrome.</p>
          </div>
        }
        {viewHtml == "rebecca" &&
          <div className="hud-html-content">
            <h4>Edgerunner: Rebecca</h4>
            <img src="./rebecca.webp" alt="Rebecca" className="profile-pic" />
            <p>Rebecca is a very sharp-tongued young woman, and has a tendency to be extreme and unpredictable. She was often shown going all out in fights, sometimes even laughing manically. Nevertheless, Rebecca is loyal and does everything for the crew of Maine, including supporting newcomer David where she can.</p>
            <p>Rebecca has feelings for David Martinez, as she mentions that she wasn't okay "playing just friends", and sarcastically comments to Kiwi that perhaps she should change her appearance and attitude to seem more like David's girlfriend Lucy.</p>
            <p>Rebecca likes all things metal hands. I installed those fancy Gorrila hands she uses.</p>
          </div>
        }
      </div>}

      <audio ref={bgmHouseRef} loop>
        <source src="./audio/yourHouse.m4a" type="audio/mp4" />
      </audio>
      <audio ref={bgmCityRef} loop>
        <source src="./audio/city.mp3" type="audio/mp3" />
      </audio>
      <audio ref={bgmResistRef} loop>
        <source src="./audio/resistDisorder.m4a" type="audio/mp4" />
      </audio>

    </div>
  )
}

export default RipperShop

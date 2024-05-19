import { useEffect, useState } from 'react'
import './App.css'
import RipperShop from './components/RipperShop'

function App() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mediaQuery.matches)

    const handleResize = () => {
      setIsMobile(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handleResize)

    return () => {
      mediaQuery.removeEventListener('change', handleResize)
    }
  }, [])

  return (
    <>
      <RipperShop isMobile={isMobile} />
    </>
  )
}

export default App

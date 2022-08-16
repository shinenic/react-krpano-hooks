import { useEffect, useState } from 'react'
import useKrpano from 'react-krpano-hooks'

const useDemoKrpano = () => {
  const [showLoadingPage, setShowLoadingPage] = useState(true)
  const [isLocked, setLockView] = useState(false)
  const [isHideSpots, setHideSpots] = useState(false)
  const [currentScene, setCurrentScene] = useState('')
  const {
    containerRef,
    krpanoState: { isLoaded },
    lockView,
    unlockView,
    callKrpano,
  } = useKrpano({
    globalFunctions: {
      logScene: (scene) => {
        setCurrentScene(scene)
      },
    },
  })

  // Debounce hide loading page
  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setShowLoadingPage(false)
      }, 1000)
    }
  }, [isLoaded])

  useEffect(() => {
    if (!isLoaded) return

    if (isLocked) {
      lockView()
    } else {
      unlockView()
    }
  }, [isLocked]) // eslint-disable-line

  useEffect(() => {
    if (!isLoaded) return

    if (isHideSpots) {
      callKrpano('toggleHotspotVisibility(0)')
    } else {
      callKrpano('toggleHotspotVisibility(1)')
    }
  }, [isHideSpots]) // eslint-disable-line
  
  const toggleLockView = () => setLockView(prev => !prev);
  const toggleHideSpots = () => setHideSpots(prev => !prev);

  return {
    showLoadingPage,
    isLoaded,
    containerRef,
    toggleLockView,
    isLocked,
    toggleHideSpots,
    isHideSpots,
    currentScene,
  }
}

export default useDemoKrpano

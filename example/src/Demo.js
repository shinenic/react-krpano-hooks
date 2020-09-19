/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react'
import GithubLogo from './asset/github-logo.png'
import useKrpano from 'react-krpano-hooks'
import classNames from 'classnames'
import { useToggle } from 'react-use'

const LoadingPage = ({ isFadingout = false }) => {
  const wrapperClasses = classNames('loading-page', {
    'loading-page--fade-out': isFadingout,
  })
  return (
    <div className={wrapperClasses}>
      <div className="hint">Loading...</div>
      <div className="loading-spin" />
    </div>
  )
}

const Home = () => {
  const [showLoading, setShowLoading] = useState(true)
  const [isLocked, toggleLockView] = useToggle(false)
  const [isHideSpots, toggleHideSpots] = useToggle(false)
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

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        setShowLoading(false)
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

  return (
    <>
      {showLoading && <LoadingPage isFadingout={isLoaded} />}

      <div className="demo-page">
        <div ref={containerRef} />
        <div className="menu">
          <a href="#">Back to Home</a>
          <button
            onClick={toggleLockView}
            className={isLocked ? 'disable' : null}
          >
            Toggle Lock View
          </button>
          <button
            onClick={toggleHideSpots}
            className={isHideSpots ? 'disable' : null}
          >
            Toggle Hide Spots
          </button>
          <div className="scene-name">Current Scene: {currentScene}</div>
        </div>
        <a
          className="github-link"
          href="https://github.com/shinenic/react-krpano-hooks"
          target="_blank"
        >
          <img src={GithubLogo} alt="github" />
        </a>
      </div>
    </>
  )
}

export default Home

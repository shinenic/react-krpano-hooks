/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import GithubLogo from './asset/github-logo.png'
import classNames from 'classnames'
import useDemoKrpano from './hooks/useDemoKrpano'

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

const Demo = () => {
  const {
    showLoadingPage,
    isLoaded,
    containerRef,
    toggleLockView,
    isLocked,
    toggleHideSpots,
    isHideSpots,
    currentScene,
  } = useDemoKrpano()

  return (
    <>
      {showLoadingPage && <LoadingPage isFadingout={isLoaded} />}

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
          <div className="scene-name">Current Scene Name: {currentScene}</div>
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

export default Demo

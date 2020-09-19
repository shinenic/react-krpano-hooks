/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import GithubLogo from './asset/github-logo.png'

const Home = () => {
  return (
    <div className="home-page">
      <div className="title">React-krpano-hooks</div>
      <div className="link-section">
        <a href="#demo">Demo</a>
        <a
          href="https://www.npmjs.com/package/react-krpano-hooks"
          target="_blank"
        >
          Npm
        </a>
        <a
          href="https://github.com/shinenic/react-krpano-hooks#react-krpano-hooks"
          target="_blank"
        >
          Document
        </a>
      </div>
      <div className="shell-group-wrapper">
        <div className="shell-section">$ npm install react-krpano-hooks</div>
        <div className="shell-section">$ yarn add react-krpano-hooks</div>
      </div>
      <a
        className="github-link"
        href="https://github.com/shinenic/react-krpano-hooks"
        target="_blank"
      >
        <img src={GithubLogo} alt="github" />
      </a>
    </div>
  )
}

export default Home

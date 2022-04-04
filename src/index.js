import { useState, useEffect, useRef } from 'react'
import { getOperations } from './operations'
import {
  warnIfInvalidEmbeddingParams,
  warnIfInvalidGlobalFunctions,
} from './log'
import useKrpanoScript from './useKrpanoScript'

const KRPANO_SCRIPT_PATH = 'krpano/krpano.js'
const KRPANO_XML_PATH = 'krpano/tour.xml'
const DEFAULT_TARGET_ID = 'react-krpano'
const DEFAULT_GLOBAL_VAR_NAME = 'reactKrpano'

// ref: https://krpano.com/docu/html/
const DEFAULT_EMBEDDING_PARAMS = {
  xml: KRPANO_XML_PATH,
  target: 'react-krpano',
  html: 'prefer',
}

const DEFAULT_SCRIPT_OPTION = {
  async: true,
}

const isProductionMode = process.env.NODE_ENV === 'production'

/**
 * Krpano javascript interface: https://krpano.com/docu/js/#interfaceobject
 * Krpano call external script: https://krpano.com/docu/actions/#jscall
 */
const useKrpano = (options = {}) => {
  const {
    scriptPath = KRPANO_SCRIPT_PATH,
    embeddingParams = {},
    scriptOptions = {},
    handleLoaded,
    globalFunctions = {},
    globalVarName = DEFAULT_GLOBAL_VAR_NAME,
    height = '100vh',
    width = '100vw',
  } = options

  const containerRef = useRef(null)
  const [scriptLoaded, scriptError] = useKrpanoScript(scriptPath, {
    ...DEFAULT_SCRIPT_OPTION,
    ...scriptOptions,
  })
  const [krpanoInterface, setKrpanoInterface] = useState(null)
  const embeddingParamsJsonString = JSON.stringify(embeddingParams)
  const [krpanoState, setKrpanoState] = useState({
    isEmbedded: false,
    isLoaded: false,
    error: null,
  })

  const resetKrpanoState = () => {
    setKrpanoState({
      isEmbedded: false,
      isLoaded: false,
      error: null,
    })
  }

  const onStart = () => {
    setKrpanoState((state) => ({ ...state, isLoaded: true }))
  }

  // Warn if gotten invalid options
  useEffect(() => {
    warnIfInvalidEmbeddingParams(embeddingParams)
    warnIfInvalidGlobalFunctions(globalFunctions)
  }, []) // eslint-disable-line

  useEffect(() => {
    if (!containerRef.current && !isProductionMode) {
      console.error(
        'DOM not found, please assign the containerRef on a div to render it'
      )
    }
  }, [])

  // Set container div `id` when ref is assigned
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.id = DEFAULT_TARGET_ID
    }
  }, [])

  // Set container's height & width
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = height
      containerRef.current.style.width = width
    }
  }, [height, width])

  // Embed krpano into html dom
  useEffect(() => {
    if (scriptLoaded && containerRef.current) {
      resetKrpanoState()
      window[globalVarName] = { ...globalFunctions, onStart }
      window.embedpano({
        ...DEFAULT_EMBEDDING_PARAMS,
        ...embeddingParams,
        onready: (krpano) => {
          setKrpanoInterface(krpano)
          setKrpanoState((state) => ({ ...state, isEmbedded: true }))
          handleLoaded && handleLoaded()
        },
        onerror: (err) => {
          setKrpanoState((state) => ({ ...state, error: err }))
        },
      })
    }
  }, [scriptLoaded, embeddingParamsJsonString]) // eslint-disable-line

  // Warn if load script path failed
  useEffect(() => {
    if (scriptError) {
      console.error(`Error when load krpano script in path "${scriptPath}"`)
    }
  }, [scriptError]) // eslint-disable-line

  return {
    krpanoState: { ...krpanoState, scriptLoaded },
    containerRef,
    ...getOperations(krpanoInterface),
  }
}

export default useKrpano

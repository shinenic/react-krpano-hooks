import { useState, useEffect, useRef } from 'react'
import { getOperations } from './operations'
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

/**
 * Krpano javascript interface: https://krpano.com/docu/js/#interfaceobject
 * Krpano call external script: https://krpano.com/docu/actions/#jscall
 */
const useKrpano = ({
  scriptPath = KRPANO_SCRIPT_PATH,
  embeddingParams = {},
  scriptOption = {},
  handleLoaded,
  globalVarName = DEFAULT_GLOBAL_VAR_NAME,
  externalFnc = {},
}) => {
  const containerRef = useRef(null)
  const [scriptLoaded, scriptError] = useKrpanoScript(scriptPath, {
    ...DEFAULT_SCRIPT_OPTION,
    ...scriptOption,
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

  useEffect(() => {
    if (scriptLoaded && containerRef.current) {
      resetKrpanoState()
      containerRef.current.id = DEFAULT_TARGET_ID
      window[globalVarName] = { ...externalFnc, onStart }
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

  if (scriptError || !scriptLoaded) {
    if (scriptError) {
      console.error(`Error when load krpano script in path "${scriptPath}"`)
    }

    return { krpanoState: { ...krpanoState, scriptLoaded }, containerRef }
  }

  return {
    krpanoState: { ...krpanoState, scriptLoaded },
    containerRef,
    ...getOperations(krpanoInterface),
  }
}

export default useKrpano

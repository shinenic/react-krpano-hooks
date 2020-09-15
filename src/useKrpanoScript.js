import { useState, useEffect, useCallback } from 'react'

const useKrpanoScript = (src, options = {}) => {
  const scriptLoaded = Boolean(window.embedpano)
  const [state, setState] = useState({
    loaded: scriptLoaded,
    error: false,
  })

  const setCompleted = useCallback(() => {
    setState({ loaded: true, error: false })
  }, [])

  useEffect(
    () => {
      if (scriptLoaded) {
        setCompleted()
      } else {
        const script = document.createElement('script')
        script.src = src
        script.async = true

        Object.keys(options).forEach((key) => {
          script[key] = options[key]
        })

        const onScriptError = () => {
          script.remove()

          setState({ loaded: true, error: true })
        }

        script.addEventListener('load', setCompleted)
        script.addEventListener('error', onScriptError)

        document.body.appendChild(script)

        return () => {
          script.removeEventListener('load', setCompleted)
          script.removeEventListener('error', onScriptError)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [src] // Only re-run effect if script src changes
  )

  return [state.loaded, state.error]
}

export default useKrpanoScript

declare module 'react-krpano-hooks' {
  export interface UseKrpanoProps {
    /**
     * Path of script provided by krpano, default is 'krpano/krpano.js'
     */
    scriptPath?: string
    /**
     * Krpano embedding params,
     * the script will embed again when these params change,
     * default is { xml: 'krpano/tour.xml', target: 'react-krpano', html: 'prefer'}
     *
     * Note: react-krpano-hooks have `onready` param already, so set onready into hooks will not work,
     * you can set handleLoaded in option to execute function after embedding completed
     */
    embeddingParams?: Record<string, any>
    /**
     * Script options, default is {async: true}
     */
    scriptOptions?: JSX.IntrinsicElements['script']
    /**
     * Execute when embedding finished
     */
    handleLoaded?: () => void
    /**
     * Functions in this object will be registered as js global variables,
     * you can call `jscall(reactKrpano.customFnc())` (or other name you assign in globalVarName) in xml to execute global function
     * Note: react-krpano-hooks have `onStart` global function already, so set `onStart` into hooks will not work
     */
    globalFunctions?: Record<string, (...args: any[]) => any>
    /**
     * Variable name used for global functions,
     * default is 'reactKrpano'
     */
    globalVarName?: string
    /**
     * KRPano container's height, default is 100vh
     */
    height?: React.CSSProperties['height']
    /**
     * KRPano container's width, default is 100vw
     */
    width?: React.CSSProperties['width']
  }

  export type KrpanoState = {
    /**
     * `True` when the krpano script is loaded
     */
    scriptLoaded: boolean
    /**
     * `True` when the embedding is done, but the xml haven't finished yet
     */
    isEmbedded: boolean
    /**
     * `True` after the xml loaded and parsed
     */
    isLoaded: boolean
    /**
     * Error message from krpano xml, will be `null` when no error
     */
    error: string | null
  }

  export interface UseKrpanoResponse {
    krpanoState: KrpanoState
    /**
     * [Set](https://krpano.com/docu/js/#interfaceobject) the given krpano variable to the given value
     */
    setKrpano: (variable: string, value: any) => any
    /**
     * [Return](https://krpano.com/docu/js/#interfaceobject) the value of the given krpano variable
     */
    getKrpano: (variable: string) => any
    /**
     * [Call](https://krpano.com/docu/js/#interfaceobject) and execute any krpano action code
     */
    callKrpano: (action: string) => any
    /**
     * Directly call the [spheretoscreen](https://krpano.com/docu/js/#interfaceobject) action
     */
    spheretoscreenKrpano: (
      h: string | number,
      v: string | number,
      x: string | number,
      y: string | number,
      stereoside?: string
    ) => void
    /**
     * Directly call the [screentosphere](https://krpano.com/docu/actions/#screentosphere) action
     */
    screentosphereKrpano: (
      x: string | number,
      y: string | number,
      h: string | number,
      v: string | number
    ) => void
    /**
     * Lock whole view
     */
    lockView: () => void
    /**
     * Unlock whole view
     */
    unlockView: () => void
    /**
     * Used to reference a React node
     */
    containerRef: React.MutableRefObject<HTMLElement>
  }

  type UseKrpano = (options: UseKrpanoProps) => UseKrpanoResponse

  export default function (options?: UseKrpanoProps): UseKrpanoResponse
}

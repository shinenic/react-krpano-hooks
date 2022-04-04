React-krpano-hooks
===

> A package migrates KRPano into React as a hook


## Prerequisite
* react >= 16.8
* krpano script >= 1.20.7

## Installation
* npm
```
npm install react-krpano-hooks
```
* yarn
```
yarn add react-krpano-hooks
```

## Demo & Example

[React-krpano-hooks](https://shinenic.github.io/react-krpano-hooks/)
(Source from KRPano's official example [demotour-winecellar](https://krpano.com/releases/1.20.8/examples/#demotour-winecellar))

## Usage

* Recommend project folder structure

```
root
│   package.json    
|   ...
└───public
│   │   index.html
│   │   ...
│   └───krpano
│       │   krpano.js
│       │   tour.xml
|       |   (plugins, panos, ...)
...
```

* In `tour.xml`, put `onstart="jscall(reactKrpano.onStart())"` in <krpano> to enable `react-krpano-hooks`
(In some cases, you may need to change your `url` in `xml` if you get `xml parsing failed` from KRPano, see [placeholder](#Krpano-module-load-failed) for more information)
```xml
<krpano ... onstart="jscall(reactKrpano.onStart())">
  ...
</krpano>
```
* Create container dom with `ref` from `useKrpano`
```javascript
import React from 'react'
import useKrpano from 'react-krpano-hooks'

const KrpanoExample = () => {
  const { containerRef } = useKrpano()

  return <div ref={containerRef} />
}
```

---
### Example 1
> Log scene name when a new scene will be loaded

example.js
```jsx
const Example = () => {
  const { containerRef } = useKrpano({
    globalFunctions: {
      logNewScene: (scene) => {
        console.log('New scene: ', scene)
      },
    },
  })

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}
```
tour.xml
```xml
<krpano>
  ...
  <events onnewscene="jscall(calc('reactKrpano.logNewScene(`' + get(xml.scene) + '`)'))" />
  ...
</krpano>
```
---
### Example 2
> Call krpano built-in action to reset `lookat`

example.js
```jsx
const Example = () => {
  const { containerRef, callKrpano } = useKrpano()

  const resetLookat = () => {
    callKrpano('lookto(0, 0)')
  }

  return (
    <>
      <button
        onClick={resetLookat}
        style={{ top: '10px', left: '10px', position: 'fixed' }}
      >
        Reset
      </button>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </>
  )
}
```

## APIs
```javascript
const {
  krpanoState: {
    scriptLoaded,
    isEmbedded,
    isLoaded,
    error
  },
  setKrpano,
  getKrpano,
  callKrpano,
  spheretoscreenKrpano,
  screentosphereKrpano,
  lockView,
  unlockView,
  containerRef
} = useKrpano(options)
```

### Returns

| Name                       | Type     | Description                                                                                     |
| -------------------------- | -------- |:----------------------------------------------------------------------------------------------- |
| krpanoState.scriptLoaded   | Boolean  | `True` when the krpano script is loaded                                                         |
| krpanoState.isEmbedded     | Boolean  | `True` when the embedding is done,<br/>but the xml haven't finished yet                         |
| krpanoState.isLoaded       | Boolean  | `True` after the xml loaded and parsed                                                          |
| krpanoState.error          | String   | Error message from krpano xml,<br/>will be `null` when no error                                 |
| setKrpano(variable, value) | Function | [Set](https://krpano.com/docu/js/#interfaceobject) the given krpano variable to the given value (return `false` when krpano not loaded yet) |
| getKrpano(variable)        | Function | [Return](https://krpano.com/docu/js/#interfaceobject) the value of the given krpano variable (return `false` when krpano not loaded yet)    |
| callKrpano(action)         | Function | [Call](https://krpano.com/docu/js/#interfaceobject) and execute any krpano action code (return `false` when krpano not loaded yet)          |
| spheretoscreenKrpano       | Function | Directly call the [spheretoscreen](https://krpano.com/docu/js/#interfaceobject) action          |
| screentosphereKrpano       | Function | Directly call the [screentosphere](https://krpano.com/docu/actions/#screentosphere) action      |
| lockView                   | Function | Lock whole view                                                                                 |
| unlockView                 | Function | Unlock whole view                                                                               |
| containerRef               | Ref      | Used to reference a React node                                                                  |

### Option Props

| Name            | Type     | Description                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------- | -------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| scriptPath      | String   | Path of script provided by krpano, default is `'krpano/krpano.js'`                                                                                                                                                                                                                                                                                                                                |
| embeddingParams | Object   | [Krpano embedding params](https://krpano.com/docu/html/#top), the script will embed again when these params change, default is `{xml: 'krpano/tour.xml', target: 'react-krpano', html: 'prefer'}`<br/><br/>Note: `react-krpano-hooks` have `onready` param already, so set `onready` into hooks will not work, you can set `handleLoaded` in option to execute function after embedding completed |
| scriptOptions   | Object   | Script options, default is `{async: true}`                                                                                                                                                                                                                                                                                                                                                        |
| handleLoaded    | Function | Execute when embedding finished                                                                                                                                                                                                                                                                                                                                                                   |
| globalFunctions | Object   | Functions in this object will be registered as `js global variables`,<br/>you can call `jscall(reactKrpano.customFnc())` (or other name you assign in `globalVarName`)  in xml to execute global function<br/><br/>Note: `react-krpano-hooks` have `onStart` global function already, so set `onStart` into hooks will not work                                                                   |
| globalVarName   | String   | Variable name used for global functions,<br/>default is `'reactKrpano'`                                                                                                                                                                                                                                                                                                                           |
| height                |  String        |  KRPano container's height, default is `100vh`                                                                                                                                                                                                                                                                                                                                                                                               |
| width               |  String        |  KRPano container's width, default is `100vw`                                                                                                                                                                                                                                                                                                                                                                                                 |



## Appendix and FAQ

### Krpano module load failed
Please check the `url` in `xml`, you can use krpano's placeholders to set the correct url,
according to your folder structure in `/public`, for example:
```
root
│   package.json    
|   ...
└───public
│   │   index.html
│   │   ...
│   └───krpano
│       │   krpano.js
│       │   tour.xml
│       │   ...
|       └───plugins
|           |    webvr.xml
|           |    ...
...
```
- `%HTMLPATH%`: Path to the folder of the html file.
<br/>eg. `url="%HTMLPATH%/krpano/plugins/webvr.xml"`
- `%VIEWER%`: Path to the folder of the core krpano viewer file.
<br/>eg. `url="%VIEWER%/plugins/webvr.xml"`

For the completed url attributes list, you can follow [here](https://krpano.com/docu/xml/#url)

### Get global javascript function & variable from `xml`
Please ref [jscall](https://krpano.com/docu/actions/#jscall) and [jsget](https://krpano.com/docu/actions/#jsget)

### Prefer load krpano script at the beginning
`react-krpano-hooks` will load `krpano.js` when the hook start, if you want to load at the beginning, you can put the code below in your `public/index.html`
```htmlmixed
...
<body>
  <script src="krpano/krpano.js"></script>
  ...
  ...
</body>
```

### Pass krpano's variables into js function arguments
Use the `calc()` action to build the Javascript call and pass krpano variables, for example:
```xml
<action>
  ...
  jscall(calc("reactKrpano.logNewScene(`' + get(xml.scene) + '`)"))
  ...
</action>
```

### Custom styles
In addition to passing height & width into options, you can directly set inline style and classes in your jsx dom, for example:
```jsx
const KrpanoExample = () => {
  const { containerRef } = useKrpano({
    height: '50vh',
    width: '50vw'
  })

  return <div ref={containerRef} style={{ position: 'relative', top: '10px' }} className="custom-styles" />
}
```

## Change log
[change log](https://github.com/shinenic/react-krpano-hooks/blob/master/CHANGELOG.md)

## Credits
`react-krpano-hooks` is mainly inspired by [react-krpano](https://github.com/browniu/react-krpano)

## Keywords
`React` `Hooks` `Krpano` `Custom hooks`

## License
[MIT](https://github.com/shinenic/react-krpano-hooks/blob/master/LICENSE)
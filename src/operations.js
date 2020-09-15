export const getOperations = (krpanoInterface) => {
  const getKrpano = (variable) => {
    return krpanoInterface.get(variable)
  }

  const setKrpano = (variable, value) => {
    krpanoInterface.set(variable, value)
  }

  const callKrpano = (action) => {
    krpanoInterface.call(action)
  }

  const spheretoscreenKrpano = (h, v) => {
    krpanoInterface.spheretoscreen(h, v)
  }

  const screentosphereKrpano = (x, y) => {
    krpanoInterface.set(x, y)
  }

  const lockView = () => {
    setKrpano('control.usercontrol', 'off')
  }

  const unlockView = () => {
    setKrpano('control.usercontrol', 'all')
  }

  return {
    getKrpano,
    setKrpano,
    callKrpano,
    spheretoscreenKrpano,
    screentosphereKrpano,
    lockView,
    unlockView,
  }
}

export const getOperations = (krpanoInterface) => {
  const getKrpano = (variable) => {
    if (!Boolean(krpanoInterface)) return null
    return krpanoInterface.get(variable)
  }

  const setKrpano = (variable, value) => {
    if (!Boolean(krpanoInterface)) return false

    krpanoInterface.set(variable, value)
    return true
  }

  const callKrpano = (action) => {
    if (!Boolean(krpanoInterface)) return false

    krpanoInterface.call(action)
    return true
  }

  const spheretoscreenKrpano = (h, v) => {
    if (!Boolean(krpanoInterface)) return false

    krpanoInterface.spheretoscreen(h, v)
    return true
  }

  const screentosphereKrpano = (x, y) => {
    if (!Boolean(krpanoInterface)) return false

    krpanoInterface.set(x, y)
    return true
  }

  const lockView = () => {
    if (!Boolean(krpanoInterface)) return false

    setKrpano('control.usercontrol', 'off')
    return true
  }

  const unlockView = () => {
    if (!Boolean(krpanoInterface)) return false

    setKrpano('control.usercontrol', 'all')
    return true
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

export const warnIfInvalidEmbeddingParams = (embeddingParams = {}) => {
  if (Boolean(embeddingParams.onready)) {
    console.warn(
      `"React-use-krpano" have "onready" param already ` +
        `so set "onready" into hooks will be invalid, ` +
        `you can set "handleLoaded" in option to execute function after embedding completed.`
    )
  }
}

export const warnIfInvalidGlobalFunctions = (globalFunctions = {}) => {
  if (Boolean(globalFunctions.onStart)) {
    console.warn(
      `"React-use-krpano" have "onStart" global function already, ` +
        `so set "onStart" into hooks will not work.`
    )
  }
}

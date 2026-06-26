import transpileAmosToJS from "#root/src/transpiler/transpileAmosToJS.js"


/**
 * Processes the dummy "AMOS" code by returning its length.
 * @param {string} amosCode - The AMOS Basic code to transpile.
 * @returns {number} - The number of characters in the code.
 */
export const transpileCode = (amosCode) => {

  const transpileResult = transpileAmosToJS(amosCode);
  return transpileResult;
};
import useAMOSParser from "#root/src/transpiler/useAmosParser.js"


/**
 * Processes the dummy "AMOS" code by returning its length.
 * @param {string} amosCode - The code to process.
 * @returns {number} - The number of characters in the code.
 */
export const processCode = (amosCode) => {

  const transpiledCode = useAMOSParser(amosCode);
  return transpiledCode;
};
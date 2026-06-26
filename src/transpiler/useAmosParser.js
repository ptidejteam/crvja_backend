import antlr4 from "antlr4";
import AmosTranspiler from "#root/src/transpiler/AmosTranspiler.js";
import AMOSParser from "#root/src/transpiler/grammar/generated/AMOSParser.js";
import AMOSLexer from "#root/src/transpiler/grammar/generated/AMOSLexer.js";
import CollectingErrorListener from "#root/src/transpiler/ErrorListener.js";

// import prettier from "prettier/standalone";
// import babelPlugin from "prettier/plugins/babel";
// import estreePlugin from "prettier/plugins/estree";

export default function useAMOSParser(amosCode) {
  const chars = new antlr4.InputStream(amosCode);
  const lexer = new AMOSLexer(chars);

  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new AMOSParser(tokens);
  
  const tree = parser.program();

  const translator = new AmosTranspiler();
  const walker = new antlr4.tree.ParseTreeWalker();
  walker.walk(translator, tree);

  const lexErrs = "";
  const parseErrs = "";

  const translatedJsCode = translator.getJavaScript();

  const response = {
    lexErrs: lexErrs,
    parseErrs: parseErrs,
    translatedJsCode: translatedJsCode,
  }

  return response;
}

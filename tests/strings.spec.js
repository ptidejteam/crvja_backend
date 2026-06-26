import translateAmos from "./helpers/translate.mjs";

function translate(code) {
  const [lexErrs, parseErrs, normalizedJS] = translateAmos(code);
  expect(lexErrs.errors).toEqual([]);
  expect(parseErrs.errors).toEqual([]);
  return normalizedJS.replace(/\s+/g, " ").trim();
}

test("string assignments", () => {
  const amosBasicCode = `
A$ = "Hello, World!"
  `;

  const normalizedJS = translate(amosBasicCode);

  expect(normalizedJS).toContain('A$ = "Hello, World!";');

});

test("string assignments and text", () => {
  const amosBasicCode = `
A$ = "Hello, World!"
Text 10,10,A$
  `;

  const normalizedJS = translate(amosBasicCode);

  // Find the name of the div (the transpiler uses a random identifier)
  const match = normalizedJS.match(/const (textDiv1010[a-z0-9]+)/);
  if (!match) {
    throw new Error("Could not find generated variable name for textDiv1010");
  }
  const varName = match[1];

  expect(normalizedJS).toContain('A$ = "Hello, World!";');
  expect(normalizedJS).toContain(`${varName}.innerText = A$;`);
});

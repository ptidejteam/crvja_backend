import translateAmos from "./helpers/translate.mjs";

function translate(code) {
  const [lexErrs, parseErrs, normalizedJS] = translateAmos(code);
  expect(lexErrs.errors).toEqual([]);
  expect(parseErrs.errors).toEqual([]);
  return normalizedJS.replace(/\s+/g, " ").trim();
}

test("Text", () => {
  const amosBasicCode = `
        Text 10,10,"Hello, World!"
    `;

  const normalizedJS = translate(amosBasicCode);

  // Find the name of the div (the transpiler uses a random identifier)
  const match = normalizedJS.match(/const (textDiv1010[a-z0-9]+)/);
  if (!match) {
    throw new Error("Could not find generated variable name for textDiv1010");
  }
  const varName = match[1];
  
  const expectedJsCode = `
    const ${varName} = document.createElement('div');
    ${varName}.innerText = "Hello, World!";
    ${varName}.id = '${varName}';
    ${varName}.style.position = 'absolute';
    ${varName}.style.left = '10px';
    ${varName}.style.top = '10px';
    ${varName}.style.fontSize = '14px';
    ${varName}.style.color = getColour(Ink);
    ${varName}.style.backgroundColor = getColour(Paper);
    ${varName}.style.zIndex = 99;
    document.getElementById('amos-screen').appendChild(${varName});
  `;

  const normalizedExpectedJsCode = expectedJsCode.replace(/\s+/g, ' ').trim();
  expect(normalizedJS).toContain(normalizedExpectedJsCode);
});


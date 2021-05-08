const root = document.getElementById("root");
const generateBtn = document.getElementById("generateBtn");

const passRange = document.getElementById("passRange");

const lowerCaseCheck = document.getElementById("lowercase");
const upperCaseCheck = document.getElementById("uppercase");
const digitCheck = document.getElementById("digit");
const symbolCheck = document.getElementById("symbol");

function generateUpperCase() {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}

function generateLowerCase() {
  return String.fromCharCode(97 + Math.floor(Math.random() * 26));
}

function generateDigit() {
  return Math.floor(Math.random() * 11);
}

function generateSymbol() {
  const symbols = " !\"#$%&'()*+,-./:;<=>?@[]^_`{|}~"; // taken from OWASP
  return symbols.charAt(Math.floor(Math.random() * symbols.length));
}

// helper function
function insertIf(condition, fn) {
  return condition ? [fn] : [];
}

function constructGenerators() {
  const hasLower = lowerCaseCheck.checked;
  const hasUpper = upperCaseCheck.checked;
  const hasDigit = digitCheck.checked;
  const hasSymbol = symbolCheck.checked;

  if (!(hasLower || hasUpper || hasDigit || hasSymbol)) {
    return [generateLowerCase];
  }

  //   construct generators to be used
  const generators = [
    ...insertIf(hasLower, generateLowerCase),
    ...insertIf(hasUpper, generateUpperCase),
    ...insertIf(hasDigit, generateDigit),
    ...insertIf(hasSymbol, generateSymbol),
  ];

  return generators;
}

function genertePassword(len = 12, generators) {
  let count = 0;
  let passPhrase = "";

  // generate random chars untill length is fulfilled
  while (count < len) {
    //   randomly call generators to be used
    //  add append output
    passPhrase += generators[Math.floor(Math.random() * generators.length)]();
    count++;
  }

  console.log(passPhrase.slice(0, len).length);
  return passPhrase.slice(0, len);
}

function main() {
  passRange.addEventListener("change", ({ target }) => {
    const generators = constructGenerators();
    root.innerText = genertePassword(target.value, generators);
  });

  generateBtn.addEventListener("click", () => {
    const generators = constructGenerators();
    root.innerText = genertePassword(passRange.value, generators);
  });
}

// call main function
main();

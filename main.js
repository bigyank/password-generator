const password = document.getElementById("password");
const passwordContainer = document.getElementById("password-container");
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
  let passPhrase = "";

  // generate random chars untill length is fulfilled
  while (passPhrase.length <= len) {
    //   randomly call generators to be used
    passPhrase += generators[Math.floor(Math.random() * generators.length)]();
  }

  return passPhrase;
}

function main() {
  passRange.addEventListener("input", ({ target }) => {
    const generators = constructGenerators();
    password.innerText = genertePassword(target.value, generators);
  });

  generateBtn.addEventListener("click", () => {
    const generators = constructGenerators();
    password.innerText = genertePassword(passRange.value, generators);
  });

  //   default password
  const generators = constructGenerators();
  password.innerText = genertePassword(passRange.value, generators);
}

// call main function
main();

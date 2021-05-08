const password = document.getElementById("password");
const passwordContainer = document.getElementById("password-container");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copy");

const passRange = document.getElementById("passRange");
const rangeInfo = document.getElementById("range-info");

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

function copyToClip(string) {
  const element = document.createElement("textarea");
  element.value = string;
  document.body.appendChild(element);
  element.select();
  document.execCommand("copy");
  document.body.removeChild(element);
  alert("copied to clipboard");
}

function appendPassword() {
  rangeInfo.innerText = passRange.value;
  const generators = constructGenerators();
  password.innerText = genertePassword(passRange.value - 1, generators);
}

function main() {
  // on range change
  passRange.addEventListener("input", appendPassword);

  // on generate btn click
  generateBtn.addEventListener("click", appendPassword);

  // copy to clipboard
  copyBtn.addEventListener("click", () => copyToClip(password.innerText));

  //   default password
  appendPassword();
}

// call main function
main();

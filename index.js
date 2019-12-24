/*
  word (string) = the word that is analyzed
  ISO_639_2 (string) = language code, default eng (english)
*/

// source: https://stackoverflow.com/questions/1072765/count-number-of-matches-of-a-regex-in-javascript#answer-1072782
const count = (str = "", reg) => {
  return ((str || "").match(reg) || []).length;
};

let analyze = (word, ISO_639_2 = "eng") => {
  if (typeof word !== "string") throw new Error("Word must be a string");
  if (typeof ISO_639_2 !== "string")
    throw new Error("ISO_639_2 must be a string");

  let keystrokes = 0;

  // first, calculate one keystroke for every letter
  keystrokes = word.length;

  // calculate all the uppercase letters of the latin alphabet
  keystrokes += count(word, /[A-Z]/g);

  switch (ISO_639_2) {
    case "eng": //english
      break;
    default:
      throw new Error('language "' + ISO_639_2 + '" not supported');
  }

  console.log("keystroke-counter:", word.length);
  return word.length;
};

let more = () => {};

module.exports = { analyze, more };

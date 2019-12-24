/*
  word (string) = the word that is analyzed
  ISO_639_2 (string) = language code, default eng (english)
*/

let analyze = (word, ISO_639_2 = "eng") => {
  return word.length;
};

let more = () => {};

module.exports = { analyze, more };

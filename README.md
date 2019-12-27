# Keystroke Counter

Keystroke Counter is a library to analyze how many keystrokes a word in each language takes.

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install foobar.

```bash
npm i keystroke-counter
```

## Usage

```js
import keystrokeCounter from 'keystroke-counter';

keystrokeCounter.analyze("Test")); # default language is english, returns 5
keystrokeCounter.analyze("Äpfel", "ger")); # returns 6
keystrokeCounter.analyze("Œdipe", "fre")); # returns 9
keystrokeCounter.analyze("있다", "kor")); # returns 6
```

## Supported languages

```txt
Catalan
Chinese
Czech
Danish
Dutch
English
Esperanto
French
German
Greek
Hindi
Icelandic
Italian
Japanese
Korean
Latvian
Lithuanian
Persian
Polish
Portuguese
Romanian
Spanish
Turkish
Vietnamese
```

## Attention

Languages japanese and korean have a word based calculation, so if the word is not included, the calculate keystrokes will be zero. For chinese the calculation is greatly simplified, as each character just counts as 5. Please let me know if there is a more accurate way to calculate the keystrokes for these languages.

## Contributing

Please write me an email to go4christian@gmail.com if you want to contribute, as I'm new to the whole pull request/collaborate coding thing.

## License

[MIT](https://choosealicense.com/licenses/mit/)

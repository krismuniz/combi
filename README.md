# Combi
[![npm](https://img.shields.io/npm/v/combi.svg?style=flat-square)](https://npm.im/combi) [![License:MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT) [![Build Status](https://img.shields.io/travis/krismuniz/combi.svg?style=flat-square)](http://travis-ci.org/krismuniz/combi) [![Coverage Status](https://img.shields.io/coveralls/krismuniz/combi.svg?style=flat-square)](https://coveralls.io/github/krismuniz/combi?branch=master) ![Type Declarations](https://img.shields.io/npm/types/combi.svg?style=flat-square)

⌨️ A tiny keyboard shortcut handling library.

#### Features

- **Pocket-sized** – library size is less than 600 bytes (~350 bytes gzipped!)
- **Minimal** – pass a `callback` function `=>` get results.
- **Specialized** – only handles key combinations with at least one or more [modifier keys](#supported-modifiers) pressed and at most one regular key ([read more](#considerations))
- **Framework-agnostic** – can be plugged on any standard `KeyboardEvent` listener (`keyup`, `keydown`, `keypress`, etc.)

#### Use Cases

- Declaratively listen for shortcut events
- Key combination input field for user-friendly shortcut configuration
- Handle simple or complex shortcut UIs with a standardized format

#### Bundle Sizes

[![minizipped size](https://img.shields.io/bundlephobia/min/combi.svg?style=flat-square)](https://npm.im/combi)
[![minizipped size](https://img.shields.io/bundlephobia/minzip/combi.svg?style=flat-square)](https://npm.im/combi)

**Example**

```js
import combi from 'combi'

const onShortcut = combi((shortcut, keyEvent) => {
  console.log(shortcut) // -> 'ctrl+z'
})

window.addEventListener('keydown', onShortcut)
```

## Installation

### Via npm

```sh
npm install --save combi
```

### Via unpkg

Alternatively, you can download and/or import it from [unpkg.com/combi](https://unpkg.com/combi/) as an ES or UMD module.

#### Import as ES Module

```javascript
import combi from 'https://unpkg.com/combi/dist/combi.es.js'
```

#### Use as UMD Module

```html
<!-- This adds `combi` to the global context (`window`) -->
<script src="https://unpkg.com/combi/dist/combi.umd.js"></script>
```

You can find the library on `window.combi`

## Usage Examples

### Listening for Shortcuts

`combi` takes a handler function as an argument. This handler function should take two arguments. The first one: the keyboard shortcut that has been pressed. The second one: the original keyboard event. You can match these shortcuts however you want.

[See it in action](https://projects.krismuniz.com/combi/global-shortcuts/)

```js
import combi from 'combi'

const onShortcut = combi((shortcut) => {
  switch ((shortcut, event)) {
    case 'meta+s':
    case 'ctrl+s':
      event.preventDefault()
      action('save')
      break
    case 'shift+meta+z':
    case 'ctrl+y':
      event.preventDefault()
      action('redo')
      break
    case localStorage.getItem('shortcut'):
      event.preventDefault()
      action('custom-action')
      break
    default:
    // do nothing.
  }
})

window.addEventListener('keydown', onShortcut)
```

### Key Combination Input Field

You can use `combi` to create custom input fields for specifying key combinations. Useful when building apps with configurable keyboard shortcuts.

[See it in action](https://projects.krismuniz.com/combi/shortcut-input/)

```js
import combi from 'combi'

// pass `true` as second argument to call preventDefault() when a combination is used
const onShortcut = combi((combination, event) => {
  event.target.value = combination
  localStorage.setItem('shortcut', combination)
}, true)

const inputElement = document.querySelector('#shortcut-input')

inputElement.addEventListener('keydown', onShortcut)
```

## Reference

### API

#### combi(callback, [preventDefault])

```
combi(callback: Function, preventDefault?: Boolean)
```

##### callback `{Function}`

A function that handles shortcuts, that looks like this:

```
(shortcut: String, event: KeyboardEvent) => any
```

_shortcut_ `{String}` - keyboard shortcut that has been pressed (e.g. `shift+meta+x`, `ctrl+y`)

_event_ `{KeyboardEvent}` - the original `KeyboardEvent` passed to `combi` by the event listener

##### preventDefault `{Boolean}`

Whether `combi` should always call `.preventDefault()` when receiving a keyboard event. Defaults to `false`

### Supported Modifiers

These are the modifiers `combi` supports. Shortcuts detected will always be parsed in this order:

- <kbd>ctrl</kbd>
- <kbd>alt</kbd>
- <kbd>shift</kbd>
- <kbd>meta</kbd>
  - Command key (<kbd>⌘</kbd>) on macOS
  - Windows key (<kbd>⊞</kbd>) on Windows (note: using `meta` on Windows is highly discouraged for non-system shortcuts)

### Considerations

In order to maintain `combi` as simple as possible, while enabling the most common and standard use cases, some rules are in place:

- Only key combinations of two or more keys are allowed, with the following conditions:
  - _at least_ one or more modifiers (<kbd>ctrl</kbd>, <kbd>shift</kbd>, <kbd>alt</kbd>, etc.)
  - _at most_ one regular key (<kbd>a</kbd>-<kbd>z</kbd>, <kbd>0</kbd>-<kbd>9</kbd>, <kbd>-</kbd>, <kbd>+</kbd>, <kbd>[</kbd>, <kbd>]</kbd>, <kbd>\\</kbd>, etc.)
  - Example: <kbd>shift</kbd>+<kbd>k</kbd>+<kbd>z</kbd> won't work
- Key combinations are represented as a string concatenation of modifier keys and an (optional, if the combination is of more than two ) regular key in the following normative order: <kbd>ctrl</kbd>`+`<kbd>alt</kbd>`+`<kbd>shift</kbd>`+`<kbd>meta</kbd>`+`<kbd>somekey</kbd>
- All non-modifier keys are lowercased versions of [`KeyboardEvent.code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) with the words `Key` and `Digit` removed
  - Examples:
    - `KeyA` becomes `a`
    - `Digit0` becomes `0`
    - `BracketLeft` becomes `bracketleft`

**Note:** These considerations are not arbitrary. Most of them are derived from the following guidelines:

- [Keyboard - Human Interface Guidelines - Apple](https://developer.apple.com/design/human-interface-guidelines/macos/user-interaction/keyboard/)
- [Guidelines for Keyboard User Interface Design - Microsoft](https://docs.microsoft.com/en-us/previous-versions/windows/desktop/dnacc/guidelines-for-keyboard-user-interface-design#atg_keyboardshortcuts_creating_shortcut_keys_and_access_keys)
- [Keyboard | Microsoft Docs](https://docs.microsoft.com/en-us/windows/desktop/uxguide/inter-keyboard)
- [Character Key Shortcuts - Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/#character-key-shortcuts)

## Contributing

#### Bug Reports & Feature Requests

Something does not work as expected or perhaps you think this project _needs_ a feature? Please open an issue using GitHub [issue tracker](https://github.com/krismuniz/combi/issues/new).

Make sure that an issue pointing out your specific problem does not exist already. Please be as specific and straightforward as possible.

#### Pull Requests

Pull Requests (PRs) are welcome! You should follow the [same basic stylistic conventions](http://standardjs.com/rules.html) as the original code.

Make sure that a pull request solving your specific problem does not exist already. Your changes must be concise and focus on solving a discrete problem.

## License

[The MIT License (MIT)](https://github.com/krismuniz/combi/blob/master/LICENSE.md)

Copyright (c) 2018 [Kristian Muñiz](https://www.krismuniz.com)

export default function (cb, preventDefault = false) {
  let KEY_REGEX = /Key|Digit/
  let MODS = ['shift', 'meta', 'control', 'option', 'alt']

  return (e) => {
    if (!e) return false
    if (preventDefault !== false) e.preventDefault()

    let keys = [
      e.ctrlKey ? 'control' : undefined,
      e.altKey ? 'alt' : undefined,
      e.shiftKey ? 'shift' : undefined,
      e.metaKey ? 'meta' : undefined,
      MODS.includes(e.key.toLowerCase()) ? undefined : e.code.replace(KEY_REGEX, '')
    ]

    let combo = keys.filter(Boolean)

    if (combo.length >= 2) {
      if (cb) {
        cb(combo.join('+').toLowerCase(), e)
      }
    }
  }
}

export default function (cb, preventDefault = false) {
  return (e) => {
    if (!e) return
    if (preventDefault) e.preventDefault()

    let combo = [
      e.ctrlKey ? 'ctrl' : undefined,
      e.altKey ? 'alt' : undefined,
      e.shiftKey ? 'shift' : undefined,
      e.metaKey ? 'meta' : undefined,
      ['Shift', 'Meta', 'Control', 'Option', 'Alt'].indexOf(e.key) >= 0 ? undefined : e.code.replace(/Key|Digit/, '')
    ].filter(Boolean)

    if (combo.length >= 2) {
      if (cb) {
        cb(combo.join('+').toLowerCase(), e)
      }
    }
  }
}

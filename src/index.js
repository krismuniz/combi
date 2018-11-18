export default function (cb, preventDefault = false) {
  return (e) => {
    if (!e) return false
    if (preventDefault) e.preventDefault()

    let combo = [
      e.ctrlKey ? 'ctrl' : undefined,
      e.altKey ? 'alt' : undefined,
      e.shiftKey ? 'shift' : undefined,
      e.metaKey ? 'meta' : undefined,
      ['Shift', 'Meta', 'Control', 'Option', 'Alt'].includes(e.key) ? undefined : e.code.replace(/Key|Digit/, '')
    ].filter(Boolean)

    if (combo.length >= 2) {
      if (cb) {
        cb(combo.join('+').toLowerCase(), e)
      }
    }
  }
}

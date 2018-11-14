import test from 'ava'
import combi from '../dist/combi.js'

const keyboardEvent = (props) => {
  return {
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    code: undefined,
    key: undefined,
    preventDefault: () => {},
    ...props
  }
}

const asyncAssert = ({
  execute,
  assert
}) => {
  return new Promise(execute).then(assert)
}

test('can be instantiated properly', (t) => {
  const keyEvent = keyboardEvent({
    metaKey: true,
    key: 'k',
    code: 'KeyM'
  })

  t.not(combi, undefined)
  t.is(typeof combi, 'function')
  t.is(typeof combi(), 'function')
  t.is(combi()(), false)
  t.is(combi()(keyEvent), undefined)
})

test('detects correct shortcut when all modifiers and a letter', (t) => {
  const keyEvent = keyboardEvent({
    ctrlKey: true,
    altKey: true,
    shiftKey: true,
    metaKey: true,
    key: 'Z',
    code: 'KeyZ'
  })

  return asyncAssert({
    execute: (resolve) => {
      combi((shortcut, event) => {
        resolve({
          shortcut,
          event
        })
      })(keyEvent)
    },
    assert: ({
      shortcut,
      event
    }) => {
      t.is(shortcut, 'control+alt+shift+meta+z')
      t.deepEqual(event, keyEvent)
    }
  })
})

test('only detects shortcuts, not single keystrokes', (t) => {
  const invalidShortcut = keyboardEvent({
    key: 'z',
    code: 'KeyZ'
  })

  const validShortcut = keyboardEvent({
    metaKey: true,
    key: 'z',
    code: 'KeyZ'
  })

  return new Promise((resolve, reject) => {
    combi(() => {
      reject(new Error('Non-valid shortcut triggered callback()'))
    })(invalidShortcut)
    combi((shortcut, event) => {
      resolve({
        shortcut,
        event
      })
    })(validShortcut)
  }).then(({
    shortcut,
    event
  }) => {
    t.is(shortcut, 'meta+z')
    t.deepEqual(event, validShortcut)
  })
})

test('always calls .preventDefault() when second argument is true', (t) => {
  t.plan(2)

  const keyEvent = keyboardEvent({
    key: 'z',
    code: 'KeyZ',
    preventDefault: () => {
      t.pass(true)
    }
  })

  const keyEventB = keyboardEvent({
    metaKey: true,
    key: 'z',
    code: 'KeyZ',
    preventDefault: () => {
      t.pass(true)
    }
  })

  combi(() => {}, true)(keyEvent)
  combi(() => {}, true)(keyEventB)
})

test('detects correct shortcut: control+alt+shift+meta+0', (t) => {
  const keyEvent = keyboardEvent({
    ctrlKey: true,
    altKey: true,
    shiftKey: true,
    metaKey: true,
    key: ')',
    code: 'Digit0'
  })

  return new Promise((resolve) => {
    combi((shortcut, event) => {
      resolve({
        shortcut,
        event
      })
    })(keyEvent)
  }).then(({
    shortcut,
    event
  }) => {
    t.is(shortcut, 'control+alt+shift+meta+0')
    t.deepEqual(event, keyEvent)
  })
})

test('detects correct shortcut: shift+meta+quote', (t) => {
  const keyEvent = keyboardEvent({
    metaKey: true,
    shiftKey: true,
    key: '"',
    code: 'Quote'
  })

  return new Promise((resolve) => {
    combi((shortcut, event) => {
      resolve({
        shortcut,
        event
      })
    })(keyEvent)
  }).then(({
    shortcut,
    event
  }) => {
    t.is(shortcut, 'shift+meta+quote')
    t.deepEqual(event, keyEvent)
  })
})

test('detects correct shortcut: shift+meta', (t) => {
  const keyEvent = keyboardEvent({
    metaKey: true,
    shiftKey: true,
    key: 'Meta',
    code: 'MetaLeft'
  })

  return new Promise((resolve) => {
    combi((shortcut, event) => {
      resolve({
        shortcut,
        event
      })
    })(keyEvent)
  }).then(({
    shortcut,
    event
  }) => {
    t.is(shortcut, 'shift+meta')
    t.deepEqual(event, keyEvent)
  })
})

test('detects correct shortcut: alt+shift+bracketleft', (t) => {
  const keyEvent = keyboardEvent({
    altKey: true,
    shiftKey: true,
    key: '{',
    code: 'BracketLeft'
  })

  return new Promise((resolve) => {
    combi((shortcut, event) => {
      resolve({
        shortcut,
        event
      })
    })(keyEvent)
  }).then(({
    shortcut,
    event
  }) => {
    t.is(shortcut, 'alt+shift+bracketleft')
    t.deepEqual(event, keyEvent)
  })
})

function flatObject (object = {}, path = '', start = {}) {
  return Object.keys(object).reduce((acc, current) => {
    const key = path !== '' ? path + '.' + current : current
    if (typeof object[current] === 'object' && !Array.isArray(object[current])) {
      return this.flatObject(object[current], current, acc)
    } else {
      return {...acc, [key]: object[current]}
    }
  }, start)
}

function hasOwnDeepProperty (obj = {}, key = '') {
  const props = key.split('.')
  const current = props[0]
  if (current in obj) {
    if (props.length === 1) {
      return true
    } else {
      props.shift()
      return this.hasOwnDeepProperty(obj[current], props.join('.'))
    }
  }
  return false
}

function getDeepProperty (obj = {}, key = '') {
  const props = key.split('.')
  const current = props[0]
  if (current in obj) {
    if (props.length === 1) {
      return obj[current]
    } else {
      props.shift()

      return getDeepProperty(obj[current], props.join('.'))
    }
  }
  return null
}

module.exports = {
  flatObject,
  getDeepProperty,
  hasOwnDeepProperty
}

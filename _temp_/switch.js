const objectSwitch = (value, target, exec = false) => {
  return (target[value]
    ? ( exec ? target[value]() : target[value] )
    : ( target.default ? ( exec ? target.default() : target.default ) : null )
  )
}

const regexObjectSwitch = (value, target, flag="g") => {
  let defaults = target.default ? target.default : null
  if (target.default) delete target.default

  let matched = null
  for (let regex in target) {
    if (new RegExp(regex, flag).test(value)) {
      matched = target[regex]
      break
    }
  }

  return matched ? matched : (defaults ? defaults : null)
}

module.exports = {
  regexObjectSwitch,
  objectSwitch
}
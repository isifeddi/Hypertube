const isEmpty = require('../empty/isEmpty')
const isAlpha = require('../string/isAlpha')

const isLastname = (lastname) => {
    if(isEmpty(lastname)  || typeof(lastname) !== 'string')  return false
    if(lastname.length > 20 || lastname.length < 2) return false
    if(!isAlpha(lastname)) return false
    return true
}

module.exports = isLastname

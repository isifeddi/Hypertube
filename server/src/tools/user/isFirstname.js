const isEmpty = require('../empty/isEmpty')
const isAlpha = require('../string/isAlpha')

const isFirstname = (firstname) => {
    if(isEmpty(firstname)  || typeof(firstname) !== 'string') return false;
    if(firstname.length > 20 || firstname.length < 2) return false
    if(!isAlpha(firstname)) return false
    return true
}

module.exports = isFirstname

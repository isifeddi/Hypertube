const isEmpty = require('../empty/isEmpty')

const isEmail = (email) => {
    if(isEmpty(email)  || typeof(email) !== 'string') return false
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) === false) return false
    if(email.length > 50) return false
    return true
}

module.exports = isEmail

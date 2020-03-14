const isEmpty = require('../empty/isEmpty')

const isTitle = (title) => {
    // if(isEmpty(title))
    //     return false
    if(title && !/^.{1,50}$/.test(title))
        return false
    if(title && /<\/?[a-z][\s\S]*>/i.test(title))
        return false
    return true
}

module.exports = isTitle
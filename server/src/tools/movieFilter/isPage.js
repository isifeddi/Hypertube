const isPage = (page) => {
    if(!Number.isInteger(page) || page < 1)
        return false
    return true
}

module.exports = isPage;
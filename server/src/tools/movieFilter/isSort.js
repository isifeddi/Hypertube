const isSort = (sort) => {
    if(sort !== null && sort !== 'year' && sort !== 'rating' && sort !== 'last_added' && sort !== 'trending')
        return false
    return true
}

module.exports = isSort;
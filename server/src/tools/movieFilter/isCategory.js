const isCategory = (category) => {
    // if(isEmpty(category))
    //     return false
    if(category !== null && category !== 'animation' && category !== 'action' && category !== 'adventure' && category !== 'comedy' && category !== 'drama' && 
        category !== 'horror' && category !== 'music' && category !== 'romance' && category !== 'sci-Fi' && category !== 'thriller')
        return false
    return true
}

module.exports = isCategory;
const cloudscraper = require('cloudscraper');

const getMoviesByName = (filter) => {
    return new Promise((resolve, reject) => (
        cloudscraper.get(`https://tv-v2.api-fetch.website/movies/${filter.page}?sort=title&order=1&keywords=${filter.title}`)
        .then(resp => {
            let result1 = JSON.parse(resp);
            if(result1.length > 0 && result1[0].title){
                resolve(result1);
            }
            else
            {
                cloudscraper.get(`https://yts.unblocked4u.net/api/v2/list_movies.json/?limit=50&sort_by=title&query_term=${filter.title}&page=${filter.page}`)
                .then(resp => {
                    let result2 = JSON.parse(resp);
                    if(result2.status === 'ok' && result2.data.movie_count > 0)
                    {
                        if(result2.data.movies.length > 0)
                            resolve(result2.data.movies);
                        else
                            resolve([]);
                    }
                    else
                    {
                        resolve([]);
                    }
                })
                .catch(err => {});
            }
        })
        .catch(err => {})
    ))
}

module.exports = getMoviesByName;
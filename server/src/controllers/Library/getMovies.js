const user = require ('../../models/user');
let cloudscraper = require('cloudscraper');

getMovies = (req, res) => {
    const page = req.body.page;
    cloudscraper.get(`https://tv-v2.api-fetch.website/movies/${page}?sorta=rating&order=-1`)
    .then(resp => {
        let result1 = JSON.parse(resp);
        if(result1.length > 0 && result1[0].title)
        {
            res.send(result1);
        }
        else
        {
            cloudscraper.get(`https://yts.unblocked4u.org/api/v2/list_movies.json/?limit=50&sort_by=rating&page=${page}`)
            .then(resp => {
                let result2 = JSON.parse(resp);
                if(result2.status === 'ok' && result2.data.movies.length > 0)
                {
                    res.send(result2.data.movies);
                }
            })
            .catch(err => {});
        }
    })
    .catch(err => {});
}
module.exports = getMovies;
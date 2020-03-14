const user = require('../../models/user');
const unirest = require('unirest')

getMovieDataById = (id) => {
    return new Promise((resolve, reject) => {
        let imdb = null;
        var req = unirest("GET",
            `https://api.themoviedb.org/3/movie/${id}?api_key=0f87bface5c69fcf394fc387f33049fa&language=en-US`);
        req.end(function (result) {
            if (result.error) console.log(result.error)
            if (result.body.imdb_id)
                imdb = result.body.imdb_id;
            resolve(imdb);
        });
    })
}
getComments = async (req, res) => {
    let data = req.body;
    let imdb = data.code;
    if (data.type === "id") {
        let temp = await getMovieDataById(data.code)
        if (temp !== null)
            imdb = temp;
    }
    const comments = await user.getComment('GetComments', [imdb]);
    res.send({isValid: true, comments: comments});
}
module.exports = getComments;
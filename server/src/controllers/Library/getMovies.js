const getAllMovies = require('./getAllMovies');
const getFilteredMovies = require('./getFilteredMovies');
const getMoviesByName = require('./getMoviesByName');
const tools = require('../../tools/index');
const user = require('../../models/user')
const fs = require('fs-extra')
const getDate = (date) =>{
    const today = new Date();
    const movieDate = new Date(date);
    const diff = today - movieDate;
    if(diff >= 2592000000)
        return true;
    else
        return false
}

getMovies = async (req, res) => {
    const seenMovies = await user.select("getAllSeenMovies");
    for(var i =0; i < seenMovies.length; i++)
    {
        if(getDate(seenMovies[i].date))
        {
            fs.remove(`./src/movies_Hash/torrent-stream/${seenMovies[i].hash}`, err => {
                if (err) return console.error(err)
              })
              fs.remove(`./src/movies_Hash/torrent-stream/${seenMovies[i].hash}.torrent`, err => {
                if (err) return console.error(err)
              })
        }
    }

    const filter = req.body.filter;
    if(tools.isSort(filter.sortBy) && tools.isCategory(filter.category) && tools.isTitle(filter.title) && tools.isPage(filter.page)){
        if(filter.title !== null)
        {
            const data = await getMoviesByName(filter);
            res.send(data);
        }
        else
        {
            if(filter.category === null && filter.sortBy === null){
                const data = await getAllMovies(filter);
                res.send(data);
            }
            else{
                const data = await getFilteredMovies(filter);
                res.send(data);
            }
        }
    }
    else{
        res.send([]);
    }
        
}
module.exports = getMovies;
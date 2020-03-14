const unirest = require('unirest')
const yifysubtitles = require('yifysubtitles');
const fs = require('fs')
let cloudscraper = require('cloudscraper');

getMovieDataById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            let imdb = null;
        var req = unirest("GET",
            `https://api.themoviedb.org/3/movie/${id}?api_key=0f87bface5c69fcf394fc387f33049fa&language=en-US`);
        req.end(function (result) {
            if (result.error) console.log("timeout in server themoviedb")
            if (result.body.imdb_id)
                imdb = result.body.imdb_id;
            resolve(imdb);
        });
        } catch (error) {
            console.log('getMovieData timeout')
            return null;
        }
        
    })
}
getMovieData = async (req, res) => {
    const data = req.body;
    const info = {
        'torrents': "",
        'trailer': ""
    }
    let imdb = data.code;
   
    if (data.type === "id") {
        let temp = await getMovieDataById(data.code)
        if (temp !== null)
            imdb = temp;
    }
    let result1 = await cloudscraper.get(`https://tv-v2.api-fetch.website/movie/${imdb}`);
   
    if(result1)
    {
        let x = JSON.parse(result1);
        info.torrents = x.torrents;
        info.trailer = x.trailer;
    }
     const subtitles = await yifysubtitles(imdb, {path: './subtitles',langs: ['en', 'fr', 'ar']});
     for(var i = 0;i< subtitles.length;i++)
      {
        const t =  fs.readFileSync('./subtitles/'+subtitles[i].fileName, 'utf8')
        let buff = new Buffer.from(t);
        let base64data = buff.toString('base64');
        subtitles[i].fileName = base64data
      }
    const url =  unirest('GET','https://movie-database-imdb-alternative.p.rapidapi.com/')
    url.query({
        "i": imdb,
        "r": "json"
    }),
    url.headers({
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "db3470b86dmsh44414db70092568p12b435jsnd73f9b17a0d9"
    }),
    url.end((response) => {
        let Data = response.body;
        if (Data) {
            Data.torrents = info.torrents.en;
            Data.trailer = info.trailer;
            Data.subtitles = subtitles;
            res.send({isData :true, data : Data});
        }
        else
            res.send({ isData: false, data: null });
    })
}
module.exports = getMovieData;
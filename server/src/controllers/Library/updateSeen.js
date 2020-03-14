const user = require('../../models/user')
const updateSeen = async (req,res) => {
    const data = req.body;
    if(data)
    {
        try {
            const isFirst = await user.select("getMovies",[data.user_id,data.imdb])
            if(!isFirst[0])
               await user.insert("InsertMovies",[data.user_id,data.imdb,data.hash,data.title,data.year,data.rating,data.poster])
            else
               await user.update("UpdateMovies",[data.user_id,data.imdb,data.hash,data.title,data.year,data.rating,data.poster,data.user_id,data.imdb])
        } catch (error) {
            res.send('error !!!!')
        }
       
    }
    else res.send('Data !!!!')
   
}
    
module.exports = updateSeen;
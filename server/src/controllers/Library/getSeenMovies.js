const user = require('../../models/user')

const getSeenMovies = async (req,res) => {
    const user_id = req.body.data;
    if(user_id)
    {
        try {
            const movies = await user.select("getSeenMovies",user_id)
            if(movies)
            {
                res.send(movies)
            }
            else
                res.send(null)
        } catch (error) {
            console.log(error)
            res.send('error !!!!')
        }
       
    }
    else res.send('Data !!!!')
}
    
module.exports = getSeenMovies;
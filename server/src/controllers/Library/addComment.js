const user = require('../../models/user');

addComment = async (req, res) => {
    const { content, user_id, code } = req.body;
    if (content.lenth < 1 || content.length > 50) {
        res.send({ sent: false, err: 'Comment is invalid' });
        return;
    }
    user.insert('insertComment', [user_id, code, content])
        .then(async resp => {
            if (resp) {
                const u = await user.select('GetUserById', user_id);
                res.send({
                    isValid: true,
                    username: u[0].username,
                    firstname: u[0].firstname,
                    lastname: u[0].lastname,
                    image: u[0].image,
                    content: content,
                });
            }
        }).catch(err => console.log(err));
};
module.exports = addComment;
const bcrypt = require('bcrypt');
const user = require('../../models/user');

Login = async (req, res) => {
    const { username, password } = req.body;
    let dataUser = await user.getUser('GetUserByUsername', username);
    console.log(dataUser)
    if (dataUser) {
        bcrypt.compare(password, dataUser.password)
            .then((response) => {
                if (response) {
                    if (dataUser.confirmed === 1) {
                        delete dataUser.verif_token;
                        delete dataUser.password;
                        res.send({ isValid: true, user: dataUser });
                    }
                    else
                        res.send({ isValid: false, errorField: 'Please confirm your e-mail' })
                }
                else {
                    res.send({ isValid: false, errorField: 'Password Incorrect' });
                }
            })
            .catch(err => console.log(err))
    }
    else
        res.send({ isValid: false, errorField: 'Username Not Found' });
}

module.exports = Login;

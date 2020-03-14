const tools = require('../../tools');
const user = require('../../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const EM = require('./email');

editProfile = async (req, res) => {
    const info = req.body;
    let v = false;
    let result = {
        valid: false,
    };
    const p = info.hasOwnProperty('password');
    const confP = info.hasOwnProperty('confirmPassword');
    if( p && confP)
    {
        if(tools.isPassword(info.password, info.confirmPassword))
        {
            let hashPassword = await bcrypt.hash(info.password, 10);
            user.update('UpdatePassword', [hashPassword, info.id]);
            v = true;
        }
        else
        {
            result.password = 'Password error';
            v = false;
        }
    }
    let CheckUsername = await  user.select('CheckEditUsername', [info.username, info.id]);
    let CheckEmail = await  user.select('CheckEditEmail', [info.email, info.id]);
    if(CheckUsername)
    {
        result.username = 'Username already exists';
    }
    if(CheckEmail)
    {
        result.email = 'Email already exists';
    }

    if(tools.isLastname(info.lastname) && info.langue && tools.isFirstname(info.firstname) && tools.isUsername(info.username) && tools.isEmail(info.email) && !CheckUsername && !CheckEmail)
    {
        const check = await user.getUser('GetUserById',info.id);
        if(check && info.email !== check.email)
        {
            user.notConfirmed(check.email);
            const verifToken = crypto.randomBytes(64).toString('hex');
            user.UpdateVerifToken(check.email, verifToken);
            EM.sendEmail(info.email, verifToken);
            result.confirmed = false;
        }
        
        user.update('UpdateProfile',[info.firstname, info.lastname, info.username, info.email, info.langue, info.id]);
       
        const uu = await user.getUser('GetUserById',info.id);
        if(uu){
            delete uu.verif_token;
            delete uu.password;
        }
        result.valid = true;
        res.send({result, uu});

    }
    else{
        result.valid = false;
        let err = [];
        for(let key in result){
            if(key !== 'valid')
                err.push(result[key]);
        }
        res.send({result, err});
    }
};

module.exports = editProfile;
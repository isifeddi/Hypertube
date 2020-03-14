const conn = require('../Config/db_connection');
const queries = require("../Config/queries");
var jwt = require('jsonwebtoken');
const SELECT = queries.SELECT;
const INSERT = queries.INSERT;
const UPDATE = queries.UPDATE;
const DELETE = queries.DELETE;
const tools = require('../tools')
module.exports = {
    Register :function  (lastname, firstname, username, email, password,picture,omni_id) {
        conn.query(INSERT.AddUser, [lastname, firstname, username, email, password,picture,omni_id],(err,res) => {
            if(err)
            {
                throw err;
            }
        });
    },
    getUser:   function  (type, value) {
        return new Promise ( (resolve, reject) => {
             conn.query(SELECT[type], value,(err,res) => {
                if(err)
                    reject(err);
                else
                {
                    if (!tools.isEmpty(res)){
                        const data = JSON.parse(JSON.stringify(res))[0];
                        let datatoken = JSON.parse(JSON.stringify(res))[0];
                        delete datatoken.password;
                        delete datatoken.verif_token;
                        let token =  jwt.sign(datatoken, 'MyChouaibKEY');
                        data.token = token;
                        resolve(data);
                    }
                    else
                        resolve(null)
                }
                   
                     

            });
        })
    },
    update: function (type, value){
        return new Promise ((resolve, reject) => {
            conn.query(UPDATE[type], value,(err,res) => {
                if(err)
                    reject (err);
                else
                    resolve (JSON.parse(JSON.stringify(res)));
            });
        })
    },
    insert: function (type, value){
        return new Promise ((resolve, reject) => {
            conn.query(INSERT[type], value,(err,res) => {
                if(err)
                    reject(err);
                else
                    resolve(JSON.parse(JSON.stringify(res)));
            });
        })
    },
    select: function (type, value){
    
        return new Promise ((resolve, reject) => {
            conn.query(SELECT[type], value,(err,res) => {
                if(err)
                    reject(err);
                else
                { 
                    if(tools.isEmpty(res))
                        resolve(false)
                    else
                    resolve(JSON.parse(JSON.stringify(res)));
                }
            });
        })
    },
    getComment: function (type, value){
        return new Promise ((resolve, reject) => {
            conn.query(SELECT[type], value,(err,res) => {
                if(err)
                    reject(err);
                else
                { 
                    resolve(JSON.parse(JSON.stringify(res)));
                }
            });
        })
    },
    delete: function (type, value){

        return new Promise ((resolve, reject) => {
            conn.query(DELETE[type], value,(err,res) => {
                if(err)
                    reject (err);
                else
                    resolve (JSON.parse(JSON.stringify(res)));
            });
        })
    },
    ResetPassword : function (password, token) {
        return new Promise ((resolve, reject) => {
            conn.query(UPDATE.ResetPassword, [password, token],(err,res) => {
                if(err)
                    reject (err);
                else
                    resolve (res);
            });
        })
    },
    UpdateVerifToken : function (email, token) {
        return new Promise ((resolve, reject) => {
            conn.query(UPDATE.UpdateToken, [token, email],(err,res) => {
                if(err)
                    reject (err);
                else
                    resolve (res);
            });
        })
    },
    Confirmed: function (email){
        return new Promise ((resolve, reject) => {
            conn.query(UPDATE.Confirmed, email,(err,res) => {
                if(err)
                    reject (err);
                else
                    resolve (res);
            });
        })
    },
    notConfirmed: function (email){
        return new Promise ((resolve, reject) => {
            conn.query(UPDATE.notConfirmed, email,(err,res) => {
                if(err)
                    reject (err);
                else
                    resolve (res);
            });
        })
    },
};
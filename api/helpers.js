var jwt = require('jsonwebtoken')

var secretpass = '3nuoon95n4g45j54n24dj394kaim'
var expiredin = 60 * 60 * 24;
var serialize = function(data){
    return jwt.sign(data, 'Secret Password', {
        expiresIn: expiredin
    })
}

function (){
    jwt.verify(token, 'Secret Password', function (err, user) {
        if (err) {
            res.status(401).send({
                error: 'Token inválido'
            })
        } else {
            res.send({
                message: 'Awwwww yeah!!!!'
            })
        }
    })
}

module.exports = serialize;

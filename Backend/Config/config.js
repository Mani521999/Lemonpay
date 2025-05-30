require('dotenv').config({ path: `./Environment/.env.${process.env.NODE_ENV}` })

console.log("path", process.env.NODE_ENV);


var SECRET_KEY = {}

SECRET_KEY.PORT = process.env.PORT
SECRET_KEY.MONGOURI = process.env.MONGOURI
SECRET_KEY.KEY = process.env.KEY

module.exports = SECRET_KEY;
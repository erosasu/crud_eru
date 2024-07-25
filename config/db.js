const mongoose = require('mongoose')

const url= ''

const conectDB =()=>{
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db=>console.log('DB is connected'))
    .catch(err=>console.error(err))
}
 module.exports = conectDB;
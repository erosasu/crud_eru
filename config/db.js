const mongoose = require('mongoose')

const url= 'mongodb+srv://ernierous:cuantum47@cluster0.3m7828i.mongodb.net/test?retryWrites=true&w=majority'

const conectDB =()=>{
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db=>console.log('DB is connected'))
    .catch(err=>console.error(err))
}
 module.exports = conectDB;
const mongoose = require('mongoose')

const connectionUrl = 'mongodb://127.0.0.1/admission-db';


mongoose.connect(connectionUrl,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error, client) =>{{

    if(error){
        return console.log('unable to connect to database')
    }

}})


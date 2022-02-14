const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:1234@db.mhbax.mongodb.net/glsi-b-2022?retryWrites=true&w=majority')
.then(()=> console.log('Mongo is UP.'))
.catch(err => console.log('Mongo is Down , raison : ',err.message));
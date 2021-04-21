var mongoose = require('mongoose');

var URI_BDD = "mongodb+srv://admin:1234@cluster0.rjlwo.mongodb.net/mymovizapp?retryWrites=true&w=majority"

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect(URI_BDD,
    options,    
    function(err) {
     console.log(err);
    } 
   );
   
module.exports = mongoose;
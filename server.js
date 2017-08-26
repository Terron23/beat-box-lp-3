var express = require("express");
var app = express();
var port = 3000;
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
mongoose.Promise = global.Promise;
/*mongoose.connect("mongodb://localhost:27017/beatbox", function(err, db) {
  if (err) throw err;
  console.log("Database created!");  
});*/

mongoose.connect("mongodb://beatbox:beatbox123@ds149743.mlab.com:49743/beatbox", function(err, db) {
  if (err) throw err;
  console.log("Database created!");  
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))


var beatboxSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    job: Array,
    morning: Boolean,
    afternoon: Boolean,
    evening: Boolean
});
var User = mongoose.model("User", beatboxSchema);




app.get("/", (req, res) => {
 res.sendFile(__dirname + "/public/index.html");
});

app.get("/register", (req, res) => {
 res.sendFile(__dirname + "/public/register.html");
});

app.post("/register", (req, res) => {
 var myData = new User(req.body);
    myData.save()
        .then(item => {
           res.sendFile(__dirname + "/public/thanks.html");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});
 
app.listen(port, () => {
 console.log("Server listening on port " + port);
});
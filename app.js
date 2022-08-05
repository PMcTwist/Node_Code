const {faker} = require('@faker-js/faker');
var mysql = require('mysql');
var exp = require('express');
var bodyparser = require('body-parser');

// Start express app and setup use statements
var app = exp();
app.set("view engine", "ejs" );
app.use(bodyparser.urlencoded({extended: true}));
app.use(exp.static(__dirname + "/public"));

// Setup database connection
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
     password: '',
     database : 'join_us'
});

// Home page API
app.get("/", function(incoming, outgoing){
        var command = 'SELECT COUNT(*) AS count FROM users';

        connection.query(command, function (error, results, feilds) {
            if (error) throw error;
            var user_count = results[0].count;

            outgoing.render("home", {count_data: user_count});
        });
});

//Register page API
app.post("/register", function(incoming, outgoing){
    var person = {email: incoming.body.email};
    var command = 'INSERT INTO users SET ?';

    connection.query(command, person, function(error, results){
        if (error) throw error;
        console.log(results);
        outgoing.redirect("/");
    });
});


// Start web server listening for connections
app.listen(8080, function(){
    console.log("Server started on port 8080.")
});

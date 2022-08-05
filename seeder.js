const {faker} = require('@faker-js/faker');
var mysql = require('mysql');

// Setup MySQL connection
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'mctwist',
     password: 'Zinger8452!',
     database : 'join_us'
});

// Run loop to populate 500 random users
var data = [];

for(i = 0; i < 500; i++){
    data.push([
        faker.internet.email(),
        faker.date.past()
    ]);
};

// Run query to insert populated users to database
command = 'INSERT INTO users (email, created_at) VALUES ?'

connection.query(command, [data], function (error, results, feilds) {
    if (error) throw error;
    console.log(results)
});

// close conenction when finished
connection.end();
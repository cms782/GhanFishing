var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nyala1027',
  database: 'ghanfishing'
})
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    process.exit(code=1);
  }
  console.log("thread:"+connection.threadId);
});
var express = require('express');
var router = express.Router();

////////////////////CONNECT TO MYSQL DATABASE////////////////////
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
////////////////////END CONNECT DATABASE//////////////////////



////////////////////////GET HOME PAGE//////////////////////////
router.get('/', function(req, res, next) {
  res.render('index', 
  	{ title: 'Express',
  	  subtitle:'Casey' });
});
////////////////////////END HOME PAGE//////////////////////////




//////////////////////////HANDLE /getfish REQUESTS//////////////////////////
router.get("/getfish", function(req, res, next) {

	"\
	FOR POST REQUESTS USE param = req.body.<parameter>\
	"

	response = {};
	//content-type = json/application
	//POST request




	//ERROR CHECK
	if (!req.query.senderMobile||!req.query.senderName||!req.query.msgdatetime
		||!req.query.message) {

		console.log("idk bad get request")
		res.status(400).send("Bad Request");
		return;
	}


	////////////////////////////PARSE MESSAGE///////////////////////////////////
	var message_arr = (req.query.message).split(" "); //parses %20 automatically
	var req_type = message_arr[0]; //'price' or 'addme'
	var senderMobile = req.query.senderMobile;
	var senderName = req.query.senderName;
	var msgdatetime = req.query.msgdatetime;
	////////////////////////////////////////////////////////////////////////////



	////////////////////ADD REQUEST MESSAGE TO MYSQL DB///////////////////////////////////////
	var sql = "INSERT INTO messages (senderMobile, senderName, msgdatetime, message, userKey)\
	VALUES (\""+senderMobile+"\", \""+senderName+"\", \""+msgdatetime+
	"\", \""+req.query.message+"\", \""+userKey+"\")";

	connection.query(sql, function(err) {
		if (err) {
			console.log("could not insert record");
			console.log(err.code);
			res.status(500).send("idk what happened, could not insert record");
		}
		else {
			console.log("successfully inserted record!");
		}
	});
	/////////////////////////////////////////////////////////////////////////////////////////



	////////////////////////////HANDLE PRICE REQUEST/////////////////////////////////////////
	if (req_type.match( /price/gi)) {
		console.log("GET PRICE");

		var userKey = message_arr[1]
		var action = message_arr[2]; //BID/ASK
		var fishtype = message_arr[3];//Tilapia/bass idk?

	/////////////////////////////////VALIDATE USER///////////////////////////////////////////

	/////////////////////////////////END VALIDATE///////////////////////////////////////////





	}
	////////////////////////END PRICE REQUEST////////////////////////////////////////////





	/////////////////////////HANDLE NEW USER REQUEST//////////////////////////////////////
	else if (req_type.match( /addme/gi)) {
		console.log("ADD USER");

		//userId 
		var userKey = "fishy";
			///////////////////////////CREATE DATETIME STRING//////////////////////
		var d = new Date();
		var dateJoined = "YYYY-MM-DD HH:MM:SS"
		var year = d.getFullYear().toString();
		var month = zeropad(d.getMonth()+1);
		var day = zeropad(d.getDate());
		var hours = zeropad(d.getHours());
		var minutes = zeropad(d.getMinutes());
		var seconds = zeropad(d.getSeconds());
		dateJoined = year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds
			///////////////////////////END DATETIME STRING////////////////////////
		//senderName = userName
		//senderMobile = userMobile
		//dateJoined

		////////////////////ADD REQUEST TO MYSQL DB///////////////////////////////////
		var sql = "INSERT INTO users (userKey, userName, userMobile, dateJoined)\
		VALUES (\""+userKey+"\", \""+senderName+"\", \""+senderMobile+
		"\", \""+dateJoined+"\")";

		connection.query(sql, function(err) {
			if (err) {
				console.log("could not insert record");
				console.log(err.code);
				res.status(500).send("idk what happened, could not insert record");
			}
			else {
				console.log("successfully added new user!");
				res.send()
			}
		});

		//////////////////////////END MYSQL DB///////////////////////////////////////





	}
	/////////////////////////END NEW USER REQUEST//////////////////////////////////////


	res.send(sql);



	/*
	1) get secret key (maybe a work that can be easily memorized??)
	2) get rest of message: "buy/sell <type of fish> amount(kg) price"
	3) lookup key to see if its valid
	4) if not valid -- respond with "key not valid"
	5) run matching algorithm to get 5-10 matching bid/ask
		-- "buy/sell <type of fish> amount(kg) price location phone#"
	6) return message (res.end(message)) ?? 
		- return message payload should be JSON
			-includes:
				1) API secret //can probably be left out
				2) message //try to limit < 160 chars, 
				3) recipients //array of entities ('type':value)
					- probably recipient:[{"type":"address", "value":"+1234567890"}]

	7) handle responses
	*/

	//just use this for now
	//res.send("floppity flop");
})


function zeropad(num) {
	if (num<10) {
		return ("0"+num.toString());
	}
	return num.toString();
}
module.exports = router;

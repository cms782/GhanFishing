var express = require('express');
var http = require("http");
var router = express.Router();

////////////////////CONNECT TO MYSQL DATABASE////////////////////
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pwd',
  database: 'ghanfishing'
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting - poop...\n' + err.stack);
    process.exit(code=1);
    return;
  }
  console.log("thread:"+connection.threadId);

  connection.on("error", function(err) {
  	res.status(100).send("idk something went wrong connecting to db");
  	return;
  });
});
/////////////////////END CONNECT DATABASE///////////////////////




////////////////////////GET WEB PAGE REQUEST//////////////////////////
router.get('/', function(req, res, next) {
  res.render('index', 
  	{ title: 'Express',
  	  subtitle:'idkidk' });
});
router.get('/about',function(req,res,next) {
	res.render('about', {
		title: 'About',
	});
});
router.get('/history',function(req,res,next) {
	res.render('history', {
		title: 'History',
	});
});
router.get('/project',function(req,res,next) {
	res.render('project', {
		title: 'Project',
	});
});
router.get('/results',function(req,res,next) {
	res.render('results', {
		title: 'Results',
	});
});
//END



//////////////////////////HANDLE /getfish REQUESTS//////////////////////////
router.get("/getfish", function(req, res, next) {

	//FOR POST REQUESTS USE param = req.body.<parameter>

	//////////////////////////////ERROR CHECK//////////////////////////////////
	if (!req.query.senderMobile||!req.query.senderName||!req.query.msgdatetime
		||!req.query.message) {

		console.log("idk bad get request")
		res.status(400).send("Bad Request");
		return;
	}
	////////////////////////////END ERROR CHECK////////////////////////////////

	////////////////////////////PARSE MESSAGE///////////////////////////////////
	var message_arr = (req.query.message).split(" "); //parses %20 automatically
	var req_type = message_arr[0];
	var senderMobile = req.query.senderMobile;
	var senderName = req.query.senderName;
	var msgdatetime = req.query.msgdatetime;
	////////////////////////////////////////////////////////////////////////////

	////////////////////////LOG ALL MESSAGES TO MYSQL DB//////////////////////////////////////
	var sql = "INSERT INTO messages (senderMobile, senderName, msgdatetime, message, userKey)\
	VALUES (\""+senderMobile+"\", \""+senderName+"\", \""+msgdatetime+
	"\", \""+req.query.message+"\", \""+userKey+"\")";

	sqlquery(sql);

	//Handle req_type 'idk' ...change this
	if (req_type.match( /idk/gi)) {
		console.log("ADD FUNCTIONALITY HERE");
		var thedate = getDateTime();

		////////////////////////////////////////////////////
		////////////////////////////////////////////////////
		//////////////ADD FUNCTIONALITY HERE////////////////
		////////////////////////////////////////////////////
		////////////////////////////////////////////////////


	}





	//CHANGE THIS ... 
	res.send("sup");

})





///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////HELPER FUNCTIONS//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

// make sql query with sql string
function sqlQuery(sql) {
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
	connection.end();

}

function getDateTime() {
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
		return dateJoined;
		///////////////////////////END DATETIME STRING////////////////////////
}


//makes SMS post request to FrontlineSMS
//return JSON repsonse object
function sendSMS(message,number) {
	var jsonrequest = {
		secret:"secrets_are_no_fun",
		message:message,
		recipients:[{type:"address",value:number}]
	};
	var stringrequest = JSON.stringify(jsonrequest);
	// An object of options to indicate where to post to
	var post_options = {
	  host: 'frontlinesms.com',
	  path: '/idk',
	  method: 'POST',
	  headers: {
	      'Content-Type': 'application/json',
	      'Content-Length': stringrequest.length
	  }
	};
	// Set up the request
	var post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		var responseString = '';

		res.on('data', function (data) {
	  	responseString+=data;
		});

		res.on('end',function() {
	  	var responseobj = JSON.parse(responseString)
		});

		res.on('error', function(err) {
			console.error("uh-oh...\n" + err);
			return null;
		});
	});
	// post the data
	post_req.write(stringrequest);
	post_req.end();
	return responseobj;
}


function zeropad(num) {
	if (num<10) {
		return ("0"+num.toString());
	}
	return num.toString();
}
module.exports = router;

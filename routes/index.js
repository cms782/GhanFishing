var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  	{ title: 'Express',
  	  subtitle:'Casey' });
});

/*Handle POST requests -- from FrontlineSMS ??*/

router.get("/getfish", function(req, res, next) {
	/*
	1) get secret key (maybe a work that can be easily memorized??)
	2) get rest of message: "buy/sell <type of fish> amount(kg) price"
	3) lookup key to see if its valid
	4) if not valid -- respond with "key not valid"
	5) run matching algorithm to get 5-10 matching bid/ask
		-- "buy/sell <type of fish> amount(kg) price location phone#"
	6) return message (res.end(message)) ??
	*/

	//just use this for now
	res.send("hello world");


})



module.exports = router;

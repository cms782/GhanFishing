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
	//request content will be JSON


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
	res.send("floppity flop");
})



module.exports = router;

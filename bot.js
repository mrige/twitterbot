

console.log('The bot is starting');

var Twit = require('twit'); // importing twit library

var config = require('./config'); // importing config file that was created 
var T = new Twit(config); // vreating a Twit object with config 

getTweet();
setInterval(getTweet, 1000*20);


function getTweet(){
	var tweets;

	var params = {
		q: '#code',
		count:1
	}

	T.get('search/tweets', params, gotTweet);

	function gotTweet(err, data, response) {
		tweet = data.statuses;
		for (var i = 0; i < tweet.length; i++) {
			 console.log(tweet[i].text);
			 tweetIt(tweet[i].text);
		}
	}
	  
	 
}

function tweetIt(newTweet) {

	var tweet = {
		status: 'RT ' + newTweet
	}

	T.post('statuses/update',tweet,sendTweet)

	function sendTweet(err, data, response) {
	 	if(err){
	 		console.log(newTweet);
	 	
	 		if(err.code == '187'){
	 			console.log('I cannot tweet the same thing multiple times');
	 		}
	 	}
	 	else{
	 		console.log(tweet.status + " Posted");
	 	} 
	}
}

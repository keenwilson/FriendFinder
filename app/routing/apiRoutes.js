// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends-data, match, etc.
// ===============================================================================

const friends = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a survey response... this data is then sent to the server...
  // Then the server saves the data to the friends array)
  // ---------------------------------------------------------------------------


  // Add new friend entry
	app.post('/api/friends', function(req, res) {
		// Capture the newFriend object
		var newFriend = req.body;
		console.log('newFriend = ' + JSON.stringify(newFriend));

		var newFriendResponses = newFriend.scores;
		console.log('newFriendResponses = ' + newFriendResponses);

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < newFriendResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - newFriendResponses[j]);
			}
			console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
			console.log('Closest match found = ' + diff);
			console.log('Friend name = ' + friends[i].name);
			console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(newFriend);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
  });
  

  



  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    friends.length = [];

    res.json({ ok: true });
  });
};
